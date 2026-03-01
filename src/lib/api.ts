export interface CategoryStats {
  [category: string]: {
    correct: number;
    total: number;
  };
}

export interface UserProfile {
  username: string;
  keyHash: string;
  totalXP: number;
  highestRoundUnlocked: number;
  highestRecallLevelUnlocked?: number;
  highestSignalLevelUnlocked?: number;
  highestDuelLevelUnlocked?: number;
  completedRounds: number[];
  lastPlayedRound: number;
  rank: string;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  totalResponseTime: number;
  highestStreak: number;
  categoryStats: CategoryStats;
  cooldowns?: { [gameId: string]: number };
  achievements?: string[];
  createdAt: any;
}

export function getRankFromXP(xp: number): string {
  if (xp < 1000) return "Novice Scholar";
  if (xp < 2500) return "Emerging Strategist";
  if (xp < 5000) return "Global Thinker";
  if (xp < 8000) return "Intellectual Vanguard";
  if (xp < 12000) return "Elite Diplomat";
  return "Grandmaster of Global Voice";
}

export async function createAccount(username: string, keyHash: string): Promise<UserProfile | null> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, keyHash })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create account");
  return data.user;
}

export async function loginAccount(username: string, keyHash: string): Promise<UserProfile | null> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, keyHash })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to login");
  return data.user;
}

export async function saveProgress(username: string, updates: Partial<UserProfile>) {
  const res = await fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, updates })
  });
  if (!res.ok) throw new Error("Failed to save progress");
}

export async function submitScore(username: string, gameId: string, score: number, metrics: any) {
  const res = await fetch('/api/score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, gameId, score, metrics })
  });
  if (!res.ok) throw new Error("Failed to submit score");
  return await res.json();
}

export async function unlockAchievementApi(username: string, achievementId: string) {
  const res = await fetch('/api/achievements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, achievementId })
  });
  if (!res.ok) throw new Error("Failed to unlock achievement");
}

export async function getLeaderboard(): Promise<UserProfile[]> {
  const res = await fetch('/api/leaderboard');
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  return data.leaderboard;
}
