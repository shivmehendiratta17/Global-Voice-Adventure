import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, useSpring } from 'motion/react';
import { Globe, Sparkles, Check, Zap, Shield } from 'lucide-react';

export function GlobalVoiceSignUp() {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-300, 300], [10, -10]);
  const rotateY = useTransform(smoothX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && school && email && agreed) {
      setSubmitted(true);
      // In a real app, you would send this to the backend
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] bg-[#050505] flex items-center justify-center p-4 sm:p-8 overflow-hidden relative font-sans rounded-3xl border border-white/5" style={{ perspective: 1200 }}>
      {/* Insane Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
        
        {/* Floating Orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full blur-3xl mix-blend-screen"
            style={{
              background: i % 2 === 0 ? 'rgba(99, 102, 241, 0.3)' : 'rgba(59, 130, 246, 0.3)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-cyan-500/10 rounded-[2rem] sm:rounded-[2.5rem] blur-xl transition-opacity duration-500" style={{ opacity: isHovering ? 1 : 0.5 }}></div>
        
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden" style={{ transform: 'translateZ(30px)' }}>
          
          {/* Animated border line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
          
          {!submitted ? (
            <AnimatePresence mode="wait">
              <motion.div 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 mb-6 relative group">
                    <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl group-hover:bg-indigo-500/40 transition-colors duration-500"></div>
                    <Globe className="text-indigo-400 relative z-10" size={40} />
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-blue-200 tracking-tight mb-4 drop-shadow-sm">
                    GV Competition Sign Up
                  </h1>
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-indigo-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-4">
                    <Sparkles size={14} className="hidden sm:block" />
                    <span>March 16th • Worldwide</span>
                    <Sparkles size={14} className="hidden sm:block" />
                  </div>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm">
                    100% Free of Cost
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                      <div className="relative group">
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all peer"
                          placeholder="Full Name"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-20 peer-focus:opacity-20 blur-md transition-opacity -z-10"></div>
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                      <div className="relative group">
                        <input 
                          type="text" 
                          required
                          value={school}
                          onChange={(e) => setSchool(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all peer"
                          placeholder="School / Institution"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-20 peer-focus:opacity-20 blur-md transition-opacity -z-10"></div>
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                      <div className="relative group">
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all peer"
                          placeholder="Email Address"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 peer-focus:opacity-20 blur-md transition-opacity -z-10"></div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                    className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => setAgreed(!agreed)}
                  >
                    <div className={`w-6 h-6 shrink-0 rounded-md border flex items-center justify-center transition-colors ${agreed ? 'bg-indigo-500 border-indigo-500' : 'border-zinc-500'}`}>
                      {agreed && <Check size={16} className="text-white" />}
                    </div>
                    <span className="text-zinc-300 text-xs sm:text-sm select-none leading-tight sm:leading-normal">
                      I confirm my registration for the Global Voice Competition.
                    </span>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                    type="submit"
                    disabled={!name || !school || !email || !agreed}
                    className="w-full relative group overflow-hidden rounded-2xl p-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl px-8 py-5 flex items-center justify-center gap-3 transition-all group-hover:bg-black/20">
                      <span className="text-white font-bold text-lg tracking-wide">Secure My Spot</span>
                      <Zap size={20} className="text-indigo-300 group-hover:text-white transition-colors" />
                    </div>
                  </motion.button>
                </form>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="text-center py-12"
            >
              <motion.div 
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8 relative"
              >
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
                <Shield className="text-emerald-400 relative z-10" size={64} />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="text-4xl font-black text-white mb-4"
              >
                Registration Confirmed
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="text-xl text-zinc-400 mb-8 max-w-md mx-auto"
              >
                Welcome to the arena, <span className="text-white font-bold">{name}</span>. Your spot in the Global Voice Competition is secured.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-mono mb-8"
              >
                <Check size={16} className="text-emerald-400" />
                Transmission Sent
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              >
                <button 
                  onClick={() => window.location.hash = '#/arena'}
                  className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-bold transition-all"
                >
                  Return to Arena
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
