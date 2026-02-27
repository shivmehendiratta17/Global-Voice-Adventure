import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Brain, Zap, Target, Shield, Activity, Lock, Globe, Clock } from 'lucide-react';

export function ArenaPage() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Target date: March 31, 2026 (or next year if passed)
    const targetDate = new Date('2026-03-31T00:00:00Z').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft('OPEN');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  const games = [
    { id: 'quiz', title: 'Quiz 2.0', desc: 'Strategic Wager Mode', icon: Brain, color: 'from-blue-500 to-cyan-500', path: '/arena/quiz', locked: false },
    { id: 'signal-recall', title: 'Signal Recall', desc: 'Memory + Logic', icon: Zap, color: 'from-amber-500 to-orange-500', path: '/arena/signal-recall', locked: false },
    { id: 'mind-duel', title: 'Mind Duel', desc: 'Adaptive AI', icon: Target, color: 'from-rose-500 to-red-500', path: '/arena/mind-duel', locked: false },
    { id: 'crisis-command', title: 'Crisis Command', desc: 'Global Strategy Simulation', icon: Shield, color: 'from-emerald-500 to-teal-500', path: '/arena/crisis-command', locked: false },
    { id: 'signal-vs-noise', title: 'Signal vs Noise', desc: 'Information Intelligence', icon: Activity, color: 'from-violet-500 to-purple-500', path: '/arena/signal-vs-noise', locked: false },
    { 
      id: 'global-competition', 
      title: 'Global Competition', 
      desc: 'March 31 Tournament', 
      icon: Globe, 
      color: 'from-fuchsia-500 to-pink-500', 
      path: '/arena/global-competition', 
      locked: timeLeft !== 'OPEN',
      special: true
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">The Arena</h1>
        <p className="text-zinc-400 text-lg font-light max-w-2xl">Select a cognitive simulation to begin. Each module tests a different facet of your strategic intelligence.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={game.locked ? '#' : game.path}
              className={`block relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 backdrop-blur-xl p-8 transition-all duration-500 group ${game.locked ? 'opacity-50 cursor-not-allowed' : 'hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] hover:-translate-y-1'}`}
            >
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${game.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${game.color} bg-opacity-10 shadow-inner relative`}>
                  <game.icon className="text-white relative z-10" size={32} />
                  {game.special && (
                    <div className="absolute inset-0 bg-fuchsia-500/20 blur-xl rounded-full animate-pulse"></div>
                  )}
                </div>
                {game.locked ? (
                  <div className="flex items-center gap-2 bg-zinc-800/80 px-3 py-1.5 rounded-full border border-white/5">
                    {game.special ? (
                      <>
                        <Clock className="text-fuchsia-400" size={14} />
                        <span className="text-xs font-mono text-fuchsia-400">{timeLeft}</span>
                      </>
                    ) : (
                      <Lock className="text-zinc-500" size={18} />
                    )}
                  </div>
                ) : game.special && (
                  <div className="flex items-center gap-2 bg-fuchsia-500/20 px-3 py-1.5 rounded-full border border-fuchsia-500/30">
                    <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider animate-pulse">Live Now</span>
                  </div>
                )}
              </div>

              <h2 className={`text-2xl font-bold mb-2 ${game.special ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-fuchsia-200' : 'text-white'}`}>
                {game.title}
              </h2>
              <p className="text-zinc-400 font-light">{game.desc}</p>

              {!game.locked && (
                <div className={`mt-8 flex items-center font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform ${game.special ? 'text-fuchsia-400' : 'text-cyan-400'}`}>
                  Initiate Protocol &rarr;
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
