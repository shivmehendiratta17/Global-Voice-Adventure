import { quizDatabase, QuizQuestion } from '../data/quizQuestions';
import { wagerDatabase, WagerQuestion } from '../data/wagerQuestions';
import { duelDatabase, DuelQuestion } from '../data/duelQuestions';
import { duelDatabaseV2, DuelQuestionV2 } from '../data/duelQuestionsV2';
import { signalDatabase, SignalItem } from '../data/signalItems';
import { signalDatabaseV2, SignalItemV2 } from '../data/signalItemsV2';
import { crisisDatabase, CrisisScenario } from '../data/crisisScenarios';
import { recallDatabase, RecallPattern } from '../data/recallPatterns';
import { recallDatabaseV2, RecallPatternV2 } from '../data/recallPatternsV2';

// Secure randomization logic (Fisher-Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const GameEngine = {
  getQuizSessionForRound: (roundNumber: number): QuizQuestion[] => {
    // Select 5 unique questions for the round
    // In a real app, this would select specific questions based on the round number
    // to ensure progression. For now, we just shuffle and take 5.
    const shuffled = shuffleArray(quizDatabase);
    return shuffled.slice(0, 5);
  },

  getQuizSession: (): QuizQuestion[] => {
    // Select 20 unique questions
    const shuffled = shuffleArray(quizDatabase);
    return shuffled.slice(0, 20);
  },

  getWagerSessionForLevel: (level: number): WagerQuestion[] => {
    // Return the 5 questions specifically for this level
    const levelQuestions = wagerDatabase.filter(q => q.level === level);
    // Ensure we return exactly 5, shuffled
    return shuffleArray(levelQuestions).slice(0, 5);
  },

  getWagerSession: (): WagerQuestion[] => {
    // We need 20 rounds * 5 questions = 100 questions.
    // Level 1: 25, Level 2: 25, Level 3: 25, Level 4: 25
    const level1 = shuffleArray(wagerDatabase.filter(q => q.level === 1)).slice(0, 25);
    const level2 = shuffleArray(wagerDatabase.filter(q => q.level === 2)).slice(0, 25);
    const level3 = shuffleArray(wagerDatabase.filter(q => q.level === 3)).slice(0, 25);
    const level4 = shuffleArray(wagerDatabase.filter(q => q.level === 4)).slice(0, 25);
    
    return [...level1, ...level2, ...level3, ...level4];
  },

  getDuelSession: (): DuelQuestion[] => {
    // Select 5 unique questions
    const shuffled = shuffleArray(duelDatabase);
    return shuffled.slice(0, 5);
  },

  getDuelSessionForLevel: (level: number): DuelQuestionV2[] => {
    return duelDatabaseV2.filter(q => q.level === level);
  },

  getSignalSession: (): SignalItem[] => {
    // Select 3 unique items
    const shuffled = shuffleArray(signalDatabase);
    return shuffled.slice(0, 3);
  },

  getSignalSessionForLevel: (level: number): SignalItemV2[] => {
    return signalDatabaseV2.filter(p => p.level === level).sort((a, b) => a.round - b.round);
  },

  getCrisisSession: (): CrisisScenario[] => {
    // Select 5 unique scenarios
    const shuffled = shuffleArray(crisisDatabase);
    return shuffled.slice(0, 5);
  },

  getRecallSession: (): RecallPattern[] => {
    // Select 5 unique patterns
    const shuffled = shuffleArray(recallDatabase);
    return shuffled.slice(0, 5);
  },

  getRecallSessionForLevel: (level: number): RecallPatternV2[] => {
    return recallDatabaseV2.filter(p => p.level === level).sort((a, b) => a.round - b.round);
  }
};
