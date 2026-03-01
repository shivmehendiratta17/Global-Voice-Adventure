import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Star } from 'lucide-react';
import { getLeaderboard } from '../../lib/api';

interface LeaderboardEntry {
  username: string;
  totalXP: number;
  rank: string;
}

export function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <Trophy className="text-amber-500 mx-auto mb-4" size={48} />
        <h1 className="text-4xl font-serif font-bold text-white mb-2">Global Rankings</h1>
        <p className="text-zinc-400 font-light max-w-2xl mx-auto">The top minds across the Global Voice network. Ranked by total strategic XP.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/5 text-xs font-bold text-zinc-500 uppercase tracking-widest bg-black/40">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-5">Scholar</div>
          <div className="col-span-3">Tier</div>
          <div className="col-span-2 text-right">Score</div>
        </div>

        <div className="divide-y divide-white/5">
          {loading ? (
            <div className="p-8 text-center text-zinc-500">Loading rankings...</div>
          ) : leaderboard.length === 0 ? (
            <div className="p-8 text-center text-zinc-500">No rankings available yet.</div>
          ) : (
            leaderboard.map((entry, idx) => {
              const rank = idx + 1;
              return (
                <motion.div
                  key={entry.username}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-white/5 transition-colors group"
                >
                  <div className="col-span-2 flex justify-center">
                    {rank === 1 ? <Medal className="text-amber-400" size={24} /> :
                     rank === 2 ? <Medal className="text-zinc-300" size={24} /> :
                     rank === 3 ? <Medal className="text-amber-700" size={24} /> :
                     <span className="text-zinc-500 font-mono text-lg">{rank}</span>}
                  </div>
                  <div className="col-span-5 font-bold text-zinc-200 group-hover:text-cyan-400 transition-colors">
                    {entry.username}
                  </div>
                  <div className="col-span-3 text-sm text-zinc-400">
                    {entry.rank}
                  </div>
                  <div className="col-span-2 text-right font-mono text-cyan-400">
                    {entry.totalXP.toLocaleString()}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}
