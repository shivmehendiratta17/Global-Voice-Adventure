import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../../store/useGameStore';
import { Brain, Target, BookOpen, Clock, AlertTriangle } from 'lucide-react';
import { RulesModal } from '../../components/RulesModal';
import { Oracle } from '../../components/Oracle';
import { OracleAnalysis } from '../../components/OracleAnalysis';
import { GameEngine } from '../../services/gameEngine';
import { QuizQuestion } from '../../data/quizQuestions';

export function QuizGame() {
  const { user, updateStats } = useGameStore();
  const [stage, setStage] = useState<'intro' | 'playing' | 'wager' | 'wagerQuestion' | 'result'>('intro');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showRules, setShowRules] = useState(false);
  const [wagerAmount, setWagerAmount] = useState(0);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState('');

  useEffect(() => {
    if (user?.cooldowns?.quiz) {
      const remaining = user.cooldowns.quiz - Date.now();
      if (remaining > 0) {
        setCooldownActive(true);
        const interval = setInterval(() => {
          const nowRemaining = user.cooldowns!.quiz - Date.now();
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

  useEffect(() => {
    if ((stage === 'playing' || stage === 'wagerQuestion') && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if ((stage === 'playing' || stage === 'wagerQuestion') && timeLeft === 0) {
      handleAnswer(''); // Timeout counts as wrong
    }
  }, [timeLeft, stage]);

  const startQuiz = () => {
    const sessionQuestions = GameEngine.getQuizSession();
    setQuestions(sessionQuestions);
    setCurrentRound(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(15);
    setStage('playing');
  };
  
  const handleAnswer = (selectedOption: string) => {
    const currentQ = questions[currentRound];
    const isCorrect = selectedOption === currentQ.correctAnswer;

    if (stage === 'wagerQuestion') {
      if (isCorrect) {
        setScore(s => s + wagerAmount);
      } else {
        setScore(s => s - wagerAmount);
      }
      finishGame(isCorrect ? score + wagerAmount : score - wagerAmount);
      return;
    }

    if (isCorrect) {
      setScore(s => s + 100 * (1 + streak * 0.1));
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }

    if (currentRound < 18) { // 0 to 18 = 19 questions. 20th is wager.
      setCurrentRound(r => r + 1);
      setTimeLeft(15);
    } else {
      setStage('wager');
    }
  };

  const handleWager = (amount: number) => {
    setWagerAmount(amount);
    setCurrentRound(19); // The 20th question
    setTimeLeft(30); // More time for final question
    setStage('wagerQuestion');
  };

  const finishGame = (finalScore: number) => {
    setStage('result');
    updateStats('quiz', finalScore, { strategy: 10, literacy: 5 });
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 opacity-50"></div>
        
        <div className="flex items-center gap-4 mb-8">
          <Brain className="text-cyan-500" size={32} />
          <h1 className="text-3xl font-serif font-bold text-white">Quiz 2.0: Strategic Wager</h1>
        </div>

        {stage === 'intro' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-lg text-zinc-400 font-light mb-8">Test your global awareness across 20 rounds. Build streaks for multipliers. Risk your points in the final Strategic Wager round.</p>
            
            {cooldownActive ? (
              <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-center mb-8">
                <AlertTriangle className="text-rose-500 mx-auto mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">System Cooling Down</h3>
                <p className="text-zinc-400 mb-4">You must wait before initiating another Quiz session.</p>
                <div className="text-3xl font-mono text-rose-400">{cooldownRemaining}</div>
              </div>
            ) : (
              <div className="flex gap-4">
                <button onClick={startQuiz} className="flex-1 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold transition-all">
                  Initialize Simulation
                </button>
                <button onClick={() => setShowRules(true)} className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full font-bold transition-all flex items-center gap-2 border border-white/5">
                  <BookOpen size={20} /> Rules
                </button>
              </div>
            )}
          </motion.div>
        )}

        {stage === 'playing' && questions.length > 0 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} key={currentRound}>
            <div className="flex justify-between items-center mb-8 p-4 bg-black/40 rounded-2xl border border-white/5 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 px-4 py-1 rounded-full font-mono text-sm flex items-center gap-2">
                <Clock size={14} /> {timeLeft}s
              </div>
              <div className="text-center">
                <div className="text-xs text-zinc-500 uppercase tracking-widest">Round</div>
                <div className="text-xl font-mono text-white">{currentRound + 1}/20</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-zinc-500 uppercase tracking-widest">Score</div>
                <div className="text-xl font-mono text-cyan-400">{Math.floor(score)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-zinc-500 uppercase tracking-widest">Streak</div>
                <div className="text-xl font-mono text-amber-400">{streak}x</div>
              </div>
            </div>
            
            <div className="mb-2 text-sm font-bold text-cyan-500 uppercase tracking-widest">{questions[currentRound].category} • {questions[currentRound].difficulty}</div>
            <h2 className="text-2xl text-white mb-6">{questions[currentRound].question}</h2>
            <div className="space-y-4">
              {questions[currentRound].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt)} className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all text-zinc-300">
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {stage === 'wager' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <h2 className="text-2xl text-white mb-4">Final Wager Round</h2>
            <p className="text-zinc-400 mb-8">You have {Math.floor(score)} points. How much will you risk on the final question?</p>
            <div className="flex gap-4">
              <button onClick={() => handleWager(score * 0.25)} className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold border border-white/5">25%</button>
              <button onClick={() => handleWager(score * 0.5)} className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold border border-white/5">50%</button>
              <button onClick={() => handleWager(score)} className="flex-1 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)]">All In (100%)</button>
            </div>
          </motion.div>
        )}

        {stage === 'wagerQuestion' && questions.length > 0 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex justify-between items-center mb-8 p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500/20 border border-amber-500/50 text-amber-400 px-4 py-1 rounded-full font-mono text-sm flex items-center gap-2">
                <Clock size={14} /> {timeLeft}s
              </div>
              <div className="text-center w-full">
                <div className="text-xs text-amber-500 uppercase tracking-widest mb-1">Wager Amount</div>
                <div className="text-3xl font-mono text-amber-400">{Math.floor(wagerAmount)}</div>
              </div>
            </div>
            
            <div className="mb-2 text-sm font-bold text-amber-500 uppercase tracking-widest">FINAL QUESTION • {questions[19].category}</div>
            <h2 className="text-2xl text-white mb-6">{questions[19].question}</h2>
            <div className="space-y-4">
              {questions[19].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt)} className="w-full text-left p-4 rounded-xl border border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10 transition-all text-zinc-300">
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {stage === 'result' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <Target className="text-cyan-500 mx-auto mb-6" size={48} />
            <h2 className="text-3xl font-bold text-white mb-2">Simulation Complete</h2>
            <p className="text-xl text-cyan-400 font-mono mb-8">Final Strategic Score: {Math.floor(score)}</p>
            <button onClick={() => window.history.back()} className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-bold transition-all">
              Return to Arena
            </button>
            <OracleAnalysis gameId="Quiz 2.0" score={Math.floor(score)} metrics={{ strategy: 10, literacy: 5 }} />
          </motion.div>
        )}
      </div>

      <RulesModal 
        isOpen={showRules}
        onClose={() => setShowRules(false)}
        title="Quiz 2.0"
        rules={[
          "This is a timed strategic knowledge challenge with 20 rounds.",
          "Answer correctly to build your streak and increase your score multiplier.",
          "An incorrect answer resets your streak to zero.",
          "You have 15 seconds per question.",
          "A final wager round determines the ultimate outcome.",
          "After completing a session, the simulation will cool down for 7 minutes."
        ]}
      />

      <Oracle 
        gameContext="Quiz 2.0: Strategic Wager"
        currentQuestion={(stage === 'playing' || stage === 'wagerQuestion') && questions.length > 0 ? questions[currentRound].question : undefined}
      />
    </div>
  );
}
