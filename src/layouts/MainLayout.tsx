import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ParticleSystem } from '../components/ParticleSystem';
import { Trophy, User, Home, Brain, Shield, Zap, Target, LogIn, LogOut, Settings, MessageSquare, Globe, Menu, X } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { AchievementToast } from '../components/AchievementToast';
import { UpdateModal } from '../components/UpdateModal';
import { FeedbackPopup } from '../components/FeedbackPopup';
import { audioManager } from '../lib/audioManager';
import { globalVoice } from '../lib/globalVoiceProtocol';

export function MainLayout() {
  const { user, logout, musicEnabled, musicVolume, voiceEnabled, voiceVolume } = useGameStore();

  const [showFeedbackPopup, setShowFeedbackPopup] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleShowFeedback = () => setShowFeedbackPopup(true);
    window.addEventListener('showFeedbackPopup', handleShowFeedback);
    return () => window.removeEventListener('showFeedbackPopup', handleShowFeedback);
  }, []);

  React.useEffect(() => {
    globalVoice.isVoiceEnabled = voiceEnabled;
    globalVoice.volume = voiceVolume;
    
    audioManager.setMusicVolume(musicVolume);
    if (musicEnabled) {
      audioManager.playMusic(musicVolume);
    } else {
      audioManager.stopMusic();
    }

    return () => {
      audioManager.stopMusic();
    };
  }, [voiceEnabled, voiceVolume, musicEnabled, musicVolume]);

  const handleLogout = () => {
    audioManager.stopMusic();
    logout();
  };
  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 relative overflow-hidden flex flex-col">
      <ParticleSystem />
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all">
            <Brain className="text-white" size={20} />
          </div>
          <span className="font-serif font-bold text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            GLOBAL VOICE
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/arena" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors flex items-center gap-2">
            <Target size={18} /> Arena
          </Link>
          <Link to="/leaderboard" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors flex items-center gap-2">
            <Trophy size={18} /> Rankings
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors flex items-center gap-2">
                <User size={18} /> Profile
              </Link>
              <Link to="/settings" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors flex items-center gap-2">
                <Settings size={18} /> Settings
              </Link>
              <Link to="/feedback" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors flex items-center gap-2">
                <MessageSquare size={18} /> Feedback
              </Link>
              <Link to="/global-voice-signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors flex items-center gap-2">
                <Globe size={18} /> GV Competition Sign Up
              </Link>
              <button onClick={handleLogout} className="text-zinc-400 hover:text-rose-400 font-medium transition-colors flex items-center gap-2">
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="text-zinc-400 hover:text-cyan-400 font-medium transition-colors flex items-center gap-2">
              <LogIn size={18} /> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900/95 border-b border-white/10 overflow-hidden relative z-40"
          >
            <div className="flex flex-col p-4 gap-4">
              <Link to="/arena" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-cyan-400 font-medium flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                <Target size={18} /> Arena
              </Link>
              <Link to="/leaderboard" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-cyan-400 font-medium flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                <Trophy size={18} /> Rankings
              </Link>
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-cyan-400 font-medium flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                    <User size={18} /> Profile
                  </Link>
                  <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-cyan-400 font-medium flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                    <Settings size={18} /> Settings
                  </Link>
                  <Link to="/feedback" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-cyan-400 font-medium flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                    <MessageSquare size={18} /> Feedback
                  </Link>
                  <Link to="/global-voice-signup" onClick={() => setIsMobileMenuOpen(false)} className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-500/10">
                    <Globe size={18} /> GV Competition Sign Up
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-zinc-300 hover:text-rose-400 font-medium flex items-center gap-3 p-2 rounded-lg hover:bg-rose-500/10 text-left">
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-cyan-400 font-medium flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                  <LogIn size={18} /> Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex-1 w-full max-w-7xl mx-auto p-6"
        >
          <Outlet />
        </motion.div>
      </main>

      <AchievementToast />
      <UpdateModal />
      <FeedbackPopup isOpen={showFeedbackPopup} onClose={() => setShowFeedbackPopup(false)} />
    </div>
  );
}
