import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Trophy, UserPlus, LogIn, Loader2, Lock, User as UserIcon, ArrowRight, Github } from 'lucide-react';
import { createAccount, loginAccount, UserProfile } from '../lib/api';
import { signInWithGithub } from '../lib/firebase';
import { clsx } from 'clsx';

interface AuthScreenProps {
  key?: string;
  onLoginSuccess: (user: UserProfile) => void;
  onViewLeaderboard: () => void;
  onViewProtocol: () => void;
}

type AuthMode = 'login' | 'signup';

export function AuthScreen({ onLoginSuccess, onViewLeaderboard, onViewProtocol }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let profile: UserProfile | null = null;
      if (mode === 'signup') {
        profile = await createAccount(username, password);
      } else {
        profile = await loginAccount(username, password);
      }
      
      if (profile) {
        onLoginSuccess(profile);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const user = await signInWithGithub();
      if (user) {
        const githubUsername = user.displayName?.replace(/\s+/g, '_') || user.email?.split('@')[0] || 'github_user';
        const githubUid = user.uid;
        
        try {
          // Try to login first
          const profile = await loginAccount(githubUsername, githubUid);
          if (profile) onLoginSuccess(profile);
        } catch (loginErr) {
          // If login fails, try to create account
          const newProfile = await createAccount(githubUsername, githubUid);
          if (newProfile) onLoginSuccess(newProfile);
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "GitHub authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-4"
    >
      <div className="w-full max-w-md p-8 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-amber-500 opacity-50"></div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 mb-4">
            Global Voice Adventure
          </h1>
          <p className="text-lg text-zinc-400 font-light tracking-wide">Designed by: Shiv Mehendiratta</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key="auth" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="flex bg-black/40 rounded-xl p-1 mb-6 border border-white/5">
              <button
                onClick={() => { setMode('login'); setError(''); }}
                className={clsx(
                  "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                  mode === 'login' ? "bg-zinc-800 text-white shadow-md" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                Login
              </button>
              <button
                onClick={() => { setMode('signup'); setError(''); }}
                className={clsx(
                  "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                  mode === 'signup' ? "bg-zinc-800 text-white shadow-md" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Username</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
                    placeholder="e.g. Aristotle_99"
                    required
                    minLength={3}
                    maxLength={20}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Password (Key Hash)</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">{error}</div>}

              <button
                type="submit"
                disabled={loading || !username || !password}
                className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-xl font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : (mode === 'login' ? <LogIn size={20} /> : <UserPlus size={20} />)}
                {mode === 'login' ? "Enter the Archives" : "Forge Your Legacy"}
              </button>
            </form>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-zinc-900 text-zinc-500">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGithubLogin}
              disabled={loading}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-[#24292e] hover:bg-[#2f363d] text-white rounded-xl font-bold transition-all border border-white/10"
            >
              <Github size={20} />
              GitHub
            </button>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
          <button
            onClick={onViewLeaderboard}
            className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-xl font-bold transition-all border border-amber-500/20"
          >
            <Trophy size={18} />
            View Hall of Fame
          </button>
          <button
            onClick={onViewProtocol}
            className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-zinc-200 rounded-xl font-bold transition-all border border-white/5"
          >
            Global Voice Protocol
          </button>
        </div>
      </div>
    </motion.div>
  );
}
