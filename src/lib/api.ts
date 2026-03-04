import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, collection, query, orderBy, limit, getDocs, arrayUnion, where, onSnapshot } from 'firebase/firestore';

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
  const userRef = doc(db, 'users', username);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    throw new Error("Username already taken.");
  }

  const newUser: UserProfile = {
    username,
    keyHash,
    totalXP: 0,
    highestRoundUnlocked: 1,
    highestRecallLevelUnlocked: 1,
    highestSignalLevelUnlocked: 1,
    highestDuelLevelUnlocked: 1,
    completedRounds: [],
    lastPlayedRound: 1,
    rank: "Novice Scholar",
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    totalResponseTime: 0,
    highestStreak: 0,
    categoryStats: {},
    achievements: [],
    createdAt: new Date().toISOString()
  };

  await setDoc(userRef, newUser);
  return newUser;
}

export async function loginAccount(username: string, keyHash: string): Promise<UserProfile | null> {
  const userRef = doc(db, 'users', username);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    throw new Error("Account not found.");
  }

  const user = userSnap.data() as UserProfile;
  if (user.keyHash !== keyHash) {
    throw new Error("Incorrect secret key.");
  }

  return user;
}

export async function saveProgress(username: string, updates: Partial<UserProfile>) {
  const userRef = doc(db, 'users', username);
  await updateDoc(userRef, updates);
}

export async function submitScore(username: string, gameId: string, score: number, metrics: any) {
  const userRef = doc(db, 'users', username);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    throw new Error("User not found");
  }

  const user = userSnap.data() as UserProfile;
  const newXp = Math.max(0, (user.totalXP || 0) + score);
  const newRank = getRankFromXP(newXp);
  const newTotalQuestions = (user.totalQuestionsAnswered || 0) + 1;
  const newCorrectAnswers = (user.correctAnswers || 0) + (score > 0 ? 1 : 0);

  const updates = {
    totalXP: newXp,
    rank: newRank,
    totalQuestionsAnswered: newTotalQuestions,
    correctAnswers: newCorrectAnswers
  };

  await updateDoc(userRef, updates);

  const scoreRef = doc(collection(db, 'scores'));
  await setDoc(scoreRef, {
    username,
    gameId,
    score,
    metrics: JSON.stringify(metrics || {}),
    timestamp: new Date().toISOString()
  });

  return { success: true, user: { ...user, ...updates } };
}

export async function unlockAchievementApi(username: string, achievementId: string) {
  const userRef = doc(db, 'users', username);
  await updateDoc(userRef, {
    achievements: arrayUnion(achievementId)
  });
}

export function subscribeToLeaderboard(callback: (leaderboard: UserProfile[]) => void): () => void {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, orderBy('totalXP', 'desc'), limit(20));
  
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const leaderboard: UserProfile[] = [];
    querySnapshot.forEach((doc) => {
      leaderboard.push(doc.data() as UserProfile);
    });
    callback(leaderboard);
  });
  
  return unsubscribe;
}

export async function checkWagerLimit(username: string, game: string): Promise<{ allowed: boolean, timeRemaining?: number }> {
  const playsRef = collection(db, 'round_plays');
  
  let limitCount = 3;
  let limitTimeMs = 7 * 60 * 1000;

  if (game === 'quiz') {
    limitCount = 3;
    limitTimeMs = 10 * 60 * 1000;
  } else if (game === 'recall') {
    limitCount = 3;
    limitTimeMs = 10 * 60 * 1000;
  } else if (game === 'signal') {
    limitCount = 10;
    limitTimeMs = 30 * 60 * 1000;
  }

  const limitTimeStr = new Date(Date.now() - limitTimeMs).toISOString();

  const q = query(
    playsRef, 
    where('username', '==', username),
    where('game', '==', game),
    where('timestamp', '>', limitTimeStr),
    orderBy('timestamp', 'asc')
  );

  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.size >= limitCount) {
    const oldestPlay = querySnapshot.docs[0].data();
    const oldestMs = new Date(oldestPlay.timestamp).getTime();
    const nowMs = Date.now();
    const timeToWait = (oldestMs + limitTimeMs) - nowMs;
    return { allowed: false, timeRemaining: Math.max(0, timeToWait) };
  }

  return { allowed: true };
}

export async function startWagerRound(username: string, game: string): Promise<{ success: boolean }> {
  const check = await checkWagerLimit(username, game);
  if (!check.allowed) {
    throw new Error('Play limit reached');
  }

  const playRef = doc(collection(db, 'round_plays'));
  await setDoc(playRef, {
    username,
    game,
    timestamp: new Date().toISOString()
  });

  return { success: true };
}

export async function getCrisisState(username: string): Promise<{ state: any }> {
  const stateRef = doc(db, 'crisis_command_state', username);
  const stateSnap = await getDoc(stateRef);

  if (!stateSnap.exists()) {
    const newState = {
      username,
      current_year: 1,
      years_played_current_batch: 0,
      lockout_until: null,
      stability: 50,
      economy: 50,
      trust: 50,
      relations: 50
    };
    await setDoc(stateRef, newState);
    return { state: newState };
  }

  let state = stateSnap.data() as any;

  if (state.lockout_until && new Date(state.lockout_until).getTime() <= Date.now()) {
    await updateDoc(stateRef, {
      lockout_until: null,
      years_played_current_batch: 0
    });
    state.lockout_until = null;
    state.years_played_current_batch = 0;
  }

  return { state };
}

export async function playCrisisYear(username: string, impact: any): Promise<{ state: any }> {
  const stateRef = doc(db, 'crisis_command_state', username);
  const stateSnap = await getDoc(stateRef);

  if (!stateSnap.exists()) {
    throw new Error('State not found');
  }

  const state = stateSnap.data() as any;

  if (state.lockout_until && new Date(state.lockout_until).getTime() > Date.now()) {
    throw new Error('Locked out');
  }

  const newStability = Math.max(0, Math.min(100, state.stability + (impact.stability || 0)));
  const newEconomy = Math.max(0, Math.min(100, state.economy + (impact.economy || 0)));
  const newTrust = Math.max(0, Math.min(100, state.trust + (impact.trust || 0)));
  const newRelations = Math.max(0, Math.min(100, state.relations + (impact.relations || 0)));
  
  const newYear = state.current_year + 1;
  let newYearsPlayed = state.years_played_current_batch + 1;
  let newLockout = null;

  if (newYearsPlayed >= 10) {
    newLockout = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  }

  const updates = {
    current_year: newYear,
    years_played_current_batch: newYearsPlayed,
    lockout_until: newLockout,
    stability: newStability,
    economy: newEconomy,
    trust: newTrust,
    relations: newRelations
  };

  await updateDoc(stateRef, updates);

  return { state: { ...state, ...updates } };
}
