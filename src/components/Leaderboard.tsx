import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { subscribeToLeaderboard, UserProfile } from '../lib/api';
import { Trophy, ArrowLeft, Loader2, Medal } from 'lucide-react';
import { clsx } from 'clsx';

interface LeaderboardProps {
  key?: string;
  onBack: () => void;
}

export function Leaderboard({ onBack }: LeaderboardProps) {
  const [entries, setEntries] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToLeaderboard((data) => {
      setEntries(data);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center min-h-screen p-4 py-12"
    >
      <div className="w-full max-w-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 opacity-50"></div>
        
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="hidden md:inline font-medium">Return</span>
          </button>
          <div className="flex items-center gap-3">
            <Trophy className="text-amber-400" size={28} />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
              Hall of Fame
            </h2>
          </div>
          <div className="w-20 hidden md:block"></div> {/* Spacer for centering */}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p className="font-mono text-sm uppercase tracking-widest">Consulting the Archives...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 font-mono text-sm uppercase tracking-widest">
            The archives are empty. Be the first to claim glory.
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/10 text-xs font-bold text-zinc-500 uppercase tracking-widest">
              <div className="col-span-2 md:col-span-1 text-center">Rank</div>
              <div className="col-span-5 md:col-span-6">Scholar</div>
              <div className="col-span-2 md:col-span-2 text-center">Round</div>
              <div className="col-span-3 text-right">Total XP</div>
            </div>
            
            {entries.map((entry, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={entry.username || index}
                className={clsx(
                  "grid grid-cols-12 gap-4 items-center px-6 py-4 rounded-2xl border transition-all",
                  index === 0 ? "bg-amber-500/10 border-amber-500/30" :
                  index === 1 ? "bg-zinc-300/10 border-zinc-300/30" :
                  index === 2 ? "bg-orange-700/10 border-orange-700/30" :
                  "bg-black/20 border-white/5 hover:bg-white/5"
                )}
              >
                <div className="col-span-2 md:col-span-1 flex justify-center">
                  {index === 0 ? <Medal className="text-amber-400" size={24} /> :
                   index === 1 ? <Medal className="text-zinc-300" size={24} /> :
                   index === 2 ? <Medal className="text-orange-600" size={24} /> :
                   <span className="text-zinc-500 font-mono font-bold text-lg">{index + 1}</span>}
                </div>
                <div className="col-span-5 md:col-span-6 font-medium text-white truncate text-sm md:text-base">
                  {entry.username}
                </div>
                <div className="col-span-2 md:col-span-2 text-center text-zinc-400 font-mono text-sm">
                  {entry.highestRoundUnlocked}
                </div>
                <div className="col-span-3 text-right font-mono font-bold text-amber-400 text-sm md:text-base">
                  {entry.totalXP.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
