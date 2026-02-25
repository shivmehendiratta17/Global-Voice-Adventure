import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../data/questions';
import { Clock, Star, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface GameScreenProps {
  key?: string;
  question: Question;
  currentXp: number;
  currentStreak: number;
  onAnswer: (isCorrect: boolean, xpEarned: number, timeTaken: number) => void;
  onNext: () => void;
}

export function GameScreen({ question, currentXp, currentStreak, onAnswer, onNext }: GameScreenProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(60);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setXpEarned(0);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [question]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    onAnswer(false, 0, 60);
  };

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    const isCorrect = index === question.correctAnswer;
    let earned = 0;
    const timeTaken = 60 - timeLeft;
    
    if (isCorrect) {
      const timeBonus = Math.max(0, 50 - timeTaken);
      const baseEarned = 100 + timeBonus;
      
      // Calculate multiplier based on current streak (before this answer)
      let multiplier = 1;
      if (currentStreak >= 8) multiplier = 2.0;
      else if (currentStreak >= 5) multiplier = 1.5;
      else if (currentStreak >= 3) multiplier = 1.2;

      earned = Math.floor(baseEarned * multiplier);
      setXpEarned(earned);
    }
    
    onAnswer(isCorrect, earned, timeTaken);
  };

  const progressPercentage = (timeLeft / 60) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen flex flex-col justify-center"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-zinc-900/80 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-zinc-800 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className={clsx(
                  "transition-all duration-1000 ease-linear",
                  timeLeft > 20 ? "text-blue-500" : timeLeft > 10 ? "text-amber-500" : "text-red-500"
                )}
                strokeDasharray="113"
                strokeDashoffset={113 - (113 * progressPercentage) / 100}
              />
            </svg>
            <span className="text-sm font-mono font-bold">{timeLeft}</span>
          </div>
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Round {question.round}</p>
            <p className="text-sm text-blue-400 font-medium">{question.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {currentStreak >= 3 && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1 bg-violet-500/20 px-3 py-1.5 rounded-lg border border-violet-500/30"
            >
              <span className="text-violet-400 font-bold text-sm tracking-wider uppercase">
                {currentStreak >= 8 ? '2.0x' : currentStreak >= 5 ? '1.5x' : '1.2x'} Multiplier
              </span>
              <span className="text-violet-300 text-xs ml-2">🔥 {currentStreak} Streak</span>
            </motion.div>
          )}
          <div className="flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20">
            <Star className="text-amber-400" size={20} fill="currentColor" />
            <span className="text-xl font-bold text-amber-400 font-mono">{currentXp.toLocaleString()} XP</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-amber-500 opacity-50"></div>
        <h2 className="text-2xl md:text-4xl font-serif leading-tight text-white mb-8">
          {question.text}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => {
            let btnClass = "bg-zinc-800/50 border-white/10 hover:bg-zinc-700 hover:border-blue-500/50 text-zinc-200";
            
            if (isAnswered) {
              if (index === question.correctAnswer) {
                btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
              } else if (index === selectedAnswer) {
                btnClass = "bg-red-500/20 border-red-500 text-red-300";
              } else {
                btnClass = "bg-zinc-900/50 border-white/5 text-zinc-600 opacity-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswered}
                className={clsx(
                  "p-6 text-left rounded-2xl border-2 transition-all duration-300 text-lg font-medium",
                  btnClass
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/20 text-sm font-bold opacity-70">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation & Next */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className={clsx(
                  "text-xl font-bold mb-2",
                  selectedAnswer === question.correctAnswer ? "text-emerald-400" : "text-red-400"
                )}>
                  {selectedAnswer === question.correctAnswer ? "Brilliant!" : "Incorrect"}
                  {xpEarned > 0 && <span className="ml-3 text-amber-400 text-base font-mono bg-amber-400/10 px-2 py-1 rounded-lg">+{xpEarned} XP</span>}
                </h3>
                <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                  {question.explanation}
                </p>
              </div>
              <button
                onClick={onNext}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors shrink-0"
              >
                Continue
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
