import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../../store/useGameStore';
import { Target, Cpu, User, Clock, AlertTriangle, ChevronRight, Lock, Unlock, ArrowRight } from 'lucide-react';
import { globalVoice } from '../../lib/globalVoiceProtocol';
import { GameEngine } from '../../services/gameEngine';
import { DuelQuestionV2 } from '../../data/duelQuestionsV2';
import { AchievementService } from '../../services/achievementService';
import { checkWagerLimit, startWagerRound, saveProgress } from '../../lib/api';

export function MindDuelGame() {
  const { user, updateStats, unlockAchievement } = useGameStore();
  const [stage, setStage] = useState<'intro' | 'levelSelect' | 'duel' | 'result'>('intro');
  const [questions, setQuestions] = useState<DuelQuestionV2[]>([]);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(15);
  const [pressureSpoken, setPressureSpoken] = useState(false);
  const [wasLosing, setWasLosing] = useState(false);
  
  const [isCheckingLimit, setIsCheckingLimit] = useState(true);
  const [playAllowed, setPlayAllowed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const highestLevelUnlocked = user?.highestDuelLevelUnlocked || 1;

  useEffect(() => {
    checkPlayLimit();
  }, [user]);

  const checkPlayLimit = async () => {
    if (!user) return;
    try {
      const data = await checkWagerLimit(user.username, 'default');
      setPlayAllowed(data.allowed);
      if (!data.allowed) {
        setTimeRemaining(data.timeRemaining || 0);
      }
    } catch (error) {
      console.error("Failed to check limit", error);
    } finally {
      setIsCheckingLimit(false);
    }
  };

  useEffect(() => {
    if (!playAllowed) {
      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1000) {
            setPlayAllowed(true);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [playAllowed]);

  // Initial check on mount to ensure timer is accurate even after reload
  useEffect(() => {
    if (user) {
      checkPlayLimit();
    }
  }, [user]);

  useEffect(() => {
    if (stage === 'duel' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      
      if (timeLeft === 5 && !pressureSpoken) {
        globalVoice.speak("Time is running out. Make your choice.", true);
        setPressureSpoken(true);
      }
      
      return () => clearTimeout(timer);
    } else if (stage === 'duel' && timeLeft === 0) {
      handleAnswer(false, true);
    }
  }, [timeLeft, stage]);

  const startLevelSelect = () => {
    setStage('levelSelect');
  };

  const startLevel = async (level: number) => {
    if (!user) return;
    
    try {
      await startWagerRound(user.username, 'default');
    } catch (error: any) {
      console.error("Failed to start round", error);
      if (error.message === 'Play limit reached') {
        checkPlayLimit();
        setStage('intro');
      }
      return;
    }

    const sessionQuestions = GameEngine.getDuelSessionForLevel(level);
    setQuestions(sessionQuestions);
    setSelectedLevel(level);
    setPlayerScore(0);
    setAiScore(0);
    setRound(1);
    setWasLosing(false);
    setStage('duel');
    setTimeLeft(15);
    setPressureSpoken(false);
    globalVoice.speak("Match initiated. Let us see how your mind adapts.", true);
  };

  const handleAnswer = (selectedOption: string | false, timeOut: boolean = false) => {
    const currentQ = questions[round - 1];
    const correct = selectedOption === currentQ.correctAnswer;
    
    // AI difficulty adjustment based on round and player score
    const aiBaseChance = 0.4 + (round * 0.05) + (selectedLevel * 0.005);
    const aiCorrect = Math.random() < aiBaseChance; 
    
    const basePoints = 100 + (selectedLevel * 10);
    let newPlayerScore = playerScore;
    let newAiScore = aiScore;

    if (correct) newPlayerScore += basePoints;
    if (aiCorrect) newAiScore += basePoints;
    
    setPlayerScore(newPlayerScore);
    setAiScore(newAiScore);

    if (round === 3 && newPlayerScore < newAiScore) {
      setWasLosing(true);
    }

    if (timeOut) {
      globalVoice.speak("Too slow. Hesitation is a weakness.", true);
    } else if (correct) {
      const responses = [
        "Impressive response. Let's increase the difficulty.",
        "Correct. But can you maintain this pace?",
        "A logical deduction. Well played."
      ];
      globalVoice.speak(responses[Math.floor(Math.random() * responses.length)], true);
    } else {
      const responses = [
        "Incorrect. Your pattern recognition is failing.",
        "A miscalculation. I expected better.",
        "Wrong. That hesitation shifted the momentum."
      ];
      globalVoice.speak(responses[Math.floor(Math.random() * responses.length)], true);
    }

    if (round < 5) {
      setRound(r => r + 1);
      setTimeLeft(15);
      setPressureSpoken(false);
    } else {
      finishLevel(newPlayerScore, newAiScore);
    }
  };

  const finishLevel = async (finalPlayerScore: number, finalAiScore: number) => {
    setStage('result');
    
    const passed = finalPlayerScore > finalAiScore;
    
    let finalXP = finalPlayerScore;
    if (passed) {
      finalXP += 500 + (selectedLevel * 20); // Win bonus
    }

    if (passed) {
      globalVoice.speak("You have defeated me. Your strategic capacity is commendable.", true);
    } else if (finalPlayerScore < finalAiScore) {
      globalVoice.speak("Defeat. Your cognitive models require recalibration.", true);
    } else {
      globalVoice.speak("A draw. It seems our intellects are evenly matched.", true);
    }
    
    updateStats('mind-duel', finalXP, { strategy: 15, adaptability: 10 });
    
    if (passed && selectedLevel === highestLevelUnlocked && selectedLevel < 100) {
      if (user) {
        try {
          await saveProgress(user.username, { highestDuelLevelUnlocked: selectedLevel + 1 });
          useGameStore.setState((state) => ({
            user: state.user ? { ...state.user, highestDuelLevelUnlocked: selectedLevel + 1 } : null
          }));
        } catch (e) {
          console.error("Failed to update progress", e);
        }
      }
    }
    
    const ach = AchievementService.checkMindDuel(wasLosing || (round === 5 && playerScore < aiScore && finalPlayerScore > finalAiScore), passed);
    if (ach) unlockAchievement(ach);

    if (selectedLevel % 3 === 0) {
      window.dispatchEvent(new CustomEvent('showFeedbackPopup'));
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-white/20">
      <div className="max-w-4xl mx-auto py-12 px-6">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-sm backdrop-blur-md">
              <Target className="text-zinc-300" size={20} />
            </div>
            <h1 className="text-xl font-medium tracking-tight text-zinc-100">Mind Duel</h1>
          </div>
          
          {stage !== 'intro' && stage !== 'levelSelect' && (
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Score</span>
                <span className="text-lg font-semibold text-white flex items-center gap-1">
                  {playerScore.toLocaleString()}
                </span>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Level</span>
                <span className="text-lg font-semibold text-white">{selectedLevel}/100</span>
              </div>
            </div>
          )}
        </header>

        <AnimatePresence mode="wait">
          {/* INTRO STAGE */}
          {stage === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="bg-[#111111] border border-white/5 rounded-[2rem] p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-500 to-red-500 opacity-50"></div>
              <h2 className="text-4xl font-semibold tracking-tight mb-4 text-white">Cognitive Supremacy</h2>
              <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-xl">
                100 levels of 1v1 combat against an adaptive AI. The AI adjusts difficulty based on your response speed and accuracy. You must outscore the AI to advance.
              </p>
              
              {isCheckingLimit ? (
                <div className="flex items-center gap-3 text-zinc-500">
                  <div className="w-5 h-5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying access...</span>
                </div>
              ) : !playAllowed ? (
                <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-4">
                  <AlertTriangle className="text-rose-500 shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-medium text-rose-100 mb-1">Play Limit Reached</h3>
                    <p className="text-rose-200/70 mb-3">To ensure fair play and prevent burnout, you can only play 3 sessions every 7 minutes.</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-500/20 rounded-lg text-rose-300 font-mono text-sm">
                      <Clock size={14} /> Try again in {formatTime(timeRemaining)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <button 
                    onClick={startLevelSelect} 
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Initialize Match</span>
                    <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* LEVEL SELECT STAGE */}
          {stage === 'levelSelect' && (
            <motion.div 
              key="levelSelect"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#111111] border border-white/5 rounded-[2rem] p-10 shadow-2xl"
            >
              <h2 className="text-3xl font-semibold tracking-tight mb-2 text-white">Select Level</h2>
              <p className="text-zinc-400 mb-8">Choose an unlocked level to begin. Defeat the AI to unlock the next level.</p>
              
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                {Array.from({ length: 100 }).map((_, i) => {
                  const levelNum = i + 1;
                  const isUnlocked = levelNum <= highestLevelUnlocked;
                  return (
                    <button
                      key={levelNum}
                      disabled={!isUnlocked}
                      onClick={() => startLevel(levelNum)}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        isUnlocked 
                          ? 'bg-white/5 border-white/10 hover:border-rose-500/50 hover:bg-rose-500/10 text-white cursor-pointer group' 
                          : 'bg-black/20 border-white/5 text-zinc-600 cursor-not-allowed'
                      }`}
                    >
                      {isUnlocked ? (
                        <Unlock size={14} className="text-zinc-400 group-hover:text-rose-400 transition-colors" />
                      ) : (
                        <Lock size={14} className="opacity-50" />
                      )}
                      <span className="font-mono font-medium text-xs">{levelNum}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* DUEL STAGE */}
          {stage === 'duel' && questions.length > 0 && (
            <motion.div 
              key={`q-${selectedLevel}-${round}`}
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-[#111111] border border-white/5 rounded-[2rem] p-8 sm:p-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12 p-6 bg-white/5 rounded-2xl border border-white/10 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500/20 border border-rose-500/50 text-rose-400 px-4 py-1 rounded-full font-mono text-sm flex items-center gap-2 backdrop-blur-md">
                  <Clock size={14} /> {timeLeft}s
                </div>
                <div className="text-center w-1/3">
                  <User className="text-zinc-300 mx-auto mb-2" size={24} />
                  <div className="text-3xl font-mono text-white">{playerScore}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">You</div>
                </div>
                <div className="text-2xl font-serif text-zinc-600 italic w-1/3 text-center">VS</div>
                <div className="text-center w-1/3">
                  <Cpu className="text-rose-500 mx-auto mb-2" size={24} />
                  <div className="text-3xl font-mono text-white">{aiScore}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">System AI</div>
                </div>
              </div>

              <div className="mb-8">
                <span className="block text-sm font-medium text-zinc-500 uppercase tracking-widest mb-2">
                  Round {round} of 5
                </span>
                <h2 className="text-2xl text-white font-serif leading-tight">{questions[round - 1].question}</h2>
              </div>
              
              <div className="space-y-3">
                {questions[round - 1].options.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleAnswer(opt)} 
                    className="w-full text-left p-5 rounded-2xl border border-white/10 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all text-zinc-300 font-medium group"
                  >
                    <span className="inline-block w-8 text-zinc-500 font-mono group-hover:text-rose-400 transition-colors">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* RESULT STAGE */}
          {stage === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="bg-[#111111] border border-white/5 rounded-[2rem] p-10 shadow-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-500 to-red-500 opacity-50"></div>
              
              <div className="mb-8">
                <Target className="text-rose-500 mx-auto mb-6" size={48} />
                <h2 className="text-4xl font-semibold tracking-tight text-white mb-2">
                  {playerScore > aiScore ? 'Victory' : playerScore < aiScore ? 'Defeat' : 'Draw'}
                </h2>
                <p className="text-zinc-400 text-lg">
                  {playerScore > aiScore ? 'You outsmarted the AI.' : playerScore < aiScore ? 'The AI was superior.' : 'A perfect stalemate.'}
                </p>
              </div>
              
              <div className="flex justify-center items-center gap-8 mb-10">
                <div className="text-center">
                  <div className="text-sm text-zinc-500 uppercase tracking-widest mb-1">Your Score</div>
                  <div className={`text-3xl font-mono ${playerScore >= aiScore ? 'text-white' : 'text-zinc-400'}`}>{playerScore}</div>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div className="text-center">
                  <div className="text-sm text-zinc-500 uppercase tracking-widest mb-1">AI Score</div>
                  <div className={`text-3xl font-mono ${aiScore >= playerScore ? 'text-rose-400' : 'text-zinc-400'}`}>{aiScore}</div>
                </div>
              </div>
              
              <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl inline-block">
                <span className="text-amber-400 text-lg font-mono font-bold">+{playerScore > aiScore ? playerScore + 500 + (selectedLevel * 20) : playerScore} XP</span>
              </div>

              {playerScore > aiScore && selectedLevel < 100 && (
                <div className="mb-8 ml-4 p-4 bg-white/5 border border-white/10 rounded-xl inline-block">
                  <span className="text-emerald-400 text-sm font-medium">Level {selectedLevel + 1} Unlocked!</span>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setStage('levelSelect')} 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white hover:bg-white/20 rounded-full font-medium text-lg transition-colors"
                >
                  Back to Levels
                </button>
                {playerScore > aiScore && selectedLevel < 100 && (
                  <button 
                    onClick={() => startLevel(selectedLevel + 1)} 
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Next Level <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
