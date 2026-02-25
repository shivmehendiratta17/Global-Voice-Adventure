import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioController } from '../lib/audioController';
import { clsx } from 'clsx';

export function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize the singleton audio instance
    audioController.init();

    // Subscribe to state changes
    audioController.onStateChange((state) => {
      setIsPlaying(state);
    });
  }, []);

  const toggleMusic = () => {
    audioController.toggle();
  };

  return (
    <button
      onClick={toggleMusic}
      className={clsx(
        "fixed top-6 right-6 p-3 rounded-full backdrop-blur-md border transition-all duration-300 z-50 group flex items-center justify-center",
        isPlaying 
          ? "bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:bg-amber-500/20" 
          : "bg-zinc-900/50 border-white/10 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
      )}
      title="Toggle Ambient Music"
    >
      {isPlaying ? (
        <div className="relative flex items-center justify-center w-5 h-5">
          <div className="flex items-end justify-center gap-[2px] h-full w-full">
            <div className="w-[3px] bg-amber-400 rounded-full audio-wave"></div>
            <div className="w-[3px] bg-amber-400 rounded-full audio-wave"></div>
            <div className="w-[3px] bg-amber-400 rounded-full audio-wave"></div>
          </div>
        </div>
      ) : (
        <VolumeX size={20} className="transition-transform group-hover:scale-110" />
      )}
    </button>
  );
}
