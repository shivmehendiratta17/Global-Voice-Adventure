import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Shield, Activity, Target, Zap, Globe } from 'lucide-react';
import { ACHIEVEMENTS } from '../services/achievementService';

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Activity,
  Target,
  Zap,
  Globe,
  Trophy
};

export function AchievementToast() {
  const [achievement, setAchievement] = useState<any | null>(null);

  useEffect(() => {
    const handleAchievement = (e: Event) => {
      const customEvent = e as CustomEvent;
      const achievementId = customEvent.detail;
      const ach = Object.values(ACHIEVEMENTS).find(a => a.id === achievementId);
      if (ach) {
        setAchievement(ach);
        setTimeout(() => setAchievement(null), 4000);
      }
    };

    window.addEventListener('achievementUnlocked', handleAchievement);
    return () => window.removeEventListener('achievementUnlocked', handleAchievement);
  }, []);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 bg-zinc-900/90 backdrop-blur-xl border border-amber-500/30 p-4 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.2)] flex items-center gap-4 min-w-[300px]"
        >
          <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/50">
            {React.createElement(iconMap[achievement.icon] || Trophy, { className: "text-amber-400", size: 24 })}
          </div>
          <div>
            <div className="text-xs text-amber-500 font-bold uppercase tracking-widest mb-1">Achievement Unlocked</div>
            <div className="text-white font-bold">{achievement.title}</div>
            <div className="text-zinc-400 text-sm">{achievement.description}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
