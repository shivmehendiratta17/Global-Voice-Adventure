import React, { useState, useEffect } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { LevelSelect } from './components/LevelSelect';
import { GameScreen } from './components/GameScreen';
import { RoundSummary } from './components/RoundSummary';
import { Leaderboard } from './components/Leaderboard';
import { Chatbot } from './components/Chatbot';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { ProtocolScreen } from './components/ProtocolScreen';
import { ParticleSystem } from './components/ParticleSystem';
import { AudioToggle } from './components/AudioToggle';
import { audioController } from './lib/audioController';
import { questions } from './data/questions';
import { saveProgress, UserProfile, loginAccount, getRankFromXP } from './lib/firebase';
import { motion, AnimatePresence } from 'motion/react';

type GameState = 'auth' | 'level_select' | 'playing' | 'round_summary' | 'leaderboard' | 'analytics' | 'protocol';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('auth');
  const [user, setUser] = useState<UserProfile | null>(null);
  
  const [currentRound, setCurrentRound] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [roundXp, setRoundXp] = useState(0);
  const [roundCorrect, setRoundCorrect] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [showPromotion, setShowPromotion] = useState(false);
  const [newRank, setNewRank] = useState('');

  // Load session from localStorage
  useEffect(() => {
    const checkSession = async () => {
      const saved = localStorage.getItem('globalVoiceSession');
      if (saved) {
        try {
          const { username, keyHash } = JSON.parse(saved);
          const userData = await loginAccount(username, keyHash);
          if (userData) {
            setUser(userData);
            setGameState('level_select');
          }
        } catch (e) {
          console.error("Session expired or invalid", e);
          localStorage.removeItem('globalVoiceSession');
        }
      }
    };
    checkSession();
  }, []);

  const handleLoginSuccess = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('globalVoiceSession', JSON.stringify({
      username: userData.username,
      keyHash: userData.keyHash
    }));
    setGameState('level_select');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('globalVoiceSession');
    setGameState('auth');
  };

  const handleSelectRound = (round: number) => {
    audioController.playIfEnabled();
    setCurrentRound(round);
    setCurrentQuestionIndex(0);
    setRoundXp(0);
    setRoundCorrect(0);
    setGameState('playing');
  };

  const handleAnswer = (isCorrect: boolean, xpEarned: number, timeTaken: number) => {
    if (!user) return;

    const currentQ = questions.filter(q => q.round === currentRound)[currentQuestionIndex];
    const category = currentQ.category;

    // Update local state for the round
    if (isCorrect) {
      setRoundCorrect(prev => prev + 1);
      setRoundXp(prev => prev + xpEarned);
      setCurrentStreak(prev => prev + 1);
    } else {
      setCurrentStreak(0);
    }

    // Update user stats
    const newStats = { ...user.categoryStats };
    if (!newStats[category]) {
      newStats[category] = { correct: 0, total: 0 };
    }
    newStats[category].total += 1;
    if (isCorrect) newStats[category].correct += 1;

    const newHighestStreak = Math.max(user.highestStreak || 0, isCorrect ? currentStreak + 1 : currentStreak);

    setUser(prev => prev ? {
      ...prev,
      totalQuestionsAnswered: (prev.totalQuestionsAnswered || 0) + 1,
      correctAnswers: (prev.correctAnswers || 0) + (isCorrect ? 1 : 0),
      totalResponseTime: (prev.totalResponseTime || 0) + timeTaken,
      highestStreak: newHighestStreak,
      categoryStats: newStats
    } : null);
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Round finished
      const passed = roundCorrect >= 3;
      if (passed && user) {
        const nextRound = currentRound + 1;
        const newUnlocked = Math.max(user.highestRoundUnlocked, nextRound <= 25 ? nextRound : 25);
        
        // Recalculate total XP safely
        const newTotalXP = user.totalXP + roundXp;
        const maxPossibleXp = newUnlocked * 5 * 150 * 2; // Increased max to account for multipliers
        const verifiedXp = Math.min(newTotalXP, maxPossibleXp);

        const newCompletedRounds = [...new Set([...user.completedRounds, currentRound])];
        const calculatedRank = getRankFromXP(verifiedXp);

        if (calculatedRank !== user.rank) {
          setNewRank(calculatedRank);
          setShowPromotion(true);
          setTimeout(() => setShowPromotion(false), 4000);
        }

        const updates: Partial<UserProfile> = {
          totalXP: verifiedXp,
          highestRoundUnlocked: newUnlocked,
          completedRounds: newCompletedRounds,
          lastPlayedRound: currentRound,
          rank: calculatedRank,
          totalQuestionsAnswered: user.totalQuestionsAnswered,
          correctAnswers: user.correctAnswers,
          totalResponseTime: user.totalResponseTime,
          highestStreak: user.highestStreak,
          categoryStats: user.categoryStats
        };

        setUser({ ...user, ...updates });
        await saveProgress(user.username, updates);
      }
      setGameState('round_summary');
    }
  };

  const handleNextRound = () => {
    if (currentRound < 25) {
      handleSelectRound(currentRound + 1);
    } else {
      setGameState('leaderboard');
    }
  };

  const handleRetryRound = () => {
    handleSelectRound(currentRound);
  };

  const currentRoundQuestions = questions.filter(q => q.round === currentRound);
  const currentQuestion = currentRoundQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 relative overflow-hidden">
      <ParticleSystem />
      <AudioToggle />
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-900/50 rounded-full blur-[100px] -z-10"></div>
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'auth' && (
          <AuthScreen 
            key="auth" 
            onLoginSuccess={handleLoginSuccess} 
            onViewLeaderboard={() => setGameState('leaderboard')} 
            onViewProtocol={() => setGameState('protocol')}
          />
        )}
        
        {gameState === 'level_select' && user && (
          <LevelSelect 
            key="level_select"
            unlockedRounds={user.highestRoundUnlocked}
            onSelectRound={handleSelectRound}
            onViewLeaderboard={() => setGameState('leaderboard')}
            onViewAnalytics={() => setGameState('analytics')}
            onViewProtocol={() => setGameState('protocol')}
            onLogout={handleLogout}
            username={user.username}
            rank={user.rank || "Novice Scholar"}
          />
        )}

        {gameState === 'playing' && currentQuestion && user && (
          <GameScreen
            key={`game-${currentRound}-${currentQuestionIndex}`}
            question={currentQuestion}
            currentXp={user.totalXP + roundXp}
            currentStreak={currentStreak}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
          />
        )}

        {gameState === 'round_summary' && user && (
          <RoundSummary
            key="summary"
            round={currentRound}
            correctCount={roundCorrect}
            xpEarned={roundXp}
            totalXp={user.totalXP}
            onNextRound={handleNextRound}
            onRetryRound={handleRetryRound}
            onViewLeaderboard={() => setGameState('leaderboard')}
            isGameOver={currentRound === 25 && roundCorrect >= 3}
          />
        )}

        {gameState === 'leaderboard' && (
          <Leaderboard 
            key="leaderboard"
            onBack={() => user ? setGameState('level_select') : setGameState('auth')}
          />
        )}
        {gameState === 'analytics' && user && (
          <AnalyticsScreen 
            key="analytics"
            user={user}
            onBack={() => setGameState('level_select')}
          />
        )}

        {gameState === 'protocol' && (
          <ProtocolScreen 
            key="protocol"
            onBack={() => user ? setGameState('level_select') : setGameState('auth')}
          />
        )}
      </AnimatePresence>

      {/* Promotion Overlay */}
      <AnimatePresence>
        {showPromotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 rounded-full blur-[100px] opacity-30 -z-10"
              />
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 tracking-wider">
                RANK PROMOTED
              </h2>
              <div className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.4)]">
                <p className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                  {newRank}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot is available everywhere except auth, leaderboard, and protocol */}
      {gameState !== 'auth' && gameState !== 'leaderboard' && gameState !== 'analytics' && gameState !== 'protocol' && (
        <Chatbot currentQuestion={gameState === 'playing' ? currentQuestion : null} />
      )}
    </div>
  );
}
