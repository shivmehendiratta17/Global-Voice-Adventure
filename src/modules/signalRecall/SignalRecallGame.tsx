import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../../store/useGameStore';
import { Zap, Eye, BrainCircuit, BookOpen, AlertTriangle } from 'lucide-react';
import { RulesModal } from '../../components/RulesModal';
import { Oracle } from '../../components/Oracle';
import { GameEngine } from '../../services/gameEngine';
import { RecallPattern } from '../../data/recallPatterns';
import { AchievementService } from '../../services/achievementService';

export function SignalRecallGame() {
  const { user, updateStats, unlockAchievement } = useGameStore();
  const [stage, setStage] = useState<'intro' | 'memorize' | 'recall' | 'result'>('intro');
  const [patterns, setPatterns] = useState<RecallPattern[]>([]);
  const [round, setRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(8);
  const [score, setScore] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState('');
  const [perfectRounds, setPerfectRounds] = useState(0);

  useEffect(() => {
    if (user?.cooldowns?.recall) {
      const remaining = user.cooldowns.recall - Date.now();
      if (remaining > 0) {
        setCooldownActive(true);
        const interval = setInterval(() => {
          const nowRemaining = user.cooldowns!.recall - Date.now();
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

  const startMemory = () => {
    const sessionPatterns = GameEngine.getRecallSession();
    setPatterns(sessionPatterns);
    setScore(0);
    setRound(0);
    setPerfectRounds(0);
    setStage('memorize');
    setTimeLeft(8);
  };

  useEffect(() => {
    if (stage === 'memorize' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (stage === 'memorize' && timeLeft === 0) {
      setStage('recall');
    }
  }, [stage, timeLeft]);

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(s => s + 500 * patterns[round].complexity);
      setPerfectRounds(p => p + 1);
    }
    
    if (round < patterns.length - 1) {
      setRound(r => r + 1);
      setStage('memorize');
      setTimeLeft(8);
    } else {
      setStage('result');
      updateStats('recall', score + (correct ? 500 * patterns[round].complexity : 0), { memory: 20, adaptability: 5 });
      
      const ach = AchievementService.checkSignalRecall(perfectRounds + (correct ? 1 : 0), patterns.length);
      if (ach) unlockAchievement(ach);
    }
  };

  const currentPattern = patterns[round];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-orange-500 opacity-50"></div>
        
        <div className="flex items-center gap-4 mb-8">
          <Zap className="text-amber-500" size={32} />
          <h1 className="text-3xl font-serif font-bold text-white">Signal Recall</h1>
        </div>

        {stage === 'intro' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-lg text-zinc-400 font-light mb-8">Memorize the pattern sequence. You have 8 seconds before the signal is lost. Precision is key across 5 rounds.</p>
            
            {cooldownActive ? (
              <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-center mb-8">
                <AlertTriangle className="text-amber-500 mx-auto mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">System Cooling Down</h3>
                <p className="text-zinc-400 mb-4">You must wait before initiating another Signal Recall session.</p>
                <div className="text-3xl font-mono text-amber-400">{cooldownRemaining}</div>
              </div>
            ) : (
              <div className="flex gap-4">
                <button onClick={startMemory} className="flex-1 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-bold transition-all">
                  Initialize Sequence
                </button>
                <button onClick={() => setShowRules(true)} className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full font-bold transition-all flex items-center gap-2 border border-white/5">
                  <BookOpen size={20} /> Rules
                </button>
              </div>
            )}
          </motion.div>
        )}

        {stage === 'memorize' && currentPattern && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="flex justify-between items-center mb-8">
              <span className="text-amber-400 font-mono text-xl">Signal Lost In: {timeLeft}s</span>
              <span className="text-zinc-500 font-mono">Round {round + 1}/{patterns.length}</span>
            </div>
            <div className="text-xs text-amber-500 uppercase tracking-widest mb-4">Type: {currentPattern.type} | Complexity: {currentPattern.complexity}</div>
            <div className="flex justify-center gap-4 max-w-lg mx-auto mb-8 flex-wrap">
              {currentPattern.sequence.map((item, i) => (
                <div key={i} className="w-16 h-16 bg-zinc-800 border border-white/10 rounded-2xl flex items-center justify-center text-3xl font-mono text-white shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {stage === 'recall' && currentPattern && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-between items-center mb-8">
              <span className="text-amber-400 font-mono text-xl">Score: {score}</span>
              <span className="text-zinc-500 font-mono">Round {round + 1}/{patterns.length}</span>
            </div>
            <h2 className="text-2xl text-white mb-6">Analytical Query</h2>
            <p className="text-xl text-zinc-300 mb-8 font-light">What was the exact sequence?</p>
            <div className="space-y-4">
              {[
                currentPattern.sequence.join(' '),
                [...currentPattern.sequence].reverse().join(' '),
                [...currentPattern.sequence].sort().join(' '),
                [...currentPattern.sequence].sort(() => Math.random() - 0.5).join(' ')
              ].filter((v, i, a) => a.indexOf(v) === i).sort(() => Math.random() - 0.5).map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt === currentPattern.sequence.join(' '))} className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-amber-500 hover:bg-amber-500/10 transition-all text-zinc-300 font-mono text-xl">
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {stage === 'result' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <BrainCircuit className="text-amber-500 mx-auto mb-6" size={48} />
            <h2 className="text-3xl font-bold text-white mb-2">Signal Analysis Complete</h2>
            <p className="text-xl text-amber-400 font-mono mb-8">Retention Score: {score}</p>
            <button onClick={() => window.history.back()} className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-bold transition-all">
              Return to Arena
            </button>
          </motion.div>
        )}
      </div>

      <RulesModal 
        isOpen={showRules}
        onClose={() => setShowRules(false)}
        title="Signal Recall"
        rules={[
          "A pattern sequence will be displayed for exactly 8 seconds.",
          "Memorize the items and their exact order.",
          "Once the signal is lost, you will face an analytical query about the sequence.",
          "Beware of trap options designed to test your precision.",
          "Complexity increases with each successful recall.",
          "After completing a session, the simulation will cool down for 7 minutes."
        ]}
      />

      <Oracle 
        gameContext="Signal Recall"
        currentQuestion={stage === 'recall' ? "What was the exact sequence?" : undefined}
      />
    </div>
  );
}
