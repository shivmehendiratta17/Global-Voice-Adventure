import { quizDatabase, QuizQuestion } from '../data/quizQuestions';
import { duelDatabase, DuelQuestion } from '../data/duelQuestions';
import { signalDatabase, SignalItem } from '../data/signalItems';
import { crisisDatabase, CrisisScenario } from '../data/crisisScenarios';
import { recallDatabase, RecallPattern } from '../data/recallPatterns';

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
  getQuizSession: (): QuizQuestion[] => {
    // Select 20 unique questions
    const shuffled = shuffleArray(quizDatabase);
    return shuffled.slice(0, 20);
  },

  getDuelSession: (): DuelQuestion[] => {
    // Select 5 unique questions
    const shuffled = shuffleArray(duelDatabase);
    return shuffled.slice(0, 5);
  },

  getSignalSession: (): SignalItem[] => {
    // Select 3 unique items
    const shuffled = shuffleArray(signalDatabase);
    return shuffled.slice(0, 3);
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
  }
};
