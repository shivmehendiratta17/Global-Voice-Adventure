import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Clock, ArrowLeft } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';

interface CooldownOverlayProps {
  gameId: string;
  children: React.ReactNode;
  onBack?: () => void;
}

export function CooldownOverlay({ gameId, children, onBack }: CooldownOverlayProps) {
  const { user } = useGameStore();
  const [cooldownRemaining, setCooldownRemaining] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (!user || !user.cooldowns || !user.cooldowns[gameId]) {
      setIsLocked(false);
      return;
    }

    const targetTime = user.cooldowns[gameId];
    
    const checkCooldown = () => {
      const now = Date.now();
      const distance = targetTime - now;
      
      if (distance <= 0) {
        setIsLocked(false);
        setCooldownRemaining(null);
      } else {
        setIsLocked(true);
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCooldownRemaining(`${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s`);
      }
    };

    checkCooldown();
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, [user, gameId]);

  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 min-h-[60vh] flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 md:p-12 bg-zinc-900/80 border border-white/10 rounded-3xl text-center relative overflow-hidden shadow-2xl w-full max-w-2xl"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 opacity-50"></div>
        
        <Clock className="text-amber-500 mx-auto mb-6 relative z-10" size={64} />
        <h3 className="text-3xl font-bold text-white mb-4 relative z-10 font-serif">System Cooling Down</h3>
        <p className="text-zinc-400 mb-8 relative z-10 text-lg">
          You are allowed to play other games till then.
        </p>
        
        <div className="text-5xl md:text-6xl font-mono text-amber-400 font-bold tracking-widest relative z-10 mb-10 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          {cooldownRemaining}
        </div>

        {onBack && (
          <button 
            onClick={onBack}
            className="relative z-10 flex items-center justify-center gap-2 mx-auto px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-all border border-white/5"
          >
            <ArrowLeft size={20} />
            Return to Dashboard
          </button>
        )}
      </motion.div>
    </div>
  );
}
