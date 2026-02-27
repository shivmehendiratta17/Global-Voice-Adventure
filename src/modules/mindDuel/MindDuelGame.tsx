import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../../store/useGameStore';
import { Target, Cpu, User, Clock, AlertTriangle, Mic } from 'lucide-react';
import { audioManager } from '../../lib/audioManager';
import { globalVoice } from '../../lib/globalVoiceProtocol';
import { GameEngine } from '../../services/gameEngine';
import { DuelQuestion } from '../../data/duelQuestions';
import { AchievementService } from '../../services/achievementService';

export function MindDuelGame() {
  const { user, updateStats, unlockAchievement } = useGameStore();
  const [stage, setStage] = useState<'intro' | 'duel' | 'result'>('intro');
  const [questions, setQuestions] = useState<DuelQuestion[]>([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(15);
  const [pressureSpoken, setPressureSpoken] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState('');
  const [wasLosing, setWasLosing] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (stage === 'duel' && globalVoice.isInputEnabled) {
      const currentQ = questions[round - 1];
      if (!currentQ) return;

      setIsListening(true);
      globalVoice.startListening((transcript) => {
        const lowerTranscript = transcript.toLowerCase();
        const matchedOption = currentQ.options.find(opt => 
          lowerTranscript.includes(opt.toLowerCase()) || 
          opt.toLowerCase().includes(lowerTranscript)
        );
        
        if (matchedOption) {
          globalVoice.stopListening();
          setIsListening(false);
          handleAnswer(matchedOption);
        }
      }, (err) => {
        console.warn("Voice input error:", err);
        setIsListening(false);
      });

      return () => {
        globalVoice.stopListening();
        setIsListening(false);
      };
    }
  }, [stage, round, questions]);

  useEffect(() => {
    if (user?.cooldowns?.mindDuel) {
      const remaining = user.cooldowns.mindDuel - Date.now();
      if (remaining > 0) {
        setCooldownActive(true);
        const interval = setInterval(() => {
          const nowRemaining = user.cooldowns!.mindDuel - Date.now();
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
    if (stage === 'duel' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      
      if (timeLeft === 5 && !pressureSpoken) {
        globalVoice.speak("Time is running out. Make your choice.", true);
        setPressureSpoken(true);
      }
      
      return () => clearTimeout(timer);
    } else if (stage === 'duel' && timeLeft === 0) {
      handleAnswer(false, true);
    }
  }, [timeLeft, stage]);

  const startDuel = () => {
    const sessionQuestions = GameEngine.getDuelSession();
    setQuestions(sessionQuestions);
    setPlayerScore(0);
    setAiScore(0);
    setRound(1);
    setWasLosing(false);
    setStage('duel');
    setTimeLeft(15);
    setPressureSpoken(false);
    globalVoice.speak("Match initiated. Let us see how your mind adapts.", true);
  };

  const handleAnswer = (selectedOption: string | false, timeOut: boolean = false) => {
    const currentQ = questions[round - 1];
    const correct = selectedOption === currentQ.correctAnswer;
    
    // AI difficulty adjustment based on round and player score
    const aiBaseChance = 0.4 + (round * 0.05);
    const aiCorrect = Math.random() < aiBaseChance; 
    
    let newPlayerScore = playerScore;
    let newAiScore = aiScore;

    if (correct) newPlayerScore += 100;
    if (aiCorrect) newAiScore += 100;
    
    setPlayerScore(newPlayerScore);
    setAiScore(newAiScore);

    if (round === 3 && newPlayerScore < newAiScore) {
      setWasLosing(true);
    }

    if (timeOut) {
      globalVoice.speak("Too slow. Hesitation is a weakness.", true);
    } else if (correct) {
      const responses = [
        "Impressive response. Let's increase the difficulty.",
        "Correct. But can you maintain this pace?",
        "A logical deduction. Well played."
      ];
      globalVoice.speak(responses[Math.floor(Math.random() * responses.length)], true);
    } else {
      const responses = [
        "Incorrect. Your pattern recognition is failing.",
        "A miscalculation. I expected better.",
        "Wrong. That hesitation shifted the momentum."
      ];
      globalVoice.speak(responses[Math.floor(Math.random() * responses.length)], true);
    }

    if (round < 5) {
      setRound(r => r + 1);
      setTimeLeft(15);
      setPressureSpoken(false);
    } else {
      setStage('result');
      
      if (newPlayerScore > newAiScore) {
        globalVoice.speak("You have defeated me. Your strategic capacity is commendable.", true);
      } else if (newPlayerScore < newAiScore) {
        globalVoice.speak("Defeat. Your cognitive models require recalibration.", true);
      } else {
        globalVoice.speak("A draw. It seems our intellects are evenly matched.", true);
      }
      
      updateStats('mind-duel', newPlayerScore, { strategy: 15, adaptability: 10 });
      
      const ach = AchievementService.checkMindDuel(wasLosing || (round === 5 && playerScore < aiScore && newPlayerScore > newAiScore), newPlayerScore > newAiScore);
      if (ach) unlockAchievement(ach);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-500 to-red-500 opacity-50"></div>
        
        <div className="flex items-center gap-4 mb-8">
          <Target className="text-rose-500" size={32} />
          <h1 className="text-3xl font-serif font-bold text-white">Mind Duel</h1>
        </div>

        {stage === 'intro' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-lg text-zinc-400 font-light mb-8">1v1 against an adaptive AI. The AI adjusts difficulty based on your response speed and accuracy streak.</p>
            
            {cooldownActive ? (
              <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-center mb-8">
                <AlertTriangle className="text-rose-500 mx-auto mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">System Cooling Down</h3>
                <p className="text-zinc-400 mb-4">You must wait before initiating another Mind Duel session.</p>
                <div className="text-3xl font-mono text-rose-400">{cooldownRemaining}</div>
              </div>
            ) : (
              <button onClick={startDuel} className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-bold transition-all">
                Initiate Duel
              </button>
            )}
          </motion.div>
        )}

        {stage === 'duel' && questions.length > 0 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} key={round}>
            <div className="flex justify-between items-center mb-12 p-6 bg-black/40 rounded-2xl border border-white/5 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500/20 border border-rose-500/50 text-rose-400 px-4 py-1 rounded-full font-mono text-sm flex items-center gap-2">
                <Clock size={14} /> {timeLeft}s
              </div>
              <div className="text-center">
                <User className="text-cyan-400 mx-auto mb-2" size={24} />
                <div className="text-2xl font-mono text-white">{playerScore}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest">You</div>
              </div>
              <div className="text-2xl font-serif text-zinc-600 italic">VS</div>
              <div className="text-center">
                <Cpu className="text-rose-500 mx-auto mb-2" size={24} />
                <div className="text-2xl font-mono text-white">{aiScore}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest">Oracle AI</div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-white">Round {round}/5: {questions[round - 1].question}</h2>
              {globalVoice.isInputEnabled && (
                <div className={`p-2 rounded-full ${isListening ? 'bg-emerald-500/20 text-emerald-400 animate-pulse' : 'bg-zinc-800 text-zinc-500'}`}>
                  <Mic size={20} />
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {questions[round - 1].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt)} className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-rose-500 hover:bg-rose-500/10 transition-all text-zinc-300">
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {stage === 'result' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <Target className="text-rose-500 mx-auto mb-6" size={48} />
            <h2 className="text-3xl font-bold text-white mb-2">{playerScore > aiScore ? 'Victory' : playerScore < aiScore ? 'Defeat' : 'Draw'}</h2>
            <p className="text-xl text-zinc-400 font-mono mb-8">Final Score: {playerScore} - {aiScore}</p>
            <button onClick={() => window.history.back()} className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-bold transition-all">
              Return to Arena
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
