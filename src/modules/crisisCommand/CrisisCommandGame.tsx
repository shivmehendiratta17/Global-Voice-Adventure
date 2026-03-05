import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../../store/useGameStore';
import { Shield, Globe, TrendingUp, Users, BookOpen, AlertTriangle, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { RulesModal } from '../../components/RulesModal';
import { getCrisisState, playCrisisYear, checkWagerLimit, startWagerRound } from '../../lib/api';
import { CrisisScenario, generateCrisisScenario } from '../../data/crisisScenarios';

interface CrisisState {
  current_year: number;
  years_played_current_batch: number;
  lockout_until: string | null;
  stability: number;
  economy: number;
  trust: number;
  relations: number;
}

export function CrisisCommandGame() {
  const { user, updateStats, unlockAchievement } = useGameStore();
  const [stage, setStage] = useState<'intro' | 'simulation' | 'result'>('intro');
  const [gameState, setGameState] = useState<CrisisState | null>(null);
  const [currentScenario, setCurrentScenario] = useState<CrisisScenario | null>(null);
  const [showRules, setShowRules] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [impactDeltas, setImpactDeltas] = useState<{s: number, e: number, t: number, r: number} | null>(null);

  const [isCheckingLimit, setIsCheckingLimit] = useState(true);
  const [playAllowed, setPlayAllowed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (!user) return;
    fetchState();
  }, [user]);

  const checkPlayLimit = async () => {
    if (!user) return;
    try {
      const data = await checkWagerLimit(user.username, 'crisis');
      setPlayAllowed(data.allowed);
      if (!data.allowed) {
        setTimeRemaining(data.timeRemaining || 0);
      }
    } catch (error) {
      console.error("Failed to check limit", error);
    } finally {
      setIsCheckingLimit(false);
    }
  };

  useEffect(() => {
    if (!playAllowed) {
      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1000) {
            setPlayAllowed(true);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [playAllowed]);

  // Initial check on mount to ensure timer is accurate even after reload
  useEffect(() => {
    if (user) {
      checkPlayLimit();
    }
  }, [user]);

  const fetchState = async () => {
    try {
      setLoading(true);
      const data = await getCrisisState(user?.username || '');
      if (data.state) {
        setGameState(data.state);
        checkLockout(data.state);
      }
    } catch (e) {
      console.error("Failed to fetch crisis state", e);
    } finally {
      setLoading(false);
    }
  };

  const checkLockout = (state: CrisisState) => {
    if (state.lockout_until) {
      const lockoutTime = new Date(state.lockout_until).getTime();
      if (lockoutTime > Date.now()) {
        setIsLocked(true);
        updateCountdown(lockoutTime);
        return;
      }
    }
    setIsLocked(false);
  };

  const updateCountdown = (targetTime: number) => {
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = targetTime - now;
      if (distance <= 0) {
        clearInterval(interval);
        setIsLocked(false);
        fetchState();
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCooldownRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  const startSimulation = async () => {
    if (!gameState || !user) return;
    
    try {
      await startWagerRound(user.username, 'crisis');
    } catch (error: any) {
      console.error("Failed to start round", error);
      if (error.message === 'Play limit reached') {
        checkPlayLimit();
        setStage('intro');
      }
      return;
    }

    setCurrentScenario(generateCrisisScenario(gameState.current_year));
    setStage('simulation');
  };

  const handleDecision = async (index: number, impact: any) => {
    if (!user || !gameState || selectedOption !== null) return;
    
    setSelectedOption(index);
    setImpactDeltas({
      s: impact.stability || 0,
      e: impact.economy || 0,
      t: impact.publicTrust || 0,
      r: impact.globalRelations || 0
    });

    try {
      const data = await playCrisisYear(user.username, impact);

      if (data.state) {
        // Wait for animation
        setTimeout(() => {
          setGameState(data.state);
          setSelectedOption(null);
          setImpactDeltas(null);
          
          if (data.state.years_played_current_batch === 0 && data.state.lockout_until) {
            // They just hit the 10 year mark
            setIsLocked(true);
            updateCountdown(new Date(data.state.lockout_until).getTime());
            setStage('intro');
            
            // Score submission for the batch
            const finalScore = (data.state.stability + data.state.economy + data.state.trust + data.state.relations) * 15;
            updateStats('crisis', finalScore, { strategy: 25, adaptability: 15 });
          } else {
            setCurrentScenario(generateCrisisScenario(data.state.current_year));
          }
        }, 2000);
      }
    } catch (e: any) {
      console.error("Failed to play year", e);
      if (e.message === 'Locked out') {
        setIsLocked(true);
        // We don't have the exact lockout time from the error, so we'll just fetch state again
        fetchState();
        setStage('intro');
      }
      setSelectedOption(null);
      setImpactDeltas(null);
    }
  };

  const renderMetric = (label: string, value: number, delta: number | undefined, icon: any, color: string) => {
    const Icon = icon;
    return (
      <div className="relative text-center p-4 bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden">
        {delta !== undefined && delta !== 0 && (
          <motion.div 
            initial={{ opacity: 0, y: delta > 0 ? 20 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm z-10 ${delta > 0 ? 'text-emerald-400' : 'text-rose-400'}`}
          >
            <span className="text-2xl font-bold flex items-center gap-1">
              {delta > 0 ? <ArrowUp size={24} /> : <ArrowDown size={24} />}
              {Math.abs(delta)}
            </span>
          </motion.div>
        )}
        <Icon className={`${color} mx-auto mb-2`} size={24} />
        <div className="text-2xl font-mono text-white font-bold">{value}%</div>
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{label}</div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-teal-500 opacity-50"></div>
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Shield className="text-emerald-500" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-white">Crisis Command</h1>
              {gameState && <div className="text-emerald-400 font-mono text-sm mt-1">Year {gameState.current_year} / 200</div>}
            </div>
          </div>
          {gameState && !isLocked && stage === 'simulation' && (
            <div className="text-right">
              <div className="text-sm text-zinc-400 uppercase tracking-widest font-bold">Daily Limit</div>
              <div className="text-xl font-mono text-white">{10 - gameState.years_played_current_batch} Years Left</div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="py-20 text-center text-zinc-500 flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            Loading simulation state...
          </div>
        ) : stage === 'intro' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-black/30 border border-white/5 rounded-2xl p-6 mb-8">
              <p className="text-lg text-zinc-300 font-light leading-relaxed">
                Welcome to the endless simulation. You are tasked with guiding your nation through 200 years of evolving geopolitical crises.
              </p>
              <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                <p className="text-amber-200/80 text-sm">
                  <strong className="text-amber-400 block mb-1">Temporal Restriction Active</strong>
                  You may only simulate 10 years per real-world day. Plan wisely.
                </p>
              </div>
            </div>
            
            {isLocked ? (
              <div className="p-8 bg-zinc-900/80 border border-white/10 rounded-2xl text-center mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <Clock className="text-emerald-500 mx-auto mb-4 relative z-10" size={48} />
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Simulation Locked</h3>
                <p className="text-zinc-400 mb-6 relative z-10">You are allowed to play other games till then.</p>
                <div className="text-4xl font-mono text-emerald-400 font-bold tracking-widest relative z-10">{cooldownRemaining}</div>
              </div>
            ) : isCheckingLimit ? (
              <div className="flex items-center gap-3 text-zinc-500">
                <div className="w-5 h-5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying access...</span>
              </div>
            ) : !playAllowed ? (
              <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-4">
                <AlertTriangle className="text-rose-500 shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-lg font-medium text-rose-100 mb-1">Play Limit Reached</h3>
                  <p className="text-rose-200/70 mb-3">To ensure fair play and prevent burnout, you can only play a limited number of sessions. You are allowed to play other games till then!</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-500/20 rounded-lg text-rose-300 font-mono text-sm">
                    <Clock size={14} /> Try again in {Math.floor(timeRemaining / 60000)}:{(Math.floor((timeRemaining % 60000) / 1000)).toString().padStart(2, '0')}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <button onClick={startSimulation} className="flex-1 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                  Resume Timeline (Year {gameState?.current_year})
                </button>
                <button onClick={() => setShowRules(true)} className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-bold transition-all flex items-center gap-2 border border-white/5">
                  <BookOpen size={20} /> Rules
                </button>
              </div>
            )}
          </motion.div>
        )}

        {stage === 'simulation' && currentScenario && gameState && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {renderMetric('Stability', gameState.stability, impactDeltas?.s, Shield, 'text-blue-400')}
              {renderMetric('Economy', gameState.economy, impactDeltas?.e, TrendingUp, 'text-emerald-400')}
              {renderMetric('Public Trust', gameState.trust, impactDeltas?.t, Users, 'text-amber-400')}
              {renderMetric('Global Rel.', gameState.relations, impactDeltas?.r, Globe, 'text-purple-400')}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">{currentScenario.title}</h2>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">{currentScenario.description}</p>
            </div>
            
            <div className="space-y-4">
              {currentScenario.options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const isProcessing = selectedOption !== null;
                
                return (
                  <button 
                    key={i} 
                    onClick={() => handleDecision(i, opt.impact)}
                    disabled={isProcessing}
                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                      isSelected 
                        ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]' 
                        : isProcessing 
                          ? 'border-white/5 bg-black/20 opacity-50 cursor-not-allowed'
                          : 'border-white/10 bg-zinc-900/50 hover:border-emerald-500/50 hover:bg-zinc-800/80'
                    }`}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="selection-glow"
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                    <div className="relative z-10">
                      <div className={`text-lg font-medium mb-2 ${isSelected ? 'text-emerald-300' : 'text-zinc-200'}`}>
                        {opt.text}
                      </div>
                      <div className={`text-xs uppercase tracking-widest font-bold transition-colors ${isSelected ? 'text-emerald-400' : 'text-zinc-600'}`}>
                        {isSelected ? 'Executing Directive...' : 'Select Directive'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      <RulesModal 
        isOpen={showRules}
        onClose={() => setShowRules(false)}
        title="Crisis Command"
        rules={[
          "You are tasked with guiding your nation through 200 years of geopolitical crises.",
          "Every decision impacts four core metrics: Stability, Economy, Trust, and Relations.",
          "Balance is critical; neglecting any single metric may lead to systemic failure.",
          "You may only simulate 10 years per real-world day.",
          "After completing 10 years, the timeline must stabilize for 24 hours.",
          "Your progress is saved continuously."
        ]}
      />
    </div>
  );
}
