import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Music, Mic, Upload, Volume2, Palette, BrainCircuit, Ear, Settings as SettingsIcon } from 'lucide-react';
import { audioManager } from '../../lib/audioManager';
import { globalVoice } from '../../lib/globalVoiceProtocol';
import { useGameStore } from '../../store/useGameStore';

export function SettingsPage() {
  const { 
    musicEnabled, setMusicEnabled, musicVolume, setMusicVolume,
    voiceEnabled, setVoiceEnabled, voiceVolume, setVoiceVolume,
    theme, setTheme
  } = useGameStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMusicToggle = () => {
    const newState = !musicEnabled;
    setMusicEnabled(newState);
    if (newState) {
      audioManager.playMusic(musicVolume);
    } else {
      audioManager.stopMusic();
    }
  };

  const handleVoiceToggle = () => {
    const newState = !voiceEnabled;
    setVoiceEnabled(newState);
    globalVoice.isVoiceEnabled = newState;
  };

  const handleMusicVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setMusicVolume(vol);
    audioManager.setMusicVolume(vol);
  };

  const handleVoiceVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVoiceVolume(vol);
    globalVoice.volume = vol;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        audioManager.setCustomMusic(file);
        if (!musicEnabled) {
          handleMusicToggle();
        }
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex items-center gap-4"
      >
        <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
          <SettingsIcon className="text-cyan-400" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-serif font-bold text-white mb-2">System Settings</h1>
          <p className="text-zinc-400 font-mono tracking-widest uppercase text-sm">Configure your experience</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Audio Settings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 opacity-50"></div>
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2"><Music className="text-cyan-500" size={20}/> Audio Configuration</h2>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Music size={20} className="text-cyan-400" />
                  <span className="font-medium">Background Music</span>
                </div>
                <button 
                  onClick={handleMusicToggle}
                  className={`w-14 h-7 rounded-full transition-colors relative ${musicEnabled ? 'bg-cyan-500' : 'bg-zinc-700'}`}
                >
                  <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${musicEnabled ? 'translate-x-7' : 'translate-x-0'}`} />
                </button>
              </div>
              
              <div className="pl-8 space-y-4">
                <div className="flex items-center gap-4">
                  <Volume2 size={16} className="text-zinc-500" />
                  <input 
                    type="range" 
                    min="0" max="1" step="0.05" 
                    value={musicVolume} 
                    onChange={handleMusicVolumeChange}
                    className="flex-1 accent-cyan-500"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 text-sm text-zinc-300 rounded-xl transition-colors border border-white/5 w-full"
                  >
                    <Upload size={16} /> Upload Custom Track
                  </button>
                  <input 
                    type="file" 
                    accept="audio/mp3,audio/wav" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                  <span className="text-xs text-zinc-500 text-center">Max 10MB (MP3/WAV)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Voice Settings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-fuchsia-500 opacity-50"></div>
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2"><Mic className="text-violet-500" size={20}/> Voice Protocol</h2>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Mic size={20} className="text-violet-400" />
                  <span className="font-medium">AI Voice Output</span>
                </div>
                <button 
                  onClick={handleVoiceToggle}
                  className={`w-14 h-7 rounded-full transition-colors relative ${voiceEnabled ? 'bg-violet-500' : 'bg-zinc-700'}`}
                >
                  <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${voiceEnabled ? 'translate-x-7' : 'translate-x-0'}`} />
                </button>
              </div>
              
              <div className="pl-8 space-y-4">
                <div className="flex items-center gap-4">
                  <Volume2 size={16} className="text-zinc-500" />
                  <input 
                    type="range" 
                    min="0" max="1" step="0.05" 
                    value={voiceVolume} 
                    onChange={handleVoiceVolumeChange}
                    className="flex-1 accent-violet-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interface Settings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden md:col-span-2"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-orange-500 opacity-50"></div>
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2"><Palette className="text-amber-500" size={20}/> Interface & Experience</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-zinc-300 mb-4">
                <Palette size={20} className="text-amber-400" />
                <span className="font-medium">Global Theme</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'executive-dark', name: 'Executive Dark', color: 'bg-zinc-950' },
                  { id: 'executive-light', name: 'Executive Light', color: 'bg-zinc-100' },
                  { id: 'cyber-neon', name: 'Cyber Neon', color: 'bg-black' },
                  { id: 'deep-ocean', name: 'Deep Ocean', color: 'bg-slate-950' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-3 ${theme === t.id ? 'border-amber-500 bg-amber-500/10' : 'border-white/10 bg-zinc-800/50 hover:border-white/30'}`}
                  >
                    <div className={`w-8 h-8 rounded-full border border-white/20 shadow-inner ${t.color}`}></div>
                    <span className={`text-sm font-medium ${theme === t.id ? 'text-amber-400' : 'text-zinc-400'}`}>{t.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
