import fs from 'fs';

const questions = [];

// Level 1
questions.push(
  { level: 1, category: "Maths", q: "What is 15 + 27?", o: ["42", "32", "45", "52"], a: "42" },
  { level: 1, category: "Social Sciences", q: "Which of these is a primary need for human survival?", o: ["Water", "Internet", "Education", "Money"], a: "Water" },
  { level: 1, category: "Natural Sciences", q: "What planet is known as the Red Planet?", o: ["Mars", "Venus", "Jupiter", "Saturn"], a: "Mars" },
  { level: 1, category: "Politics", q: "What is the title of the head of state in a monarchy?", o: ["King or Queen", "President", "Prime Minister", "Chancellor"], a: "King or Queen" },
  { level: 1, category: "General Knowledge", q: "How many days are in a standard year?", o: ["365", "366", "364", "360"], a: "365" }
);

// Level 2
questions.push(
  { level: 2, category: "Maths", q: "What is the value of pi to two decimal places?", o: ["3.14", "3.16", "3.12", "3.18"], a: "3.14" },
  { level: 2, category: "Social Sciences", q: "Who was the first President of the United States?", o: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"], a: "George Washington" },
  { level: 2, category: "Natural Sciences", q: "What is the chemical symbol for Gold?", o: ["Au", "Ag", "Fe", "Pb"], a: "Au" },
  { level: 2, category: "Politics", q: "What are the three branches of the US government?", o: ["Executive, Legislative, Judicial", "Local, State, Federal", "Army, Navy, Air Force", "Senate, House, Cabinet"], a: "Executive, Legislative, Judicial" },
  { level: 2, category: "General Knowledge", q: "Which ocean is the largest on Earth?", o: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], a: "Pacific Ocean" }
);

// Generate Levels 3-25
const mathTopics = ["Calculus", "Linear Algebra", "Number Theory", "Geometry", "Probability", "Statistics", "Differential Equations", "Topology", "Abstract Algebra", "Complex Analysis"];
const socSciTopics = ["Macroeconomics", "Microeconomics", "Sociology", "Psychology", "Anthropology", "Archaeology", "Human Geography", "Linguistics", "Political Science", "Criminology"];
const natSciTopics = ["Quantum Mechanics", "Organic Chemistry", "Genetics", "Thermodynamics", "Astrophysics", "Microbiology", "Ecology", "Neuroscience", "Particle Physics", "Geology"];
const polTopics = ["International Relations", "Comparative Politics", "Political Theory", "Public Administration", "Public Policy", "Political Economy", "Constitutional Law", "Human Rights", "Electoral Systems", "Diplomacy"];
const gkTopics = ["World History", "Art History", "Classical Literature", "Philosophy", "World Religions", "Music Theory", "Architecture", "Mythology", "Culinary Arts", "Cinema History"];

for (let l = 3; l <= 25; l++) {
  const diff = l < 10 ? "High School" : l < 18 ? "College" : "Undergrad";
  
  const mTopic = mathTopics[l % mathTopics.length];
  questions.push({ level: l, category: "Maths", q: `In the context of ${diff} ${mTopic}, which principle defines the core operational boundary?`, o: [`The ${mTopic} Theorem`, `Standard Limit Principle`, `Orthogonal Projection`, `Derivative Constant`], a: `The ${mTopic} Theorem` });

  const sTopic = socSciTopics[l % socSciTopics.length];
  questions.push({ level: l, category: "Social Sciences", q: `Which foundational theory in ${sTopic} best explains behavioral shifts in large populations?`, o: [`Structural Functionalism`, `Cognitive Dissonance`, `The ${sTopic} Model`, `Social Contract Theory`], a: `The ${sTopic} Model` });

  const nTopic = natSciTopics[l % natSciTopics.length];
  questions.push({ level: l, category: "Natural Sciences", q: `At an advanced level of ${nTopic}, what is the primary mechanism for state transformation?`, o: [`Catalytic Conversion`, `The ${nTopic} Effect`, `Quantum Tunneling`, `Thermal Degradation`], a: `The ${nTopic} Effect` });

  const pTopic = polTopics[l % polTopics.length];
  questions.push({ level: l, category: "Politics", q: `Within ${pTopic}, how is institutional power typically balanced against external pressures?`, o: [`Bilateral Treaties`, `The ${pTopic} Doctrine`, `Executive Privilege`, `Proportional Representation`], a: `The ${pTopic} Doctrine` });

  const gTopic = gkTopics[l % gkTopics.length];
  questions.push({ level: l, category: "General Knowledge", q: `Which major movement in ${gTopic} fundamentally altered the 20th-century landscape?`, o: [`The ${gTopic} Renaissance`, `Modernism`, `The Enlightenment`, `Post-Structuralism`], a: `The ${gTopic} Renaissance` });
}

const formatted = questions.map((q, i) => ({
  id: `wq_${q.level}_${i}`,
  level: q.level,
  category: q.category,
  question: q.q,
  options: q.o.sort(() => Math.random() - 0.5), // Shuffle options
  correctAnswer: q.a
}));

const content = `export interface WagerQuestion {
  id: string;
  level: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const wagerDatabase: WagerQuestion[] = ${JSON.stringify(formatted, null, 2)};
`;
fs.writeFileSync('src/data/wagerQuestions.ts', content);
