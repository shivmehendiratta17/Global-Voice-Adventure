import React from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../../store/useGameStore';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { User, Trophy, Activity, Brain, Shield, Zap, Target, Globe, Award } from 'lucide-react';
import { ACHIEVEMENTS } from '../../services/achievementService';

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Activity,
  Target,
  Zap,
  Globe,
  Trophy
};

export function ProfilePage() {
  const { user } = useGameStore();
  const [activeTab, setActiveTab] = React.useState<'stats' | 'achievements'>('stats');

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-zinc-500 font-mono">No active scholar profile found. Please return to the Arena to initialize.</div>
      </div>
    );
  }

  const data = [
    { subject: 'Strategy', A: user.stats.strategicScore || 50, fullMark: 100 },
    { subject: 'Adaptability', A: user.stats.adaptabilityIndex || 50, fullMark: 100 },
    { subject: 'Memory', A: user.stats.memoryPrecision || 50, fullMark: 100 },
    { subject: 'Info Literacy', A: user.stats.infoLiteracy || 50, fullMark: 100 },
    { subject: 'Speed', A: 100 - (user.stats.avgResponseTime || 50), fullMark: 100 },
    { subject: 'Win Rate', A: user.stats.winRate || 50, fullMark: 100 },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Scholar Profile</h1>
          <p className="text-cyan-400 font-mono tracking-widest uppercase text-sm">{user.id}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex bg-zinc-900/60 rounded-full p-1 border border-white/5">
            <button 
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'stats' ? 'bg-cyan-600 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Statistics
            </button>
            <button 
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'achievements' ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Achievements
            </button>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-3xl font-bold text-white">{(user.totalXP || 0).toLocaleString()} XP</div>
            <div className="text-zinc-500 font-medium">{user.rank}</div>
          </div>
        </div>
      </motion.div>

      {activeTab === 'stats' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 opacity-50"></div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Activity className="text-cyan-500" size={20}/> Cognitive Breakdown</h2>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'monospace' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#22d3ee' }}
                  />
                  <Radar name="Scholar" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Brain size={24} /></div>
              <div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">Strategic Score</div>
                <div className="text-2xl font-mono text-white">{user.stats.strategicScore}</div>
              </div>
            </div>
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400"><Zap size={24} /></div>
              <div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">Memory Precision</div>
                <div className="text-2xl font-mono text-white">{user.stats.memoryPrecision}</div>
              </div>
            </div>
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex items-center gap-4">
              <div className="p-3 bg-rose-500/10 rounded-xl text-rose-400"><Target size={24} /></div>
              <div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">Adaptability Index</div>
                <div className="text-2xl font-mono text-white">{user.stats.adaptabilityIndex}</div>
              </div>
            </div>
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400"><Shield size={24} /></div>
              <div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">Info Literacy</div>
                <div className="text-2xl font-mono text-white">{user.stats.infoLiteracy}</div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-orange-500 opacity-50"></div>
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2"><Award className="text-amber-500" size={24}/> Unlocked Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(ACHIEVEMENTS).map((ach) => {
              const isUnlocked = user.achievements?.includes(ach.id);
              const Icon = iconMap[ach.icon] || Trophy;
              
              return (
                <div 
                  key={ach.id} 
                  className={`p-6 rounded-2xl border transition-all ${isUnlocked ? 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'bg-zinc-900/50 border-white/5 opacity-50 grayscale'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isUnlocked ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400' : 'bg-zinc-800 text-zinc-500'}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className={`text-lg font-bold mb-1 ${isUnlocked ? 'text-white' : 'text-zinc-400'}`}>{ach.title}</h3>
                  <p className="text-sm text-zinc-500">{ach.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
