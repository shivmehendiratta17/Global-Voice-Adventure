import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../../store/useGameStore';
import { Zap, Eye, BrainCircuit, BookOpen, AlertTriangle, ChevronRight, CheckCircle2, XCircle, ShieldAlert, Lock, Unlock, ArrowRight, Clock } from 'lucide-react';
import { GameEngine } from '../../services/gameEngine';
import { RecallPatternV2 } from '../../data/recallPatternsV2';

type QuestionType = 'exact' | 'reverse' | 'nth' | 'missing';

interface RecallQuestion {
  type: QuestionType;
  prompt: string;
  options: string[];
  correctAnswer: string;
}

export function SignalRecallGame() {
  const { user, updateStats } = useGameStore();
  
  // Game State
  const [stage, setStage] = useState<'intro' | 'levelSelect' | 'memorize' | 'recall' | 'result'>('intro');
  const [patterns, setPatterns] = useState<RecallPatternV2[]>([]);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0); // 0 to 3
  
  // Scoring
  const [levelScore, setLevelScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  // Time & Restrictions
  const [timeLeft, setTimeLeft] = useState(8);
  const [isCheckingLimit, setIsCheckingLimit] = useState(true);
  const [playAllowed, setPlayAllowed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  // UI State
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<RecallQuestion | null>(null);

  const highestLevelUnlocked = user?.highestRecallLevelUnlocked || 1;

  useEffect(() => {
    checkPlayLimit();
  }, [user]);

  const checkPlayLimit = async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/wager/check-limit?game=recall', { 
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

  useEffect(() => {
    if (stage === 'memorize' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (stage === 'memorize' && timeLeft === 0) {
      transitionToRecall();
    }
  }, [stage, timeLeft]);

  const generateQuestion = (pattern: RecallPatternV2): RecallQuestion => {
    const types: QuestionType[] = ['exact', 'reverse', 'nth', 'missing'];
    // Weight the types based on complexity/level
    let type = types[Math.floor(Math.random() * types.length)];
    
    // For early levels, stick to exact or nth
    if (pattern.level < 5) {
      type = Math.random() > 0.5 ? 'exact' : 'nth';
    }

    const seq = pattern.sequence;
    let prompt = '';
    let correctAnswer = '';
    let options: string[] = [];

    const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

    if (type === 'exact') {
      prompt = 'What was the exact sequence?';
      correctAnswer = seq.join(' ');
      options = [
        correctAnswer,
        [...seq].reverse().join(' '),
        shuffle(seq).join(' '),
        shuffle(seq).join(' ')
      ];
    } else if (type === 'reverse') {
      prompt = 'What was the sequence in reverse?';
      correctAnswer = [...seq].reverse().join(' ');
      options = [
        correctAnswer,
        seq.join(' '),
        shuffle(seq).join(' '),
        shuffle(seq).join(' ')
      ];
    } else if (type === 'nth') {
      const n = Math.floor(Math.random() * seq.length);
      const positions = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
      prompt = `What was the ${positions[n]} item in the sequence?`;
      correctAnswer = seq[n];
      // Generate wrong options from the sequence
      options = Array.from(new Set([correctAnswer, ...shuffle(seq)])).slice(0, 4);
      // If not enough unique items, add random chars
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      while (options.length < 4) {
        const char = charset[Math.floor(Math.random() * charset.length)];
        if (!options.includes(char)) options.push(char);
      }
    } else if (type === 'missing') {
      prompt = 'Which of these items was NOT in the sequence?';
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      let missingChar = '';
      while (!missingChar || seq.includes(missingChar)) {
        missingChar = charset[Math.floor(Math.random() * charset.length)];
      }
      correctAnswer = missingChar;
      options = [correctAnswer, seq[0], seq[Math.floor(seq.length / 2)], seq[seq.length - 1]];
    }

    // Ensure unique options
    options = Array.from(new Set(options));
    while (options.length < 4) {
       options.push(shuffle(seq).join(' ') + Math.floor(Math.random() * 10)); // Fallback
    }

    return {
      type,
      prompt,
      correctAnswer,
      options: shuffle(options.slice(0, 4))
    };
  };

  const startLevelSelect = () => {
    setStage('levelSelect');
  };

  const startLevel = async (level: number) => {
    if (!user) return;
    
    try {
      const res = await fetch('/api/wager/start-round?game=recall', {
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

    const sessionPatterns = GameEngine.getRecallSessionForLevel(level);
    setPatterns(sessionPatterns);
    setSelectedLevel(level);
    setLevelScore(0);
    setCorrectAnswers(0);
    setCurrentRoundIndex(0);
    setTimeLeft(8);
    setIsAnswerRevealed(false);
    setSelectedAnswer(null);
    setStage('memorize');
  };

  const transitionToRecall = () => {
    const q = generateQuestion(patterns[currentRoundIndex]);
    setCurrentQuestion(q);
    setStage('recall');
  };

  const handleAnswer = (option: string) => {
    if (isAnswerRevealed || !currentQuestion) return;
    
    setSelectedAnswer(option);
    setIsAnswerRevealed(true);
    
    const isCorrect = option === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      const basePoints = 300 + (selectedLevel * 20) + (patterns[currentRoundIndex].complexity * 50);
      setLevelScore(prev => prev + basePoints);
      setCorrectAnswers(prev => prev + 1);
    }
    
    setTimeout(nextRound, 2000);
  };

  const nextRound = () => {
    if (currentRoundIndex < 3) {
      setCurrentRoundIndex(prev => prev + 1);
      setTimeLeft(8);
      setIsAnswerRevealed(false);
      setSelectedAnswer(null);
      setStage('memorize');
    } else {
      finishLevel();
    }
  };

  const finishLevel = async () => {
    setStage('result');
    updateStats('recall', levelScore, { memory: levelScore / 100, adaptability: selectedLevel * 5 });
    
    const passed = correctAnswers >= 3;
    if (passed && selectedLevel === highestLevelUnlocked && selectedLevel < 25) {
      if (user) {
        try {
          await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              username: user.username, 
              updates: { highestRecallLevelUnlocked: selectedLevel + 1 } 
            })
          });
          useGameStore.setState((state) => ({
            user: state.user ? { ...state.user, highestRecallLevelUnlocked: selectedLevel + 1 } : null
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
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-amber-500/30">
      <div className="max-w-4xl mx-auto py-12 px-6">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-sm backdrop-blur-md">
              <Zap className="text-amber-500" size={20} />
            </div>
            <h1 className="text-xl font-medium tracking-tight text-zinc-100">Signal Recall</h1>
          </div>
          
          {stage !== 'intro' && stage !== 'levelSelect' && (
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Score</span>
                <span className="text-lg font-semibold text-white flex items-center gap-1">
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
              className="bg-[#111111] border border-white/5 rounded-[2rem] p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-50"></div>
              <h2 className="text-4xl font-semibold tracking-tight mb-4 text-white">Cognitive Retention</h2>
              <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-xl">
                25 levels of escalating complexity. Memorize the sequence before the signal is lost. You must achieve 75% accuracy (3/4 rounds) to unlock the next tier.
              </p>
              
              {isCheckingLimit ? (
                <div className="flex items-center gap-3 text-zinc-500">
                  <div className="w-5 h-5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying neural link...</span>
                </div>
              ) : !playAllowed ? (
                <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-4">
                  <ShieldAlert className="text-amber-500 shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-medium text-amber-100 mb-1">System Cooling Down</h3>
                    <p className="text-amber-200/70 mb-3">Neural pathways require rest. You can only initiate 3 levels every 10 minutes. You are allowed to play other games till then!</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 rounded-lg text-amber-300 font-mono text-sm">
                      <Clock size={14} /> Ready in {formatTime(timeRemaining)}
                    </div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={startLevelSelect} 
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 text-black rounded-full font-medium text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Initialize Sequence</span>
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
              <h2 className="text-3xl font-semibold tracking-tight mb-2 text-white">Select Tier</h2>
              <p className="text-zinc-400 mb-8">Choose an unlocked tier. Score 3/4 to advance.</p>
              
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
                          ? 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/50 hover:bg-amber-500/10 text-amber-500 cursor-pointer group' 
                          : 'bg-black/20 border-white/5 text-zinc-600 cursor-not-allowed'
                      }`}
                    >
                      {isUnlocked ? (
                        <Unlock size={20} className="text-amber-500/50 group-hover:text-amber-400 transition-colors" />
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

          {/* MEMORIZE STAGE */}
          {stage === 'memorize' && patterns.length > 0 && (
            <motion.div 
              key={`mem-${selectedLevel}-${currentRoundIndex}`}
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="bg-[#111111] border border-white/5 rounded-[2rem] p-10 shadow-2xl text-center relative overflow-hidden"
            >
              {/* Progress Bar */}
              <div className="flex gap-2 mb-10">
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                    {idx < currentRoundIndex && <div className="h-full bg-amber-500 w-full"></div>}
                    {idx === currentRoundIndex && (
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: '100%' }} 
                        transition={{ duration: 8, ease: "linear" }}
                        className="h-full bg-amber-400"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-12">
                <span className="text-zinc-500 font-mono uppercase tracking-widest text-sm">Round {currentRoundIndex + 1}/4</span>
                <div className={`flex items-center gap-2 text-xl font-mono ${timeLeft <= 3 ? 'text-rose-500 animate-pulse' : 'text-amber-400'}`}>
                  <Clock size={20} /> {timeLeft}s
                </div>
              </div>

              <div className="flex justify-center gap-4 max-w-2xl mx-auto mb-12 flex-wrap">
                {patterns[currentRoundIndex].sequence.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center text-4xl font-mono text-white shadow-[0_0_30px_rgba(245,158,11,0.05)]"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
              
              <p className="text-zinc-500 uppercase tracking-widest text-xs">Memorize the exact sequence</p>
            </motion.div>
          )}

          {/* RECALL STAGE */}
          {stage === 'recall' && currentQuestion && (
            <motion.div 
              key={`rec-${selectedLevel}-${currentRoundIndex}`}
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-[#111111] border border-white/5 rounded-[2rem] p-8 sm:p-10 shadow-2xl"
            >
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="block text-sm font-medium text-zinc-500 uppercase tracking-widest mb-1">
                    Analytical Query
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                    {currentQuestion.type}
                  </span>
                </div>
                <span className="text-zinc-500 font-mono">Round {currentRoundIndex + 1}/4</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-medium text-white leading-tight mb-10">
                {currentQuestion.prompt}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((opt, i) => {
                  const isCorrect = opt === currentQuestion.correctAnswer;
                  const isSelected = selectedAnswer === opt;
                  
                  let buttonClass = "w-full text-left p-5 rounded-2xl border transition-all duration-200 flex justify-between items-center group ";
                  
                  if (!isAnswerRevealed) {
                    buttonClass += "bg-white/5 border-white/5 hover:bg-amber-500/10 hover:border-amber-500/30 text-zinc-300 hover:text-white font-mono text-xl";
                  } else {
                    if (isCorrect) {
                      buttonClass += "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 font-mono text-xl";
                    } else if (isSelected) {
                      buttonClass += "bg-rose-500/10 border-rose-500/50 text-rose-400 font-mono text-xl";
                    } else {
                      buttonClass += "bg-white/5 border-white/5 text-zinc-600 opacity-50 font-mono text-xl";
                    }
                  }

                  return (
                    <button 
                      key={i} 
                      onClick={() => handleAnswer(opt)} 
                      disabled={isAnswerRevealed}
                      className={buttonClass}
                    >
                      <span>{opt}</span>
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
                  {correctAnswers >= 3 ? 'Tier Complete' : 'Tier Failed'}
                </h2>
                <p className="text-zinc-400 text-lg">
                  You successfully recalled <span className="text-white font-medium">{correctAnswers}</span> out of 4 sequences.
                </p>
              </div>
              
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl mb-10 max-w-sm mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-400">Retention Score</span>
                  <span className="text-2xl font-semibold text-white">{levelScore.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-400">XP Earned</span>
                  <span className="text-2xl font-semibold text-amber-400">+{levelScore.toLocaleString()}</span>
                </div>
                {correctAnswers >= 3 && selectedLevel < 25 && (
                  <div className="mt-4 pt-4 border-t border-white/10 text-emerald-400 text-sm font-medium">
                    Tier {selectedLevel + 1} Unlocked!
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setStage('levelSelect')} 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white hover:bg-white/20 rounded-full font-medium text-lg transition-colors"
                >
                  Back to Tiers
                </button>
                {correctAnswers >= 3 && selectedLevel < 25 && (
                  <button 
                    onClick={() => startLevel(selectedLevel + 1)} 
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-black hover:bg-amber-400 rounded-full font-medium text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Next Tier <ArrowRight size={20} />
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
