export interface DuelQuestionV2 {
  id: string;
  level: number;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
}

const subjects = [
  "Physics", "Chemistry", "Biology", "History", "Geography", "Literature", "Mathematics", "Computer Science",
  "Philosophy", "Economics", "Psychology", "Sociology", "Political Science", "Art History", "Music Theory",
  "Astronomy", "Geology", "Linguistics", "Anthropology", "Archaeology"
];

const concepts = [
  "Entropy", "Quantum Entanglement", "Natural Selection", "Cognitive Dissonance", "Supply and Demand",
  "The Categorical Imperative", "The Turing Test", "The Butterfly Effect", "Occam's Razor", "The Fermi Paradox",
  "Game Theory", "Nash Equilibrium", "The Prisoner's Dilemma", "The Tragedy of the Commons", "The Dunning-Kruger Effect",
  "Confirmation Bias", "The Halo Effect", "The Placebo Effect", "The Hawthorne Effect", "The Pygmalion Effect"
];

const actions = [
  "increases", "decreases", "remains constant", "fluctuates", "accelerates", "decelerates", "expands", "contracts",
  "stabilizes", "destabilizes", "converges", "diverges", "integrates", "disintegrates", "evolves", "devolves"
];

function shuffle<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function generateDuelQuestions(): DuelQuestionV2[] {
  const questions: DuelQuestionV2[] = [];
  let idCounter = 1;

  for (let level = 1; level <= 100; level++) {
    let difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert' = 'Easy';
    if (level >= 21 && level <= 50) difficulty = 'Medium';
    else if (level >= 51 && level <= 80) difficulty = 'Hard';
    else if (level >= 81 && level <= 100) difficulty = 'Expert';

    // To ensure no repeats within a level, we keep track of used concepts
    const usedConcepts = new Set<string>();

    for (let qNum = 1; qNum <= 5; qNum++) {
      let subject = subjects[(level * 5 + qNum) % subjects.length];
      let concept = concepts[(level * 7 + qNum * 3) % concepts.length];
      
      // Ensure unique concept within the level
      let attempts = 0;
      while (usedConcepts.has(concept) && attempts < 10) {
        concept = concepts[(level * 7 + qNum * 3 + attempts) % concepts.length];
        attempts++;
      }
      usedConcepts.add(concept);

      let action = actions[(level * 11 + qNum * 7) % actions.length];

      let question = "";
      let options: string[] = [];
      let correctAnswer = "";

      if (difficulty === 'Easy') {
        question = `In the field of ${subject}, what is the primary focus of ${concept}?`;
        correctAnswer = `The study of how it ${action} over time.`;
        options = [
          correctAnswer,
          `The measurement of its static properties.`,
          `The historical origin of the term.`,
          `The mathematical proof of its existence.`
        ];
      } else if (difficulty === 'Medium') {
        question = `According to ${concept} in ${subject}, what happens when a system ${action}?`;
        correctAnswer = `It reaches a state of equilibrium.`;
        options = [
          correctAnswer,
          `It collapses immediately.`,
          `It reverses its previous state.`,
          `It becomes entirely unpredictable.`
        ];
      } else if (difficulty === 'Hard') {
        question = `How does the principle of ${concept} apply to advanced analytics when a variable ${action}?`;
        correctAnswer = `It requires non-linear modeling to predict outcomes.`;
        options = [
          correctAnswer,
          `It simplifies the regression analysis.`,
          `It invalidates the entire dataset.`,
          `It guarantees a normal distribution.`
        ];
      } else {
        question = `If ${concept} is considered as an abstract framework, what are the epistemological implications when the foundational axiom ${action}?`;
        correctAnswer = `It necessitates a paradigm shift in the underlying ontology.`;
        options = [
          correctAnswer,
          `It reinforces the existing theoretical construct.`,
          `It renders the framework empirically verifiable.`,
          `It reduces the complexity of the system to a single dimension.`
        ];
      }

      questions.push({
        id: `d2_${idCounter++}`,
        level,
        question,
        options: shuffle(options),
        correctAnswer,
        difficulty
      });
    }
  }

  return questions;
}

export const duelDatabaseV2 = generateDuelQuestions();
