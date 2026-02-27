import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Loader2 } from 'lucide-react';
import { oracleService } from '../services/oracleService';
import { useGameStore } from '../store/useGameStore';

interface OracleProps {
  gameContext: string;
  currentQuestion?: string;
}

export function Oracle({ gameContext, currentQuestion }: OracleProps) {
  const { oracleHintsEnabled } = useGameStore();
  const [isOpen, setIsOpen] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(3); // Mock backend counter

  if (!oracleHintsEnabled) return null;

  const requestHint = async () => {
    if (hintsRemaining <= 0 || loading) return;
    
    setLoading(true);
    try {
      const response = await oracleService.getHint(gameContext, currentQuestion);
      setHint(response);
      setHintsRemaining(prev => prev - 1);
    } catch (error) {
      console.error("Oracle Error:", error);
      setHint("The connection to the Oracle has been disrupted. Proceed with caution.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-zinc-900 border border-cyan-500/30 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:border-cyan-400 transition-all group z-40"
      >
        <Sparkles className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
      </button>

      {/* Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-zinc-950 border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Sparkles className="text-cyan-400" size={20} />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-white">The Oracle</h2>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
                <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
                  <p className="text-sm text-zinc-400 mb-2 uppercase tracking-widest font-bold">Status</p>
                  <p className="text-white">Connected to Global Intelligence Network.</p>
                  <p className="text-cyan-400 font-mono text-sm mt-2">Hints Remaining: {hintsRemaining}/3</p>
                </div>

                {hint && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-cyan-950/30 border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                    <p className="text-cyan-100 leading-relaxed italic font-serif text-lg">"{hint}"</p>
                  </motion.div>
                )}
              </div>

              <div className="p-6 border-t border-white/5 bg-zinc-900/50">
                <button
                  onClick={requestHint}
                  disabled={loading || hintsRemaining <= 0}
                  className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.2)] disabled:shadow-none"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                  {hintsRemaining > 0 ? 'Consult Oracle' : 'Connection Depleted'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
