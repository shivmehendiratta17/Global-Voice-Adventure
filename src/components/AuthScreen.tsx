import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Trophy, UserPlus, LogIn, Loader2 } from 'lucide-react';
import { createAccount, loginAccount, UserProfile } from '../lib/firebase';
import { hashKey } from '../lib/crypto';
import { clsx } from 'clsx';

interface AuthScreenProps {
  key?: string;
  onLoginSuccess: (user: UserProfile) => void;
  onViewLeaderboard: () => void;
  onViewProtocol: () => void;
}

export function AuthScreen({ onLoginSuccess, onViewLeaderboard, onViewProtocol }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 3 || trimmedUsername.length > 15) {
      setError("Username must be between 3 and 15 characters.");
      return;
    }
    if (secretKey.length < 6) {
      setError("Secret Key must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const hashedKey = await hashKey(secretKey);
      let user: UserProfile | null = null;

      if (isLogin) {
        user = await loginAccount(trimmedUsername, hashedKey);
      } else {
        user = await createAccount(trimmedUsername, hashedKey);
      }

      if (user) {
        onLoginSuccess(user);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
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

        <div className="flex bg-black/40 rounded-xl p-1 mb-8 border border-white/5">
          <button
            onClick={() => { setIsLogin(true); setError(''); }}
            className={clsx(
              "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
              isLogin ? "bg-zinc-800 text-white shadow-md" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(''); }}
            className={clsx(
              "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
              !isLogin ? "bg-zinc-800 text-white shadow-md" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">
              Scholar Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={15}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
              placeholder="e.g. Aristotle"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">
              Secret Key
            </label>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              minLength={6}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono tracking-widest"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !username.trim() || !secretKey.trim()}
            className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-xl font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] mt-4"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : (isLogin ? <LogIn size={20} /> : <UserPlus size={20} />)}
            {isLogin ? "Enter the Archives" : "Forge Your Legacy"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
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
