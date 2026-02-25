import React from 'react';
import { motion } from 'motion/react';
import { Lock, Unlock, Play, Trophy, ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';

interface LevelSelectProps {
  key?: string;
  unlockedRounds: number;
  onSelectRound: (round: number) => void;
  onViewLeaderboard: () => void;
  onViewAnalytics: () => void;
  onViewProtocol: () => void;
  onLogout: () => void;
  username: string;
  rank: string;
}

export function LevelSelect({ unlockedRounds, onSelectRound, onViewLeaderboard, onViewAnalytics, onViewProtocol, onLogout, username, rank }: LevelSelectProps) {
  const totalRounds = 25;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center min-h-screen p-4 py-12"
    >
      <div className="w-full max-w-5xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-amber-500 opacity-50"></div>
        
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="hidden md:inline font-medium">Logout</span>
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                Welcome, {username}
              </h2>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                {rank}
              </span>
            </div>
            <p className="text-sm text-zinc-400 uppercase tracking-widest font-semibold">
              {unlockedRounds} / {totalRounds} Rounds Unlocked
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onViewProtocol}
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <span className="hidden md:inline font-medium">Protocol</span>
            </button>
            <button
              onClick={onViewAnalytics}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
            >
              <span className="hidden md:inline font-medium">Analytics</span>
            </button>
            <button
              onClick={onViewLeaderboard}
              className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
            >
              <Trophy size={20} />
              <span className="hidden md:inline font-medium">Rankings</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: totalRounds }).map((_, i) => {
            const round = i + 1;
            const isUnlocked = round <= unlockedRounds;
            
            return (
              <motion.button
                key={round}
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                onClick={() => isUnlocked && onSelectRound(round)}
                disabled={!isUnlocked}
                className={clsx(
                  "relative aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-4 transition-all duration-300 overflow-hidden",
                  isUnlocked 
                    ? "bg-zinc-800/50 border-white/20 hover:border-blue-500/50 hover:bg-zinc-700/50 text-white cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.2)]" 
                    : "bg-black/40 border-white/5 text-zinc-600 cursor-not-allowed opacity-60"
                )}
              >
                {isUnlocked && (
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-violet-500/5 pointer-events-none"></div>
                )}
                
                <div className="mb-3">
                  {isUnlocked ? (
                    <Unlock size={24} className="text-blue-400 opacity-80" />
                  ) : (
                    <Lock size={24} className="text-zinc-700" />
                  )}
                </div>
                
                <span className="text-3xl font-serif font-bold mb-1">{round}</span>
                
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">
                  {round <= 5 ? "Elementary" : 
                   round <= 10 ? "Middle School" : 
                   round <= 15 ? "High School" : 
                   round <= 20 ? "Advanced" : "Undergraduate"}
                </span>

                {isUnlocked && (
                  <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
