import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Target, Clock, Zap, Brain, TrendingUp, Award } from 'lucide-react';
import { UserProfile } from '../lib/firebase';
import { clsx } from 'clsx';

interface AnalyticsScreenProps {
  key?: string;
  user: UserProfile;
  onBack: () => void;
}

export function AnalyticsScreen({ user, onBack }: AnalyticsScreenProps) {
  const totalCorrect = user.correctAnswers || 0;
  const totalAnswered = user.totalQuestionsAnswered || 0;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  
  const avgResponseTime = totalAnswered > 0 ? (user.totalResponseTime / totalAnswered).toFixed(1) : "0.0";

  let strongestCategory = "N/A";
  let weakestCategory = "N/A";
  let maxAcc = -1;
  let minAcc = 101;

  if (user.categoryStats) {
    Object.entries(user.categoryStats).forEach(([cat, stats]) => {
      if (stats.total > 0) {
        const acc = stats.correct / stats.total;
        if (acc > maxAcc) {
          maxAcc = acc;
          strongestCategory = cat;
        }
        if (acc < minAcc) {
          minAcc = acc;
          weakestCategory = cat;
        }
      }
    });
  }

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
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="hidden md:inline font-medium">Return</span>
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 mb-2">
              Warrior Analytics
            </h2>
            <p className="text-sm text-zinc-400 uppercase tracking-widest font-semibold">
              Performance Dashboard
            </p>
          </div>

          <div className="w-20 hidden md:block"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Rank Card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-amber-500/70 text-xs uppercase tracking-widest font-bold mb-1">Current Standing</p>
              <h3 className="text-3xl font-serif font-bold text-amber-400">{user.rank || "Novice Scholar"}</h3>
            </div>
            <div className="text-right">
              <p className="text-zinc-400 text-xs uppercase tracking-widest font-bold mb-1">Total Experience</p>
              <p className="text-2xl font-mono font-bold text-white">{user.totalXP.toLocaleString()} XP</p>
            </div>
          </div>

          {/* Stats Cards */}
          <StatCard icon={<Target />} title="Accuracy" value={`${accuracy}%`} subtitle={`${totalCorrect} / ${totalAnswered} Correct`} color="blue" />
          <StatCard icon={<Clock />} title="Avg Response" value={`${avgResponseTime}s`} subtitle="Per Question" color="violet" />
          <StatCard icon={<Zap />} title="Highest Streak" value={user.highestStreak || 0} subtitle="Consecutive Correct" color="amber" />
          
          <StatCard icon={<TrendingUp />} title="Strongest Field" value={strongestCategory} subtitle={maxAcc >= 0 ? `${Math.round(maxAcc * 100)}% Accuracy` : "Needs Data"} color="emerald" />
          <StatCard icon={<Brain />} title="Weakest Field" value={weakestCategory} subtitle={minAcc <= 100 ? `${Math.round(minAcc * 100)}% Accuracy` : "Needs Data"} color="red" />
          <StatCard icon={<Award />} title="Highest Round" value={user.highestRoundUnlocked} subtitle="Unlocked" color="zinc" />
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, title, value, subtitle, color }: { icon: React.ReactNode, title: string, value: string | number, subtitle: string, color: string }) {
  const colorMap: Record<string, string> = {
    blue: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    violet: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    amber: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    red: "text-red-400 bg-red-400/10 border-red-400/20",
    zinc: "text-zinc-300 bg-zinc-400/10 border-zinc-400/20",
  };

  return (
    <div className={clsx("p-6 rounded-2xl border flex flex-col justify-between", colorMap[color])}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-black/20 rounded-lg">
          {icon}
        </div>
        <h4 className="font-bold uppercase tracking-wider text-xs opacity-80">{title}</h4>
      </div>
      <div>
        <div className="text-3xl font-mono font-bold mb-1">{value}</div>
        <div className="text-xs font-medium opacity-60 uppercase tracking-wide">{subtitle}</div>
      </div>
    </div>
  );
}
