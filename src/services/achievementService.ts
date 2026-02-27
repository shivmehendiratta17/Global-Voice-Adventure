export const ACHIEVEMENTS = {
  UNSHAKEN: {
    id: 'unshaken',
    title: 'Unshaken',
    description: '5 perfect Crisis Command decisions',
    icon: 'Shield'
  },
  SIGNAL_MASTER: {
    id: 'signal_master',
    title: 'Signal Master',
    description: '90% accuracy in Signal vs Noise',
    icon: 'Activity'
  },
  COLD_UNDER_PRESSURE: {
    id: 'cold_under_pressure',
    title: 'Cold Under Pressure',
    description: 'Comeback win in Mind Duel',
    icon: 'Target'
  },
  FLAWLESS_RECALL: {
    id: 'flawless_recall',
    title: 'Flawless Recall',
    description: 'Perfect Signal Recall session',
    icon: 'Zap'
  },
  GLOBAL_ELITE: {
    id: 'global_elite',
    title: 'Global Elite',
    description: 'Participate in a Global Competition',
    icon: 'Globe'
  }
};

export const AchievementService = {
  checkCrisisCommand: (perfectDecisions: number) => {
    if (perfectDecisions >= 5) {
      return ACHIEVEMENTS.UNSHAKEN.id;
    }
    return null;
  },
  checkSignalVsNoise: (accuracy: number) => {
    if (accuracy >= 90) {
      return ACHIEVEMENTS.SIGNAL_MASTER.id;
    }
    return null;
  },
  checkMindDuel: (wasLosing: boolean, won: boolean) => {
    if (wasLosing && won) {
      return ACHIEVEMENTS.COLD_UNDER_PRESSURE.id;
    }
    return null;
  },
  checkSignalRecall: (perfectRounds: number, totalRounds: number) => {
    if (perfectRounds === totalRounds && totalRounds > 0) {
      return ACHIEVEMENTS.FLAWLESS_RECALL.id;
    }
    return null;
  },
  checkGlobalCompetition: () => {
    return ACHIEVEMENTS.GLOBAL_ELITE.id;
  }
};
