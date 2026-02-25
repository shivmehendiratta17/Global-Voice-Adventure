import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Shield, Zap, Trophy, Brain } from 'lucide-react';

interface ProtocolScreenProps {
  key?: string;
  onBack: () => void;
}

export function ProtocolScreen({ onBack }: ProtocolScreenProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-amber-500/30 overflow-x-hidden relative">
      {/* Parallax Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-amber-600/5 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-500 hover:text-amber-400 transition-colors mb-12 group"
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            <span className="font-medium uppercase tracking-widest text-sm">Return to Command</span>
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <BookOpen className="text-amber-500" size={32} />
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tracking-wide">
              Global Voice Protocol
            </h1>
          </div>
          <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
            The definitive guide to navigating the intellectual challenges, understanding the hierarchy, and mastering the art of the Global Voice.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-32">
          
          {/* Section 1: The Mandate */}
          <section className="reveal-on-scroll">
            <div className="flex items-center gap-4 mb-8">
              <Shield className="text-amber-500/80" size={28} />
              <h2 className="text-3xl font-serif font-bold text-white glow-underline inline-block pb-2">
                I. The Mandate
              </h2>
            </div>
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:border-amber-500/20 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent opacity-50"></div>
              <p className="text-lg leading-relaxed text-zinc-300 mb-6 font-light">
                Global Voice is not merely a test of memory, but a crucible of strategy and intellect. Scholars are summoned to traverse 25 escalating rounds of inquiry, spanning history, science, philosophy, and the arts.
              </p>
              <p className="text-lg leading-relaxed text-zinc-300 font-light">
                To advance, one must demonstrate consistent mastery. A minimum of three correct responses per round is required to unlock the subsequent tier. Failure is not an end, but an invitation to refine one's knowledge.
              </p>
            </div>
          </section>

          {/* Section 2: Experience & Multipliers */}
          <section className="reveal-on-scroll">
            <div className="flex items-center gap-4 mb-8">
              <Zap className="text-amber-500/80" size={28} />
              <h2 className="text-3xl font-serif font-bold text-white glow-underline inline-block pb-2">
                II. The Multiplier Effect
              </h2>
            </div>
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:border-amber-500/20 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent opacity-50"></div>
              <p className="text-lg leading-relaxed text-zinc-300 mb-8 font-light">
                Experience Points (XP) are the currency of prestige. Base XP is awarded for correct answers, augmented by a time bonus for swift responses. However, true mastery is rewarded through the Streak Multiplier.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/40 border border-white/5 rounded-2xl p-6 text-center">
                  <div className="text-2xl font-mono font-bold text-amber-400 mb-2">1.2x</div>
                  <div className="text-sm uppercase tracking-widest text-zinc-500 font-bold">3 Streak</div>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-2xl p-6 text-center">
                  <div className="text-2xl font-mono font-bold text-amber-500 mb-2">1.5x</div>
                  <div className="text-sm uppercase tracking-widest text-zinc-500 font-bold">5 Streak</div>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-2xl p-6 text-center shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                  <div className="text-2xl font-mono font-bold text-amber-600 mb-2">2.0x</div>
                  <div className="text-sm uppercase tracking-widest text-zinc-500 font-bold">8 Streak</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: The Hierarchy */}
          <section className="reveal-on-scroll">
            <div className="flex items-center gap-4 mb-8">
              <Trophy className="text-amber-500/80" size={28} />
              <h2 className="text-3xl font-serif font-bold text-white glow-underline inline-block pb-2">
                III. The Hierarchy
              </h2>
            </div>
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:border-amber-500/20 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent opacity-50"></div>
              <p className="text-lg leading-relaxed text-zinc-300 mb-8 font-light">
                As your XP accumulates, your standing within the Global Voice community elevates. Ranks are prestigious titles bestowed upon those who prove their intellectual mettle.
              </p>
              
              <div className="space-y-4">
                {[
                  { rank: "Novice Scholar", xp: "0 - 999 XP", color: "text-zinc-400" },
                  { rank: "Emerging Strategist", xp: "1,000 - 2,499 XP", color: "text-blue-400" },
                  { rank: "Global Thinker", xp: "2,500 - 4,999 XP", color: "text-violet-400" },
                  { rank: "Intellectual Vanguard", xp: "5,000 - 7,999 XP", color: "text-emerald-400" },
                  { rank: "Elite Diplomat", xp: "8,000 - 11,999 XP", color: "text-amber-500" },
                  { rank: "Grandmaster of Global Voice", xp: "12,000+ XP", color: "text-amber-300 drop-shadow-[0_0_10px_rgba(253,230,138,0.5)]" }
                ].map((tier, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                    <span className={`font-serif font-bold text-lg ${tier.color}`}>{tier.rank}</span>
                    <span className="font-mono text-sm text-zinc-500">{tier.xp}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: The Oracle */}
          <section className="reveal-on-scroll">
            <div className="flex items-center gap-4 mb-8">
              <Brain className="text-amber-500/80" size={28} />
              <h2 className="text-3xl font-serif font-bold text-white glow-underline inline-block pb-2">
                IV. The Oracle
              </h2>
            </div>
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:border-amber-500/20 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent opacity-50"></div>
              <p className="text-lg leading-relaxed text-zinc-300 mb-6 font-light">
                When the path is obscured, scholars may consult The Oracle—an advanced AI entity bound to the platform. The Oracle provides cryptic, strategic hints without revealing the exact solution.
              </p>
              <p className="text-lg leading-relaxed text-zinc-300 font-light">
                Use this resource wisely. True mastery comes from internal deduction, but guidance is available for those who seek it.
              </p>
            </div>
          </section>

        </div>
        
        {/* Footer Divider */}
        <div className="mt-32 pt-12 border-t border-white/10 text-center reveal-on-scroll">
          <p className="text-sm font-mono text-zinc-600 uppercase tracking-widest">
            End of Protocol // Global Voice
          </p>
        </div>
      </div>
    </div>
  );
}
