import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../../store/useGameStore';
import { Activity, AlertTriangle, CheckCircle, XCircle, BookOpen } from 'lucide-react';
import { RulesModal } from '../../components/RulesModal';
import { Oracle } from '../../components/Oracle';
import { OracleAnalysis } from '../../components/OracleAnalysis';
import { GameEngine } from '../../services/gameEngine';
import { SignalItem } from '../../data/signalItems';
import { AchievementService } from '../../services/achievementService';

export function SignalVsNoiseGame() {
  const { user, updateStats, unlockAchievement } = useGameStore();
  const [stage, setStage] = useState<'intro' | 'playing' | 'result'>('intro');
  const [items, setItems] = useState<SignalItem[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean, explanation: string } | null>(null);
  const [showRules, setShowRules] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState('');

  useEffect(() => {
    if (user?.cooldowns?.signal) {
      const remaining = user.cooldowns.signal - Date.now();
      if (remaining > 0) {
        setCooldownActive(true);
        const interval = setInterval(() => {
          const nowRemaining = user.cooldowns!.signal - Date.now();
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

  const startAnalysis = () => {
    const sessionItems = GameEngine.getSignalSession();
    setItems(sessionItems);
    setScore(0);
    setRound(0);
    setFeedback(null);
    setStage('playing');
  };

  const handleClassification = (credible: boolean) => {
    const currentItem = items[round];
    const isCredible = currentItem.credibility === 'High' || currentItem.credibility === 'Medium';
    const isCorrect = credible === isCredible;
    
    if (isCorrect) {
      setScore(s => s + 1000);
    }
    
    setFeedback({ correct: isCorrect, explanation: currentItem.explanation });
  };

  const nextRound = () => {
    setFeedback(null);
    if (round < items.length - 1) {
      setRound(r => r + 1);
    } else {
      setStage('result');
      updateStats('signal', score, { literacy: 25, strategy: 5 });
      
      const accuracy = (score / (items.length * 1000)) * 100;
      const ach = AchievementService.checkSignalVsNoise(accuracy);
      if (ach) unlockAchievement(ach);
    }
  };

  const currentItem = items[round];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-purple-500 opacity-50"></div>
        
        <div className="flex items-center gap-4 mb-8">
          <Activity className="text-violet-500" size={32} />
          <h1 className="text-3xl font-serif font-bold text-white">Signal vs Noise</h1>
        </div>

        {stage === 'intro' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-lg text-zinc-400 font-light mb-8">Information Intelligence. Classify credibility, identify bias, and detect missing context in global headlines.</p>
            
            {cooldownActive ? (
              <div className="p-6 bg-violet-500/10 border border-violet-500/20 rounded-2xl text-center mb-8">
                <AlertTriangle className="text-violet-500 mx-auto mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">System Cooling Down</h3>
                <p className="text-zinc-400 mb-4">You must wait before initiating another Signal vs Noise session.</p>
                <div className="text-3xl font-mono text-violet-400">{cooldownRemaining}</div>
              </div>
            ) : (
              <div className="flex gap-4">
                <button onClick={startAnalysis} className="flex-1 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-full font-bold transition-all">
                  Initialize Analysis
                </button>
                <button onClick={() => setShowRules(true)} className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full font-bold transition-all flex items-center gap-2 border border-white/5">
                  <BookOpen size={20} /> Rules
                </button>
              </div>
            )}
          </motion.div>
        )}

        {stage === 'playing' && currentItem && !feedback && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex justify-between items-center mb-8">
              <span className="text-violet-400 font-mono">Score: {score}</span>
              <span className="text-zinc-500 font-mono">Item {round + 1}/{items.length}</span>
            </div>

            <div className="bg-black/50 p-8 rounded-2xl border border-white/5 mb-8">
              <div className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Bias: {currentItem.bias}</div>
              <h2 className="text-2xl font-bold text-white mb-4 font-serif">{currentItem.headline}</h2>
              <p className="text-lg text-zinc-300 font-light italic border-l-2 border-violet-500/30 pl-4">{currentItem.context}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleClassification(true)} className="py-4 bg-emerald-900/20 hover:bg-emerald-900/40 text-emerald-400 rounded-xl font-bold border border-emerald-500/20 transition-all flex items-center justify-center gap-2">
                <CheckCircle size={20} /> Credible Signal
              </button>
              <button onClick={() => handleClassification(false)} className="py-4 bg-rose-900/20 hover:bg-rose-900/40 text-rose-400 rounded-xl font-bold border border-rose-500/20 transition-all flex items-center justify-center gap-2">
                <AlertTriangle size={20} /> Noise / Bias
              </button>
            </div>
          </motion.div>
        )}

        {stage === 'playing' && feedback && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            {feedback.correct ? (
              <CheckCircle className="text-emerald-500 mx-auto mb-4" size={48} />
            ) : (
              <XCircle className="text-rose-500 mx-auto mb-4" size={48} />
            )}
            <h2 className={`text-2xl font-bold mb-4 ${feedback.correct ? 'text-emerald-400' : 'text-rose-400'}`}>
              {feedback.correct ? 'Assessment Correct' : 'Assessment Incorrect'}
            </h2>
            <p className="text-zinc-300 mb-8 max-w-lg mx-auto leading-relaxed">{feedback.explanation}</p>
            <button onClick={nextRound} className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-full font-bold transition-all">
              Next Item &rarr;
            </button>
          </motion.div>
        )}

        {stage === 'result' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <Activity className="text-violet-500 mx-auto mb-6" size={48} />
            <h2 className="text-3xl font-bold text-white mb-2">Analysis Complete</h2>
            <p className="text-xl text-zinc-400 font-mono mb-8">Information Discernment Index: {score}</p>
            <button onClick={() => window.history.back()} className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-bold transition-all">
              Return to Arena
            </button>
            <OracleAnalysis gameId="Signal vs Noise" score={score} metrics={{ literacy: 25, strategy: 5, accuracy: (score / (items.length * 1000)) * 100 }} />
          </motion.div>
        )}
      </div>

      <RulesModal 
        isOpen={showRules}
        onClose={() => setShowRules(false)}
        title="Signal vs Noise"
        rules={[
          "Analyze incoming intelligence reports and news headlines.",
          "Determine if the information is a 'Credible Signal' or 'Noise/Bias'.",
          "Look for logical fallacies, lack of sources, or sensationalism.",
          "Correct classifications increase your Information Discernment Index.",
          "Detailed feedback is provided after each assessment.",
          "After completing a session, the simulation will cool down for 7 minutes."
        ]}
      />

      <Oracle 
        gameContext="Signal vs Noise"
        currentQuestion={stage === 'playing' && currentItem ? currentItem.headline : undefined}
      />
    </div>
  );
}
