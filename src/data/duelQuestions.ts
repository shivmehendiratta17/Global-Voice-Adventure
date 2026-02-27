export interface DuelQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const duelDatabase: DuelQuestion[] = [
  {
    id: "d1",
    question: "Which philosophical concept argues that the ends justify the means?",
    options: ["Utilitarianism", "Deontology", "Virtue Ethics", "Nihilism"],
    correctAnswer: "Utilitarianism",
    difficulty: "Medium"
  },
  {
    id: "d2",
    question: "What is the term for a state's supreme power and authority over its territory?",
    options: ["Hegemony", "Sovereignty", "Autonomy", "Imperialism"],
    correctAnswer: "Sovereignty",
    difficulty: "Medium"
  },
  {
    id: "d3",
    question: "Which principle states that an object at rest stays at rest unless acted upon by a force?",
    options: ["Newton's First Law", "Newton's Second Law", "Thermodynamics", "Relativity"],
    correctAnswer: "Newton's First Law",
    difficulty: "Easy"
  },
  {
    id: "d4",
    question: "In game theory, what is a 'Nash Equilibrium'?",
    options: ["A situation where players cooperate fully", "A state where no player can benefit by changing their strategy while others keep theirs unchanged", "A zero-sum game outcome", "A strategy that guarantees maximum payoff"],
    correctAnswer: "A state where no player can benefit by changing their strategy while others keep theirs unchanged",
    difficulty: "Hard"
  },
  {
    id: "d5",
    question: "What is the primary mechanism of evolution proposed by Charles Darwin?",
    options: ["Genetic Drift", "Mutation", "Natural Selection", "Gene Flow"],
    correctAnswer: "Natural Selection",
    difficulty: "Easy"
  },
  {
    id: "d6",
    question: "Which economic indicator measures the total value of goods produced and services provided in a country during one year?",
    options: ["GNP", "CPI", "GDP", "PPI"],
    correctAnswer: "GDP",
    difficulty: "Easy"
  },
  {
    id: "d7",
    question: "What is the 'Butterfly Effect' in chaos theory?",
    options: ["Small changes can have large, unpredictable consequences", "Systems tend toward disorder", "Energy is conserved in a closed system", "Evolution occurs in sudden bursts"],
    correctAnswer: "Small changes can have large, unpredictable consequences",
    difficulty: "Medium"
  },
  {
    id: "d8",
    question: "Which logical fallacy attacks the person rather than the argument?",
    options: ["Straw Man", "Ad Hominem", "Slippery Slope", "False Dilemma"],
    correctAnswer: "Ad Hominem",
    difficulty: "Medium"
  },
  {
    id: "d9",
    question: "What is the 'Fermi Paradox'?",
    options: ["The contradiction between the high probability of extraterrestrial civilizations and the lack of evidence for them", "The impossibility of traveling faster than light", "The tendency for complex systems to fail", "The observation that the universe is expanding"],
    correctAnswer: "The contradiction between the high probability of extraterrestrial civilizations and the lack of evidence for them",
    difficulty: "Hard"
  },
  {
    id: "d10",
    question: "In computer science, what does 'Turing Complete' mean?",
    options: ["A system that can simulate any Turing machine", "A program without bugs", "An AI that passes the Turing test", "A language that compiles instantly"],
    correctAnswer: "A system that can simulate any Turing machine",
    difficulty: "Hard"
  },
  {
    id: "d11",
    question: "What is the 'Ockham's Razor' principle?",
    options: ["The simplest explanation is usually the correct one", "Every action has an equal and opposite reaction", "Matter cannot be created or destroyed", "The universe is fundamentally random"],
    correctAnswer: "The simplest explanation is usually the correct one",
    difficulty: "Medium"
  },
  {
    id: "d12",
    question: "Which psychological effect describes people's tendency to rely too heavily on the first piece of information offered?",
    options: ["Confirmation Bias", "Anchoring Bias", "Dunning-Kruger Effect", "Halo Effect"],
    correctAnswer: "Anchoring Bias",
    difficulty: "Hard"
  }
];
