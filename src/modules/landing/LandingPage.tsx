import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Target, Trophy, Star } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export function LandingPage() {
  const { user } = useGameStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center relative overflow-hidden">
      {/* Subtle animated global background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-500/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-cyan-500/30 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-12 z-10"
      >
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-600 mb-6 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
          GLOBAL VOICE ADVENTURE
        </h1>
        <p className="text-xl md:text-2xl text-cyan-400 font-light tracking-[0.2em] uppercase">
          Compete. Adapt. Lead.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-2xl mx-auto text-zinc-400 text-lg leading-relaxed mb-12 font-light z-10"
      >
        A premium competitive intelligence platform. Test your knowledge, memory, adaptability, global awareness, and strategic thinking across elite cognitive simulations.
      </motion.div>

      {user && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12 flex items-center gap-6 bg-zinc-900/60 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full z-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
              <span className="text-cyan-400 font-bold">{user.username.charAt(0).toUpperCase()}</span>
            </div>
            <div className="text-left">
              <div className="text-white font-bold">{user.username}</div>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-amber-400" />
            <span className="text-white font-mono">{user.rank}</span>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="flex items-center gap-2">
            <Star size={16} className="text-cyan-400" />
            <span className="text-white font-mono">{user.totalXP} XP</span>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="z-10"
      >
        <Link
          to={user ? "/arena" : "/auth"}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:-translate-y-1"
        >
          <Target className="group-hover:rotate-90 transition-transform duration-500" />
          <span>Enter the Arena</span>
          <div className="absolute inset-0 rounded-full border border-cyan-400/50 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"></div>
        </Link>
      </motion.div>
    </div>
  );
}
