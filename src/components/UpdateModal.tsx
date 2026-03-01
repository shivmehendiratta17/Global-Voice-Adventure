import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Rocket, Mic, Globe, ShieldCheck } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';

const CURRENT_VERSION = 'v1.5.0';

export function UpdateModal() {
  const { user } = useGameStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const lastSeenVersion = localStorage.getItem(`global_voice_version_${user.username}`);
      if (lastSeenVersion !== CURRENT_VERSION) {
        setIsOpen(true);
      }
    }
  }, [user]);

  const handleClose = () => {
    if (user) {
      localStorage.setItem(`global_voice_version_${user.username}`, CURRENT_VERSION);
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-zinc-900 border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.2)] z-50 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500"></div>
            
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <Rocket className="text-cyan-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-white">System Update</h2>
                  <p className="text-xs text-cyan-400 font-mono">Version {CURRENT_VERSION}</p>
                </div>
              </div>
              <button onClick={handleClose} className="text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
              {/* Developer Welcome */}
              <div className="bg-cyan-950/30 border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                <h3 className="text-lg font-bold text-white mb-2">A Message from Developer Shiv</h3>
                <p className="text-cyan-100 leading-relaxed italic">
                  "Welcome to Version 1.5! We've packed this update with over 200+ levels, 5+ unique games, the new GV Sign up, a real-time leaderboard, and absolutely crazy fun you can have. Get ready to test your cognitive limits like never before!"
                </p>
                <p className="text-cyan-400 font-mono mt-4 text-sm">— Shiv, Lead Developer</p>
              </div>

              {/* Major Updates */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="text-emerald-400" size={24} />
                  What's New
                </h3>
                
                <div className="grid gap-4">
                  <div className="bg-zinc-800/50 border border-white/5 rounded-xl p-5 flex gap-4">
                    <div className="p-3 bg-violet-500/10 rounded-lg h-fit">
                      <Mic className="text-violet-400" size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">200+ Levels & 5+ Games</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Dive into an expanded Arena featuring over 200 challenging levels across 5+ distinct cognitive games. Endless crazy fun awaits!
                      </p>
                    </div>
                  </div>

                  <div className="bg-zinc-800/50 border border-white/5 rounded-xl p-5 flex gap-4">
                    <div className="p-3 bg-amber-500/10 rounded-lg h-fit">
                      <Globe className="text-amber-400" size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">New GV Sign Up</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Register for the Global Voice Competition directly from the app. Experience our stunning 3D interactive sign-up page!
                      </p>
                    </div>
                  </div>

                  <div className="bg-zinc-800/50 border border-white/5 rounded-xl p-5 flex gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-lg h-fit">
                      <Rocket className="text-cyan-400" size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Real-Time Leaderboard</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Compete globally and watch your rank climb in real-time. Track your progress and dominate the cognitive arena.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-zinc-900/50 flex justify-end">
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
              >
                Acknowledge & Continue
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
