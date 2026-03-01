import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../../store/useGameStore';
import { Brain, Target, Clock, AlertTriangle, ChevronRight, CheckCircle2, XCircle, ShieldAlert, Coins, Lock, Unlock, ArrowRight } from 'lucide-react';
import { GameEngine } from '../../services/gameEngine';
import { WagerQuestion } from '../../data/wagerQuestions';

export function QuizGame() {
  const { user, updateStats } = useGameStore();
  
  // Game State
  const [stage, setStage] = useState<'intro' | 'levelSelect' | 'wager' | 'playing' | 'wagerQuestion' | 'result'>('intro');
  const [questions, setQuestions] = useState<WagerQuestion[]>([]);
  const [selectedLevel, setSelectedLevel] = useState(1); // 1 to 25
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 0 to 4 within the level
  
  // Scoring & Wagers
  const [levelScore, setLevelScore] = useState(0); 
  const [currentWager, setCurrentWager] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  // Time & Restrictions
  const [timeLeft, setTimeLeft] = useState(15);
  const [isCheckingLimit, setIsCheckingLimit] = useState(true);
  const [playAllowed, setPlayAllowed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  // UI State
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const highestLevelUnlocked = user?.highestRoundUnlocked || 1;

  useEffect(() => {
    checkPlayLimit();
  }, [user]);

  const checkPlayLimit = async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/wager/check-limit?game=quiz', {
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

  useEffect(() => {
    if ((stage === 'playing' || stage === 'wagerQuestion') && !isAnswerRevealed && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if ((stage === 'playing' || stage === 'wagerQuestion') && !isAnswerRevealed && timeLeft === 0) {
      handleAnswerTimeout();
    }
  }, [timeLeft, stage, isAnswerRevealed]);

  const startLevelSelect = async () => {
    if (!user) return;
    setStage('levelSelect');
  };

  const startLevel = async (level: number) => {
    if (!user) return;
    
    // Record the play on backend
    try {
      const res = await fetch('/api/wager/start-round?game=quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username })
      });
      if (!res.ok) {
        checkPlayLimit(); // Re-check if failed
        setStage('intro');
        return;
      }
    } catch (error) {
      console.error("Failed to start round", error);
      return;
    }

    const sessionQuestions = GameEngine.getWagerSessionForLevel(level);
    setQuestions(sessionQuestions);
    setSelectedLevel(level);
    setLevelScore(0);
    setCorrectAnswers(0);
    setCurrentQuestionIndex(0);
    setTimeLeft(15);
    setIsAnswerRevealed(false);
    setSelectedAnswer(null);
    setStage('playing');
  };

  const handleAnswerTimeout = () => {
    setSelectedAnswer(''); // Empty string means timeout
    setIsAnswerRevealed(true);
    setTimeout(nextQuestion, 2000);
  };

  const handleAnswer = (option: string) => {
    if (isAnswerRevealed) return;
    
    setSelectedAnswer(option);
    setIsAnswerRevealed(true);
    
    const currentQ = questions[currentQuestionIndex];
    const isCorrect = option === currentQ.correctAnswer;
    
    if (stage === 'wagerQuestion') {
      if (isCorrect) {
        setLevelScore(prev => prev + currentWager);
        setCorrectAnswers(prev => prev + 1);
      } else {
        setLevelScore(prev => Math.max(0, prev - currentWager));
      }
    } else {
      if (isCorrect) {
        const basePoints = 250 + (selectedLevel * 20);
        setLevelScore(prev => prev + basePoints);
        setCorrectAnswers(prev => prev + 1);
      }
    }
    
    setTimeout(nextQuestion, 2000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < 3) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(15);
      setIsAnswerRevealed(false);
      setSelectedAnswer(null);
    } else if (currentQuestionIndex === 3) {
      setStage('wager');
    } else {
      finishLevel();
    }
  };

  const handleWager = (amount: number) => {
    setCurrentWager(amount);
    setCurrentQuestionIndex(4);
    setTimeLeft(30); // More time for the final wager question
    setIsAnswerRevealed(false);
    setSelectedAnswer(null);
    setStage('wagerQuestion');
  };

  const finishLevel = async () => {
    setStage('result');
    updateStats('wager_game', levelScore, { strategy: levelScore / 100, literacy: selectedLevel * 5 });
    
    const passed = correctAnswers >= 3;
    if (passed && selectedLevel === highestLevelUnlocked && selectedLevel < 25) {
      if (user) {
        try {
          await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              username: user.username, 
              updates: { highestRoundUnlocked: selectedLevel + 1, lastPlayedRound: selectedLevel + 1 } 
            })
          });
          useGameStore.setState((state) => ({
            user: state.user ? { ...state.user, highestRoundUnlocked: selectedLevel + 1, lastPlayedRound: selectedLevel + 1 } : null
          }));
        } catch (e) {
          console.error("Failed to update progress", e);
        }
      }
    }

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
              <Brain className="text-zinc-300" size={20} />
            </div>
            <h1 className="text-xl font-medium tracking-tight text-zinc-100">Wager Protocol</h1>
          </div>
          
          {stage !== 'intro' && stage !== 'levelSelect' && (
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Score</span>
                <span className="text-lg font-semibold text-white flex items-center gap-1">
                  <Coins size={16} className="text-amber-400" />
                  {levelScore.toLocaleString()}
                </span>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Level</span>
                <span className="text-lg font-semibold text-white">{selectedLevel}/25</span>
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
              <h2 className="text-4xl font-semibold tracking-tight mb-4 text-white">High-Stakes Knowledge</h2>
              <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-xl">
                25 levels of escalating difficulty. Each level features 5 questions across diverse categories. You must answer at least 3 correctly to advance. Risk your accumulated score on the final Wager Question of each level.
              </p>
              
              {isCheckingLimit ? (
                <div className="flex items-center gap-3 text-zinc-500">
                  <div className="w-5 h-5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying access...</span>
                </div>
              ) : !playAllowed ? (
                <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-4">
                  <ShieldAlert className="text-rose-500 shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-medium text-rose-100 mb-1">Play Limit Reached</h3>
                    <p className="text-rose-200/70 mb-3">To ensure fair play and prevent burnout, you can only play 3 levels every 10 minutes. You are allowed to play other games till then!</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-500/20 rounded-lg text-rose-300 font-mono text-sm">
                      <Clock size={14} /> Try again in {formatTime(timeRemaining)}
                    </div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={startLevelSelect} 
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Initialize Protocol</span>
                  <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
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
              <p className="text-zinc-400 mb-8">Choose an unlocked level to begin. You must score 3/5 to unlock the next level.</p>
              
              <div className="grid grid-cols-5 gap-4">
                {Array.from({ length: 25 }).map((_, i) => {
                  const levelNum = i + 1;
                  const isUnlocked = levelNum <= highestLevelUnlocked;
                  return (
                    <button
                      key={levelNum}
                      disabled={!isUnlocked}
                      onClick={() => startLevel(levelNum)}
                      className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all ${
                        isUnlocked 
                          ? 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10 text-white cursor-pointer group' 
                          : 'bg-black/20 border-white/5 text-zinc-600 cursor-not-allowed'
                      }`}
                    >
                      {isUnlocked ? (
                        <Unlock size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
                      ) : (
                        <Lock size={20} className="opacity-50" />
                      )}
                      <span className="font-mono font-medium text-lg">{levelNum}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 text-center text-zinc-500 text-sm">More levels coming soon!</div>
            </motion.div>
          )}

          {/* WAGER STAGE */}
          {stage === 'wager' && (
            <motion.div 
              key="wager"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="bg-[#111111] border border-white/5 rounded-[2rem] p-10 shadow-2xl text-center"
            >
              <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
                <Coins size={32} />
              </div>
              
              <h2 className="text-3xl font-semibold tracking-tight mb-2 text-white">Final Wager Question</h2>
              <p className="text-zinc-400 mb-10">
                Current Score: <span className="text-white font-medium">{levelScore.toLocaleString()}</span>. How much will you risk?
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {[0, 0.25, 0.5, 1].map((multiplier) => {
                  const amount = Math.floor(levelScore * multiplier);
                  return (
                    <button 
                      key={multiplier}
                      onClick={() => handleWager(amount)}
                      className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl transition-all group"
                    >
                      <span className="text-sm font-medium text-zinc-500 mb-2">{multiplier * 100}%</span>
                      <span className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">{amount}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* PLAYING & WAGER QUESTION STAGE */}
          {(stage === 'playing' || stage === 'wagerQuestion') && questions.length > 0 && (
            <motion.div 
              key={`q-${selectedLevel}-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-[#111111] border border-white/5 rounded-[2rem] p-8 sm:p-10 shadow-2xl"
            >
              {/* Progress Bar */}
              <div className="flex gap-2 mb-10">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                    {idx < currentQuestionIndex && <div className="h-full bg-white w-full"></div>}
                    {idx === currentQuestionIndex && (
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: '100%' }} 
                        transition={{ duration: stage === 'wagerQuestion' ? 30 : 15, ease: "linear" }}
                        className={`h-full ${stage === 'wagerQuestion' ? 'bg-amber-400' : 'bg-white'}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="block text-sm font-medium text-zinc-500 uppercase tracking-widest mb-1">
                    {stage === 'wagerQuestion' ? 'Final Wager Question' : `Question ${currentQuestionIndex + 1} of 5`}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-widest ${stage === 'wagerQuestion' ? 'text-amber-500' : 'text-cyan-500'}`}>
                    {questions[currentQuestionIndex].category}
                  </span>
                </div>
                <div className={`flex items-center gap-2 text-lg font-mono ${timeLeft <= 5 ? 'text-rose-500 animate-pulse' : 'text-zinc-400'}`}>
                  <Clock size={18} /> {timeLeft}s
                </div>
              </div>

              {stage === 'wagerQuestion' && (
                <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl inline-flex items-center gap-3 text-amber-400">
                  <Coins size={20} />
                  <span className="font-medium">Wager: {currentWager} points</span>
                </div>
              )}

              <h2 className="text-2xl sm:text-3xl font-medium text-white leading-tight mb-10">
                {questions[currentQuestionIndex].question}
              </h2>

              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((opt, i) => {
                  const isCorrect = opt === questions[currentQuestionIndex].correctAnswer;
                  const isSelected = selectedAnswer === opt;
                  
                  let buttonClass = "w-full text-left p-5 rounded-2xl border transition-all duration-200 flex justify-between items-center group ";
                  
                  if (!isAnswerRevealed) {
                    buttonClass += "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20 text-zinc-300 hover:text-white";
                  } else {
                    if (isCorrect) {
                      buttonClass += "bg-emerald-500/10 border-emerald-500/50 text-emerald-400";
                    } else if (isSelected) {
                      buttonClass += "bg-rose-500/10 border-rose-500/50 text-rose-400";
                    } else {
                      buttonClass += "bg-white/5 border-white/5 text-zinc-600 opacity-50";
                    }
                  }

                  return (
                    <button 
                      key={i} 
                      onClick={() => handleAnswer(opt)} 
                      disabled={isAnswerRevealed}
                      className={buttonClass}
                    >
                      <span className="text-lg">{opt}</span>
                      {isAnswerRevealed && isCorrect && <CheckCircle2 size={20} className="text-emerald-500" />}
                      {isAnswerRevealed && isSelected && !isCorrect && <XCircle size={20} className="text-rose-500" />}
                    </button>
                  );
                })}
              </div>
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
                {correctAnswers >= 3 ? (
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 mb-6">
                    <XCircle size={40} />
                  </div>
                )}
                
                <h2 className="text-3xl font-semibold tracking-tight text-white mb-2">
                  {correctAnswers >= 3 ? 'Level Passed' : 'Level Failed'}
                </h2>
                <p className="text-zinc-400 text-lg">
                  You answered <span className="text-white font-medium">{correctAnswers}</span> out of 5 correctly.
                </p>
              </div>
              
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl mb-10 max-w-sm mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-400">Final Score</span>
                  <span className="text-2xl font-semibold text-white">{levelScore.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-400">XP Earned</span>
                  <span className="text-2xl font-semibold text-amber-400">+{levelScore.toLocaleString()}</span>
                </div>
                {correctAnswers >= 3 && selectedLevel < 25 && (
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
                {correctAnswers >= 3 && selectedLevel < 25 && (
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
