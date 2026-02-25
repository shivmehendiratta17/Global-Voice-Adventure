import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "demo",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

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
  completedRounds: number[];
  lastPlayedRound: number;
  rank: string;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  totalResponseTime: number;
  highestStreak: number;
  categoryStats: CategoryStats;
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
  try {
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
      completedRounds: [],
      lastPlayedRound: 1,
      rank: "Novice Scholar",
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
      totalResponseTime: 0,
      highestStreak: 0,
      categoryStats: {},
      createdAt: serverTimestamp()
    };

    await setDoc(userRef, newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
}

export async function loginAccount(username: string, keyHash: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', username);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error("Account not found.");
    }

    const userData = userSnap.data() as UserProfile;
    if (userData.keyHash !== keyHash) {
      throw new Error("Incorrect secret key.");
    }

    // Migrate old users
    if (!userData.rank) {
      userData.rank = getRankFromXP(userData.totalXP || 0);
      userData.totalQuestionsAnswered = userData.totalQuestionsAnswered || 0;
      userData.correctAnswers = userData.correctAnswers || 0;
      userData.totalResponseTime = userData.totalResponseTime || 0;
      userData.highestStreak = userData.highestStreak || 0;
      userData.categoryStats = userData.categoryStats || {};
    }

    return userData;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function saveProgress(username: string, updates: Partial<UserProfile>) {
  try {
    const userRef = doc(db, 'users', username);
    await updateDoc(userRef, updates);
  } catch (error) {
    console.error("Error saving progress:", error);
  }
}

export async function getLeaderboard(): Promise<UserProfile[]> {
  try {
    const q = query(collection(db, 'users'), orderBy('totalXP', 'desc'), limit(20));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as UserProfile);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
}
