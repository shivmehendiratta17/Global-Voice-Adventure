import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile as FirebaseUserProfile, saveProgress, getRankFromXP } from '../lib/firebase';

export interface UserProfile extends FirebaseUserProfile {
  id: string; // Keep an ID for frontend convenience
  stats: {
    winRate: number;
    avgResponseTime: number;
    strategicScore: number;
    adaptabilityIndex: number;
    memoryPrecision: number;
    infoLiteracy: number;
  };
}

interface GameState {
  user: UserProfile | null;
  musicEnabled: boolean;
  musicVolume: number;
  voiceEnabled: boolean;
  voiceVolume: number;
  voiceInputEnabled: boolean;
  theme: string;
  oracleHintsEnabled: boolean;
  setUser: (user: FirebaseUserProfile | null) => void;
  logout: () => void;
  setMusicEnabled: (enabled: boolean) => void;
  setMusicVolume: (volume: number) => void;
  setVoiceEnabled: (enabled: boolean) => void;
  setVoiceVolume: (volume: number) => void;
  setVoiceInputEnabled: (enabled: boolean) => void;
  setTheme: (theme: string) => void;
  setOracleHintsEnabled: (enabled: boolean) => void;
  updateStats: (gameId: string, score: number, metrics: any) => void;
  unlockAchievement: (achievementId: string) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      user: null,
      musicEnabled: false,
      musicVolume: 0.5,
      voiceEnabled: true,
      voiceVolume: 0.8,
      voiceInputEnabled: false,
      theme: 'executive-dark',
      oracleHintsEnabled: true,
      setUser: (fbUser) => set({
        user: fbUser ? {
          ...fbUser,
          id: fbUser.username,
          totalXP: fbUser.totalXP || 0,
          stats: {
            winRate: fbUser.totalQuestionsAnswered ? (fbUser.correctAnswers / fbUser.totalQuestionsAnswered) * 100 : 0,
            avgResponseTime: fbUser.totalResponseTime || 0,
            strategicScore: fbUser.totalXP || 0,
            adaptabilityIndex: fbUser.highestStreak * 10 || 0,
            memoryPrecision: fbUser.correctAnswers * 10 || 0,
            infoLiteracy: fbUser.totalXP / 2 || 0,
          }
        } : null
      }),
      logout: () => set({ user: null }),
      setMusicEnabled: (enabled) => set({ musicEnabled: enabled }),
      setMusicVolume: (volume) => set({ musicVolume: volume }),
      setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
      setVoiceVolume: (volume) => set({ voiceVolume: volume }),
      setVoiceInputEnabled: (enabled) => set({ voiceInputEnabled: enabled }),
      setTheme: (theme) => set({ theme }),
      setOracleHintsEnabled: (enabled) => set({ oracleHintsEnabled: enabled }),
      updateStats: (gameId, score, metrics) => set((state) => {
        if (!state.user) return state;
        
        const newXp = (state.user.totalXP || 0) + score;
        const newRank = getRankFromXP(newXp);
        
        // 7 minutes cooldown
        const cooldownTime = Date.now() + 7 * 60 * 1000;
        
        const updatedFbData = {
          totalXP: newXp,
          rank: newRank,
          totalQuestionsAnswered: (state.user.totalQuestionsAnswered || 0) + 1,
          correctAnswers: (state.user.correctAnswers || 0) + (score > 0 ? 1 : 0),
          cooldowns: {
            ...(state.user.cooldowns || {}),
            [gameId]: cooldownTime
          }
        };

        // Fire and forget to backend
        saveProgress(state.user.username, updatedFbData);

        return {
          user: {
            ...state.user,
            ...updatedFbData,
            totalXP: newXp,
            stats: {
              ...state.user.stats,
              winRate: Math.min(100, state.user.stats.winRate + 5),
              avgResponseTime: metrics.avgTime || state.user.stats.avgResponseTime,
              strategicScore: state.user.stats.strategicScore + (metrics.strategy || 0),
              adaptabilityIndex: state.user.stats.adaptabilityIndex + (metrics.adaptability || 0),
              memoryPrecision: state.user.stats.memoryPrecision + (metrics.memory || 0),
              infoLiteracy: state.user.stats.infoLiteracy + (metrics.literacy || 0),
            }
          }
        };
      }),
      unlockAchievement: (achievementId) => set((state) => {
        if (!state.user) return state;
        
        const currentAchievements = state.user.achievements || [];
        if (currentAchievements.includes(achievementId)) return state; // Already unlocked

        const newAchievements = [...currentAchievements, achievementId];
        
        // Fire and forget to backend
        saveProgress(state.user.username, { achievements: newAchievements });

        // We can dispatch a custom event to show a toast
        window.dispatchEvent(new CustomEvent('achievementUnlocked', { detail: achievementId }));

        return {
          user: {
            ...state.user,
            achievements: newAchievements
          }
        };
      })
    }),
    {
      name: 'global-voice-storage',
    }
  )
);
