import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../../store/useGameStore';
import { Activity, AlertTriangle, CheckCircle, XCircle, BookOpen, ChevronRight, Lock, Unlock, ArrowRight, Clock } from 'lucide-react';
import { RulesModal } from '../../components/RulesModal';
import { GameEngine } from '../../services/gameEngine';
import { SignalItemV2 } from '../../data/signalItemsV2';
import { AchievementService } from '../../services/achievementService';

export function SignalVsNoiseGame() {
  const { user, updateStats, unlockAchievement } = useGameStore();
  
  const [stage, setStage] = useState<'intro' | 'levelSelect' | 'playing' | 'result'>('intro');
  const [items, setItems] = useState<SignalItemV2[]>([]);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean, explanation: string } | null>(null);
  const [showRules, setShowRules] = useState(false);
  
  const [isCheckingLimit, setIsCheckingLimit] = useState(true);
  const [playAllowed, setPlayAllowed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const highestLevelUnlocked = user?.highestSignalLevelUnlocked || 1;

  useEffect(() => {
    checkPlayLimit();
  }, [user]);

  const checkPlayLimit = async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/wager/check-limit?game=signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username })
      });
      const data = await res.json();
      setPlayAllowed(data.allowed);
      if (!data.allowed) {
        setTimeRemaining(data.timeRemaining);
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

  const startLevelSelect = () => {
    setStage('levelSelect');
  };

  const startLevel = async (level: number) => {
    if (!user) return;
    
    try {
      const res = await fetch('/api/wager/start-round?game=signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username })
      });
      if (!res.ok) {
        checkPlayLimit();
        setStage('intro');
        return;
      }
    } catch (error) {
      console.error("Failed to start round", error);
      return;
    }

    const sessionItems = GameEngine.getSignalSessionForLevel(level);
    setItems(sessionItems);
    setSelectedLevel(level);
    setScore(0);
    setCorrectAnswers(0);
    setRound(0);
    setFeedback(null);
    setStage('playing');
  };

  const handleClassification = (credible: boolean) => {
    if (feedback) return;
    
    const currentItem = items[round];
    const isCredible = currentItem.credibility === 'High' || currentItem.credibility === 'Medium';
    const isCorrect = credible === isCredible;
    
    if (isCorrect) {
      const basePoints = 350 + (selectedLevel * 25);
      setScore(s => s + basePoints);
      setCorrectAnswers(c => c + 1);
    }
    
    setFeedback({ correct: isCorrect, explanation: currentItem.explanation });
  };

  const nextRound = () => {
    setFeedback(null);
    if (round < items.length - 1) {
      setRound(r => r + 1);
    } else {
      finishLevel();
    }
  };

  const finishLevel = async () => {
    setStage('result');
    updateStats('signal', score, { literacy: 25, strategy: 5 });
    
    const passed = correctAnswers >= 2; // Need 2/3 to pass
    
    if (passed && selectedLevel === highestLevelUnlocked && selectedLevel < 49) {
      if (user) {
        try {
          await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              username: user.username, 
              updates: { highestSignalLevelUnlocked: selectedLevel + 1 } 
            })
          });
          useGameStore.setState((state) => ({
            user: state.user ? { ...state.user, highestSignalLevelUnlocked: selectedLevel + 1 } : null
          }));
        } catch (e) {
          console.error("Failed to update progress", e);
        }
      }
    }
    
    const accuracy = (correctAnswers / items.length) * 100;
    const ach = AchievementService.checkSignalVsNoise(accuracy);
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

  const currentItem = items[round];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-white/20">
      <div className="max-w-4xl mx-auto py-12 px-6">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-sm backdrop-blur-md">
              <Activity className="text-zinc-300" size={20} />
            </div>
            <h1 className="text-xl font-medium tracking-tight text-zinc-100">Signal vs Noise</h1>
          </div>
          
          {stage !== 'intro' && stage !== 'levelSelect' && (
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Score</span>
                <span className="text-lg font-semibold text-white flex items-center gap-1">
                  {score.toLocaleString()}
                </span>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Level</span>
                <span className="text-lg font-semibold text-white">{selectedLevel}/49</span>
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
              className="bg-[#111111] border border-white/5 rounded-[2rem] p-10 shadow-2xl"
            >
              <h2 className="text-4xl font-semibold tracking-tight mb-4 text-white">Information Intelligence</h2>
              <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-xl">
                49 levels of escalating complexity. Classify credibility, identify bias, and detect missing context in global headlines. You must correctly classify 2 out of 3 items to advance.
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
                    <p className="text-rose-200/70 mb-3">To ensure fair play and prevent burnout, you can only play 10 levels every 30 minutes. You are allowed to play other games till then!</p>
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
                    <span>Initialize Analysis</span>
                    <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </button>
                  <button onClick={() => setShowRules(true)} className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full font-bold transition-all flex items-center gap-2 border border-white/5">
                    <BookOpen size={20} /> Rules
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
              <p className="text-zinc-400 mb-8">Choose an unlocked level to begin. You must score 2/3 to unlock the next level.</p>
              
              <div className="grid grid-cols-5 sm:grid-cols-7 gap-4">
                {Array.from({ length: 49 }).map((_, i) => {
                  const levelNum = i + 1;
                  const isUnlocked = levelNum <= highestLevelUnlocked;
                  return (
                    <button
                      key={levelNum}
                      disabled={!isUnlocked}
                      onClick={() => startLevel(levelNum)}
                      className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                        isUnlocked 
                          ? 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10 text-white cursor-pointer group' 
                          : 'bg-black/20 border-white/5 text-zinc-600 cursor-not-allowed'
                      }`}
                    >
                      {isUnlocked ? (
                        <Unlock size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
                      ) : (
                        <Lock size={16} className="opacity-50" />
                      )}
                      <span className="font-mono font-medium text-sm">{levelNum}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 text-center text-zinc-500 text-sm">More coming soon.</div>
            </motion.div>
          )}

          {/* PLAYING STAGE */}
          {stage === 'playing' && currentItem && !feedback && (
            <motion.div 
              key={`q-${selectedLevel}-${round}`}
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-[#111111] border border-white/5 rounded-[2rem] p-8 sm:p-10 shadow-2xl"
            >
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="block text-sm font-medium text-zinc-500 uppercase tracking-widest mb-1">
                    Item {round + 1} of 3
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-violet-500">
                    Bias: {currentItem.bias}
                  </span>
                </div>
              </div>

              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 font-serif leading-tight">{currentItem.headline}</h2>
                <p className="text-lg text-zinc-300 font-light italic border-l-2 border-violet-500/50 pl-4">{currentItem.context}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => handleClassification(true)} 
                  className="py-5 bg-white/5 hover:bg-emerald-500/10 text-zinc-300 hover:text-emerald-400 rounded-2xl font-medium border border-white/5 hover:border-emerald-500/30 transition-all flex items-center justify-center gap-3 group"
                >
                  <CheckCircle size={20} className="group-hover:scale-110 transition-transform" /> Credible Signal
                </button>
                <button 
                  onClick={() => handleClassification(false)} 
                  className="py-5 bg-white/5 hover:bg-rose-500/10 text-zinc-300 hover:text-rose-400 rounded-2xl font-medium border border-white/5 hover:border-rose-500/30 transition-all flex items-center justify-center gap-3 group"
                >
                  <AlertTriangle size={20} className="group-hover:scale-110 transition-transform" /> Noise / Bias
                </button>
              </div>
            </motion.div>
          )}

          {/* FEEDBACK STAGE */}
          {stage === 'playing' && feedback && (
            <motion.div 
              key="feedback"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#111111] border border-white/5 rounded-[2rem] p-10 shadow-2xl text-center"
            >
              {feedback.correct ? (
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mb-6">
                  <CheckCircle size={40} />
                </div>
              ) : (
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 mb-6">
                  <XCircle size={40} />
                </div>
              )}
              
              <h2 className={`text-3xl font-semibold tracking-tight mb-4 ${feedback.correct ? 'text-emerald-400' : 'text-rose-400'}`}>
                {feedback.correct ? 'Assessment Correct' : 'Assessment Incorrect'}
              </h2>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 max-w-lg mx-auto">
                <p className="text-zinc-300 leading-relaxed">{feedback.explanation}</p>
              </div>
              
              <button 
                onClick={nextRound} 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Next Item <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {/* LEVEL RESULT STAGE */}
          {stage === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="bg-[#111111] border border-white/5 rounded-[2rem] p-10 shadow-2xl text-center"
            >
              <div className="mb-8">
                {correctAnswers >= 2 ? (
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mb-6">
                    <CheckCircle size={40} />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 mb-6">
                    <XCircle size={40} />
                  </div>
                )}
                
                <h2 className="text-3xl font-semibold tracking-tight text-white mb-2">
                  {correctAnswers >= 2 ? 'Level Passed' : 'Level Failed'}
                </h2>
                <p className="text-zinc-400 text-lg">
                  You classified <span className="text-white font-medium">{correctAnswers}</span> out of 3 correctly.
                </p>
              </div>
              
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl mb-10 max-w-sm mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-400">Final Score</span>
                  <span className="text-2xl font-semibold text-white">{score.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-400">XP Earned</span>
                  <span className="text-2xl font-semibold text-amber-400">+{score.toLocaleString()}</span>
                </div>
                {correctAnswers >= 2 && selectedLevel < 49 && (
                  <div className="mt-4 pt-4 border-t border-white/10 text-emerald-400 text-sm font-medium">
                    Level {selectedLevel + 1} Unlocked!
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setStage('levelSelect')} 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white hover:bg-white/20 rounded-full font-medium text-lg transition-colors"
                >
                  Back to Levels
                </button>
                {correctAnswers >= 2 && selectedLevel < 49 && (
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

      <RulesModal 
        isOpen={showRules}
        onClose={() => setShowRules(false)}
        title="Signal vs Noise"
        rules={[
          "Analyze incoming intelligence reports and news headlines.",
          "Determine if the information is a 'Credible Signal' or 'Noise/Bias'.",
          "Look for logical fallacies, lack of sources, or sensationalism.",
          "You must correctly classify at least 2 out of 3 items to advance to the next level.",
          "Detailed feedback is provided after each assessment.",
          "After completing a session, the simulation will cool down for 7 minutes."
        ]}
      />
    </div>
  );
}
