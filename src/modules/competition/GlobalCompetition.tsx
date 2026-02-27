import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, Trophy, Users, Activity, CheckCircle, XCircle } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { AchievementService } from '../../services/achievementService';

export function GlobalCompetition() {
  const { user, updateStats, unlockAchievement } = useGameStore();
  const [stage, setStage] = useState<'intro' | 'playing' | 'result'>('intro');
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean, explanation: string } | null>(null);
  
  // Fixed curated questions for the tournament
  const questions = [
    {
      question: "Which emerging technology is projected to have the largest impact on global supply chains by 2030?",
      options: ["Quantum Computing", "Autonomous Delivery Drones", "Blockchain Logistics", "3D Printing"],
      correctAnswer: "Blockchain Logistics",
      explanation: "Blockchain provides immutable, transparent tracking across complex global supply networks, reducing fraud and delays."
    },
    {
      question: "In the context of international relations, what does 'Soft Power' primarily rely on?",
      options: ["Military presence", "Economic sanctions", "Cultural and ideological appeal", "Trade embargoes"],
      correctAnswer: "Cultural and ideological appeal",
      explanation: "Soft power is the ability to attract and co-opt, rather than coerce, shaping the preferences of others through appeal and attraction."
    },
    {
      question: "What is the primary economic consequence of a prolonged inverted yield curve?",
      options: ["Rapid inflation", "Economic recession", "Stock market boom", "Currency appreciation"],
      correctAnswer: "Economic recession",
      explanation: "An inverted yield curve, where short-term interest rates exceed long-term rates, is a historically reliable predictor of an impending economic recession."
    }
  ];

  // Mock leaderboard data
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: "Cipher_99", score: 8500 },
    { rank: 2, name: "Nova_Prime", score: 8200 },
    { rank: 3, name: "Echo_Protocol", score: 7900 },
    { rank: 4, name: "Atlas_Actual", score: 7500 },
    { rank: 5, name: "Vector_7", score: 7100 },
  ]);

  const startGame = () => {
    // Check if user has already played (mock check for now)
    if (user?.cooldowns?.competition) {
      alert("You have already submitted your entry for this tournament.");
      return;
    }
    setStage('playing');
  };

  const handleAnswer = (answer: string) => {
    const currentQ = questions[round];
    const isCorrect = answer === currentQ.correctAnswer;
    
    if (isCorrect) {
      setScore(s => s + 2500); // High stakes scoring
    }
    
    setFeedback({ correct: isCorrect, explanation: currentQ.explanation });
  };

  const nextRound = () => {
    setFeedback(null);
    if (round < questions.length - 1) {
      setRound(r => r + 1);
    } else {
      setStage('result');
      // Record completion to prevent replay
      updateStats('competition', score, { strategy: 50, literacy: 50 });
      
      const ach = AchievementService.checkGlobalCompetition();
      if (ach) unlockAchievement(ach);
      
      // Add user to leaderboard if score is high enough
      const newLeaderboard = [...leaderboard, { rank: 0, name: user?.username || 'Agent', score }].sort((a, b) => b.score - a.score).map((entry, idx) => ({ ...entry, rank: idx + 1 })).slice(0, 5);
      setLeaderboard(newLeaderboard);
    }
  };

  const currentQ = questions[round];

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-fuchsia-500 to-pink-500 opacity-50"></div>
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Globe className="text-fuchsia-500" size={32} />
            <h1 className="text-3xl font-serif font-bold text-white">Global Competition</h1>
          </div>
          <div className="flex items-center gap-2 bg-fuchsia-500/10 px-4 py-2 rounded-full border border-fuchsia-500/20">
            <Activity className="text-fuchsia-400" size={16} />
            <span className="text-fuchsia-400 font-mono text-sm">LIVE EVENT</span>
          </div>
        </div>

        {stage === 'intro' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">March 31 Tournament</h2>
                <p className="text-lg text-zinc-400 font-light mb-6">
                  Welcome to the Global Competition. This is a high-stakes, single-entry tournament. All agents face the exact same curated scenarios. Your final score determines your global ranking.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-zinc-300">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">1</div>
                    <span>Fixed curated questions</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">2</div>
                    <span>One entry per account</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">3</div>
                    <span>Real-time global ranking</span>
                  </div>
                </div>
                
                {user?.cooldowns?.competition ? (
                  <div className="p-6 bg-zinc-800/50 border border-white/10 rounded-2xl text-center">
                    <CheckCircle className="text-emerald-500 mx-auto mb-2" size={24} />
                    <p className="text-white font-bold">Entry Submitted</p>
                    <p className="text-zinc-400 text-sm">You have completed this tournament.</p>
                  </div>
                ) : (
                  <button onClick={startGame} className="w-full py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                    Enter Tournament
                  </button>
                )}
              </div>
              
              <div className="bg-black/40 rounded-2xl border border-white/5 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="text-amber-400" size={20} />
                  <h3 className="text-xl font-bold text-white">Live Leaderboard</h3>
                </div>
                <div className="space-y-3">
                  {leaderboard.map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <span className={`font-mono font-bold ${idx === 0 ? 'text-amber-400' : idx === 1 ? 'text-zinc-300' : idx === 2 ? 'text-amber-700' : 'text-zinc-500'}`}>#{entry.rank}</span>
                        <span className="text-white">{entry.name}</span>
                      </div>
                      <span className="text-fuchsia-400 font-mono">{entry.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 'playing' && currentQ && !feedback && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex justify-between items-center mb-8">
              <span className="text-fuchsia-400 font-mono">Score: {score}</span>
              <span className="text-zinc-500 font-mono">Question {round + 1}/{questions.length}</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">{currentQ.question}</h2>
            
            <div className="space-y-4">
              {currentQ.options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt)} className="w-full text-left p-5 rounded-xl border border-white/10 hover:border-fuchsia-500 hover:bg-fuchsia-500/10 transition-all text-zinc-300 font-medium">
                  {opt}
                </button>
              ))}
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
              {feedback.correct ? 'Correct' : 'Incorrect'}
            </h2>
            <p className="text-zinc-300 mb-8 max-w-lg mx-auto leading-relaxed">{feedback.explanation}</p>
            <button onClick={nextRound} className="px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-full font-bold transition-all">
              {round < questions.length - 1 ? 'Next Question &rarr;' : 'View Final Standings'}
            </button>
          </motion.div>
        )}

        {stage === 'result' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <Trophy className="text-amber-400 mx-auto mb-6" size={64} />
            <h2 className="text-4xl font-bold text-white mb-2">Tournament Complete</h2>
            <p className="text-xl text-zinc-400 font-light mb-8">Your entry has been recorded.</p>
            
            <div className="bg-black/40 rounded-2xl border border-white/5 p-8 max-w-md mx-auto mb-8">
              <div className="text-sm text-zinc-500 uppercase tracking-widest mb-2">Final Score</div>
              <div className="text-5xl font-mono font-bold text-fuchsia-400 mb-6">{score}</div>
              
              <div className="space-y-3 text-left">
                {leaderboard.map((entry, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-3 rounded-xl border ${entry.name === user?.username ? 'bg-fuchsia-500/20 border-fuchsia-500/50' : 'bg-zinc-800/50 border-white/5'}`}>
                    <div className="flex items-center gap-4">
                      <span className={`font-mono font-bold ${idx === 0 ? 'text-amber-400' : idx === 1 ? 'text-zinc-300' : idx === 2 ? 'text-amber-700' : 'text-zinc-500'}`}>#{entry.rank}</span>
                      <span className={entry.name === user?.username ? 'text-fuchsia-300 font-bold' : 'text-white'}>{entry.name}</span>
                    </div>
                    <span className="text-fuchsia-400 font-mono">{entry.score}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => window.history.back()} className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-bold transition-all">
              Return to Arena
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
