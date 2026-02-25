import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ArrowRight, RotateCcw, Star } from 'lucide-react';

interface RoundSummaryProps {
  key?: string;
  round: number;
  correctCount: number;
  xpEarned: number;
  totalXp: number;
  onNextRound: () => void;
  onRetryRound: () => void;
  onViewLeaderboard: () => void;
  isGameOver: boolean;
}

export function RoundSummary({
  round,
  correctCount,
  xpEarned,
  totalXp,
  onNextRound,
  onRetryRound,
  onViewLeaderboard,
  isGameOver
}: RoundSummaryProps) {
  const passed = correctCount >= 3;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-screen p-4"
    >
      <div className="w-full max-w-lg bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl text-center relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${passed ? 'from-emerald-500 to-teal-500' : 'from-red-500 to-orange-500'}`}></div>
        
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
          Round {round} Complete
        </h2>
        <p className="text-zinc-400 mb-8 uppercase tracking-widest text-sm font-semibold">
          {passed ? 'Victory Achieved' : 'Defeat Suffered'}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
            <div className="text-4xl font-mono font-bold text-white mb-2">
              {correctCount}<span className="text-zinc-500 text-2xl">/5</span>
            </div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Correct Answers</div>
          </div>
          <div className="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20">
            <div className="text-4xl font-mono font-bold text-amber-400 mb-2 flex items-center justify-center gap-2">
              +{xpEarned}
            </div>
            <div className="text-xs text-amber-500/70 uppercase tracking-wider font-bold">XP Earned</div>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-zinc-300 text-lg mb-4">
            {passed 
              ? "You have proven your intellect. The next challenge awaits." 
              : "You must answer at least 3 questions correctly to advance. Study and try again."}
          </p>
          <div className="inline-flex items-center gap-2 bg-zinc-800/50 px-4 py-2 rounded-full border border-white/10">
            <Star size={16} className="text-amber-400" fill="currentColor" />
            <span className="text-zinc-300 font-mono font-medium">Total XP: {totalXp}</span>
          </div>
        </div>

        <div className="space-y-4">
          {passed && !isGameOver ? (
            <button
              onClick={onNextRound}
              className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Proceed to Round {round + 1}
              <ArrowRight size={20} />
            </button>
          ) : !passed ? (
            <button
              onClick={onRetryRound}
              className="w-full flex items-center justify-center gap-2 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-all border border-white/10"
            >
              <RotateCcw size={20} />
              Retry Round {round}
            </button>
          ) : null}

          <button
            onClick={onViewLeaderboard}
            className="w-full flex items-center justify-center gap-2 py-4 bg-transparent hover:bg-white/5 text-zinc-300 rounded-xl font-medium transition-all border border-transparent hover:border-white/10"
          >
            <Trophy size={20} className="text-amber-400" />
            View Leaderboard
          </button>
        </div>
      </div>
    </motion.div>
  );
}
