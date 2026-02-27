import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../../store/useGameStore';
import { Shield, Globe, TrendingUp, Users, BookOpen, AlertTriangle } from 'lucide-react';
import { RulesModal } from '../../components/RulesModal';
import { Oracle } from '../../components/Oracle';
import { GameEngine } from '../../services/gameEngine';
import { CrisisScenario } from '../../data/crisisScenarios';
import { AchievementService } from '../../services/achievementService';

export function CrisisCommandGame() {
  const { user, updateStats, unlockAchievement } = useGameStore();
  const [stage, setStage] = useState<'intro' | 'simulation' | 'result'>('intro');
  const [scenarios, setScenarios] = useState<CrisisScenario[]>([]);
  const [metrics, setMetrics] = useState({ stability: 50, economy: 50, trust: 50, relations: 50 });
  const [round, setRound] = useState(1);
  const [perfectDecisions, setPerfectDecisions] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState('');

  useEffect(() => {
    if (user?.cooldowns?.crisis) {
      const remaining = user.cooldowns.crisis - Date.now();
      if (remaining > 0) {
        setCooldownActive(true);
        const interval = setInterval(() => {
          const nowRemaining = user.cooldowns!.crisis - Date.now();
          if (nowRemaining <= 0) {
            setCooldownActive(false);
            clearInterval(interval);
          } else {
            const minutes = Math.floor(nowRemaining / 60000);
            const seconds = Math.floor((nowRemaining % 60000) / 1000);
            setCooldownRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
          }
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [user]);

  const startSimulation = () => {
    const sessionScenarios = GameEngine.getCrisisSession();
    setScenarios(sessionScenarios);
    setMetrics({ stability: 50, economy: 50, trust: 50, relations: 50 });
    setRound(1);
    setPerfectDecisions(0);
    setStage('simulation');
  };

  const handleDecision = (impact: Partial<typeof metrics>) => {
    const netImpact = (impact.stability || 0) + (impact.economy || 0) + (impact.trust || 0) + (impact.relations || 0);
    const isPerfect = netImpact > 0;
    if (isPerfect) setPerfectDecisions(p => p + 1);

    setMetrics(prev => ({
      stability: Math.max(0, Math.min(100, prev.stability + (impact.stability || 0))),
      economy: Math.max(0, Math.min(100, prev.economy + (impact.economy || 0))),
      trust: Math.max(0, Math.min(100, prev.trust + (impact.trust || 0))),
      relations: Math.max(0, Math.min(100, prev.relations + (impact.relations || 0))),
    }));

    if (round < scenarios.length) {
      setRound(r => r + 1);
    } else {
      setStage('result');
      const finalScore = (metrics.stability + metrics.economy + metrics.trust + metrics.relations) * 10;
      updateStats('crisis', finalScore, { strategy: 25, adaptability: 15 });
      
      const ach = AchievementService.checkCrisisCommand(perfectDecisions + (isPerfect ? 1 : 0));
      if (ach) unlockAchievement(ach);
    }
  };

  const currentScenario = scenarios[round - 1];

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-teal-500 opacity-50"></div>
        
        <div className="flex items-center gap-4 mb-8">
          <Shield className="text-emerald-500" size={32} />
          <h1 className="text-3xl font-serif font-bold text-white">Crisis Command</h1>
        </div>

        {stage === 'intro' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-lg text-zinc-400 font-light mb-8">Global Strategy Simulation. Balance Stability, Economy, Public Trust, and Global Relations through complex geopolitical scenarios.</p>
            
            {cooldownActive ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center mb-8">
                <AlertTriangle className="text-emerald-500 mx-auto mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">System Cooling Down</h3>
                <p className="text-zinc-400 mb-4">You must wait before initiating another Crisis Command session.</p>
                <div className="text-3xl font-mono text-emerald-400">{cooldownRemaining}</div>
              </div>
            ) : (
              <div className="flex gap-4">
                <button onClick={startSimulation} className="flex-1 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all">
                  Initialize Simulation
                </button>
                <button onClick={() => setShowRules(true)} className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full font-bold transition-all flex items-center gap-2 border border-white/5">
                  <BookOpen size={20} /> Rules
                </button>
              </div>
            )}
          </motion.div>
        )}

        {stage === 'simulation' && currentScenario && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {/* Metrics Dashboard */}
            <div className="grid grid-cols-4 gap-4 mb-12 p-6 bg-black/40 rounded-2xl border border-white/5">
              <div className="text-center">
                <Shield className="text-blue-400 mx-auto mb-2" size={20} />
                <div className="text-xl font-mono text-white">{metrics.stability}%</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Stability</div>
              </div>
              <div className="text-center">
                <TrendingUp className="text-emerald-400 mx-auto mb-2" size={20} />
                <div className="text-xl font-mono text-white">{metrics.economy}%</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Economy</div>
              </div>
              <div className="text-center">
                <Users className="text-amber-400 mx-auto mb-2" size={20} />
                <div className="text-xl font-mono text-white">{metrics.trust}%</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Public Trust</div>
              </div>
              <div className="text-center">
                <Globe className="text-purple-400 mx-auto mb-2" size={20} />
                <div className="text-xl font-mono text-white">{metrics.relations}%</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Global Rel.</div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Year {round}: {currentScenario.title}</h2>
            <p className="text-lg text-zinc-400 font-light mb-8">{currentScenario.description}</p>
            
            <div className="space-y-4">
              {currentScenario.options.map((opt, i) => (
                <button key={i} onClick={() => handleDecision(opt.impact)} className="w-full text-left p-5 rounded-xl border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all group">
                  <div className="text-zinc-200 font-medium mb-2">{opt.text}</div>
                  <div className="text-xs text-zinc-600 uppercase tracking-widest group-hover:text-emerald-400/70 transition-colors">Execute Directive &rarr;</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {stage === 'result' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <Globe className="text-emerald-500 mx-auto mb-6" size={48} />
            <h2 className="text-3xl font-bold text-white mb-2">Simulation Complete</h2>
            <p className="text-xl text-zinc-400 font-mono mb-8">Leadership Index: {Math.floor((metrics.stability + metrics.economy + metrics.trust + metrics.relations) / 4)}/100</p>
            <button onClick={() => window.history.back()} className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-bold transition-all">
              Return to Arena
            </button>
          </motion.div>
        )}
      </div>

      <RulesModal 
        isOpen={showRules}
        onClose={() => setShowRules(false)}
        title="Crisis Command"
        rules={[
          "You are tasked with resolving global geopolitical crises.",
          "Every decision impacts four core metrics: Stability, Economy, Trust, and Relations.",
          "Balance is critical; neglecting any single metric may lead to systemic failure.",
          "The simulation spans exactly 5 critical scenarios.",
          "Your final Leadership Index is the average of all four metrics at the end.",
          "After completing a session, the simulation will cool down for 7 minutes."
        ]}
      />

      <Oracle 
        gameContext="Crisis Command"
        currentQuestion={stage === 'simulation' && currentScenario ? currentScenario.description : undefined}
      />
    </div>
  );
}
