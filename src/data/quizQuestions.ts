export interface QuizQuestion {
  id: string;
  category: 'Global Affairs' | 'Economics' | 'Innovation' | 'Culture' | 'Environment';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const quizDatabase: QuizQuestion[] = [
  {
    id: "q1",
    category: "Economics",
    difficulty: "Medium",
    question: "Which economic theory emphasizes government intervention to stabilize the economy?",
    options: ["Classical Economics", "Keynesian Economics", "Monetarism", "Austrian School"],
    correctAnswer: "Keynesian Economics",
    explanation: "Keynesian economics argues that government intervention can stabilize the economy, especially during recessions."
  },
  {
    id: "q2",
    category: "Global Affairs",
    difficulty: "Easy",
    question: "Which international organization is primarily responsible for maintaining international peace and security?",
    options: ["NATO", "World Bank", "United Nations", "World Trade Organization"],
    correctAnswer: "United Nations",
    explanation: "The United Nations (UN) was founded in 1945 with the primary mission of maintaining international peace and security."
  },
  {
    id: "q3",
    category: "Innovation",
    difficulty: "Hard",
    question: "What is the primary function of a zero-knowledge proof in cryptography?",
    options: ["To encrypt data faster", "To prove knowledge of a value without revealing the value itself", "To generate truly random numbers", "To compress blockchain data"],
    correctAnswer: "To prove knowledge of a value without revealing the value itself",
    explanation: "Zero-knowledge proofs allow one party to prove to another that a statement is true, without revealing any information beyond the validity of the statement itself."
  },
  {
    id: "q4",
    category: "Environment",
    difficulty: "Medium",
    question: "Which protocol was the first major international agreement to reduce greenhouse gas emissions?",
    options: ["Paris Agreement", "Kyoto Protocol", "Montreal Protocol", "Copenhagen Accord"],
    correctAnswer: "Kyoto Protocol",
    explanation: "Adopted in 1997, the Kyoto Protocol was the first international treaty to mandate country-by-country reductions in greenhouse gas emissions."
  },
  {
    id: "q5",
    category: "Culture",
    difficulty: "Easy",
    question: "Which ancient civilization built the city of Machu Picchu?",
    options: ["Maya", "Aztec", "Inca", "Olmec"],
    correctAnswer: "Inca",
    explanation: "Machu Picchu is a 15th-century Inca citadel located in the Eastern Cordillera of southern Peru."
  },
  {
    id: "q6",
    category: "Economics",
    difficulty: "Hard",
    question: "What does the Gini coefficient measure?",
    options: ["Economic growth rate", "Inflation", "Income inequality", "Unemployment rate"],
    correctAnswer: "Income inequality",
    explanation: "The Gini coefficient is a statistical measure of economic inequality in a population, ranging from 0 (perfect equality) to 1 (maximal inequality)."
  },
  {
    id: "q7",
    category: "Innovation",
    difficulty: "Medium",
    question: "CRISPR-Cas9 is a technology primarily used for:",
    options: ["Quantum computing", "Gene editing", "Nanotechnology", "Artificial intelligence"],
    correctAnswer: "Gene editing",
    explanation: "CRISPR-Cas9 is a unique technology that enables geneticists and medical researchers to edit parts of the genome by removing, adding or altering sections of the DNA sequence."
  },
  {
    id: "q8",
    category: "Global Affairs",
    difficulty: "Medium",
    question: "The 'Schengen Area' refers to a zone in which region where internal border checks have largely been abolished?",
    options: ["North America", "Southeast Asia", "Europe", "South America"],
    correctAnswer: "Europe",
    explanation: "The Schengen Area is an area comprising 27 European countries that have officially abolished all passport and all other types of border control at their mutual borders."
  },
  {
    id: "q9",
    category: "Environment",
    difficulty: "Hard",
    question: "What is the 'Albedo effect' in climatology?",
    options: ["The rate at which oceans absorb CO2", "The measure of the diffuse reflection of solar radiation out of the total solar radiation", "The impact of deforestation on local rainfall", "The release of methane from permafrost"],
    correctAnswer: "The measure of the diffuse reflection of solar radiation out of the total solar radiation",
    explanation: "Albedo is the fraction of solar energy reflected from the Earth back into space. Ice has a high albedo, while oceans have a low albedo."
  },
  {
    id: "q10",
    category: "Culture",
    difficulty: "Medium",
    question: "The philosophical concept of 'Tabula Rasa' suggests that:",
    options: ["Humans are born with innate knowledge", "The mind is a blank slate at birth", "Destiny is predetermined", "Morality is objective"],
    correctAnswer: "The mind is a blank slate at birth",
    explanation: "Tabula rasa is the epistemological theory that individuals are born without built-in mental content and that all of their knowledge comes from experience and perception."
  },
  {
    id: "q11",
    category: "Economics",
    difficulty: "Easy",
    question: "What is the term for a market structure in which a single seller dominates?",
    options: ["Oligopoly", "Monopoly", "Monopsony", "Perfect Competition"],
    correctAnswer: "Monopoly",
    explanation: "A monopoly exists when a specific person or enterprise is the only supplier of a particular commodity."
  },
  {
    id: "q12",
    category: "Global Affairs",
    difficulty: "Hard",
    question: "Which treaty established the International Criminal Court (ICC)?",
    options: ["Geneva Conventions", "Treaty of Versailles", "Rome Statute", "Charter of the United Nations"],
    correctAnswer: "Rome Statute",
    explanation: "The Rome Statute of the International Criminal Court is the treaty that established the ICC, adopted in 1998."
  },
  {
    id: "q13",
    category: "Innovation",
    difficulty: "Easy",
    question: "What does 'IoT' stand for in technology?",
    options: ["Internet of Things", "Internal Operating Technology", "Integrated Online Terminals", "Intelligent Output Transfer"],
    correctAnswer: "Internet of Things",
    explanation: "The Internet of Things describes physical objects with sensors, processing ability, software, and other technologies that connect and exchange data with other devices and systems over the Internet."
  },
  {
    id: "q14",
    category: "Environment",
    difficulty: "Medium",
    question: "Which of the following is the largest carbon sink on Earth?",
    options: ["The Amazon Rainforest", "The Oceans", "The Boreal Forests", "The Atmosphere"],
    correctAnswer: "The Oceans",
    explanation: "The ocean is the largest carbon sink on Earth, absorbing about 25% of all carbon dioxide emissions."
  },
  {
    id: "q15",
    category: "Culture",
    difficulty: "Hard",
    question: "Which architectural style is characterized by flying buttresses, ribbed vaults, and pointed arches?",
    options: ["Romanesque", "Baroque", "Gothic", "Neoclassical"],
    correctAnswer: "Gothic",
    explanation: "Gothic architecture is a European architectural style that values height and exhibits an intricate and delicate aesthetic, famously utilizing flying buttresses."
  },
  {
    id: "q16",
    category: "Economics",
    difficulty: "Medium",
    question: "What is 'stagflation'?",
    options: ["High inflation combined with high unemployment and stagnant demand", "A period of rapid economic growth and low inflation", "Deflation combined with high economic growth", "A sudden drop in stock market prices"],
    correctAnswer: "High inflation combined with high unemployment and stagnant demand",
    explanation: "Stagflation is a situation in which the inflation rate is high, the economic growth rate slows, and unemployment remains steadily high."
  },
  {
    id: "q17",
    category: "Global Affairs",
    difficulty: "Medium",
    question: "The 'Bretton Woods' conference in 1944 led to the creation of which two institutions?",
    options: ["UN and NATO", "IMF and World Bank", "WTO and WHO", "European Union and European Central Bank"],
    correctAnswer: "IMF and World Bank",
    explanation: "The Bretton Woods Conference established the International Monetary Fund (IMF) and the International Bank for Reconstruction and Development (which later became part of the World Bank)."
  },
  {
    id: "q18",
    category: "Innovation",
    difficulty: "Medium",
    question: "In artificial intelligence, what is a 'neural network' modeled after?",
    options: ["Computer processors", "The human brain", "Quantum mechanics", "Genetic algorithms"],
    correctAnswer: "The human brain",
    explanation: "Artificial neural networks are computing systems vaguely inspired by the biological neural networks that constitute animal brains."
  },
  {
    id: "q19",
    category: "Environment",
    difficulty: "Easy",
    question: "What is the primary cause of ocean acidification?",
    options: ["Plastic pollution", "Oil spills", "Absorption of carbon dioxide", "Overfishing"],
    correctAnswer: "Absorption of carbon dioxide",
    explanation: "Ocean acidification is mainly caused by carbon dioxide gas in the atmosphere dissolving into the ocean."
  },
  {
    id: "q20",
    category: "Culture",
    difficulty: "Medium",
    question: "The 'Renaissance' period originated in which country?",
    options: ["France", "England", "Italy", "Spain"],
    correctAnswer: "Italy",
    explanation: "The Renaissance was a fervent period of European cultural, artistic, political and economic 'rebirth' following the Middle Ages, originating in Italy in the 14th century."
  },
  {
    id: "q21",
    category: "Economics",
    difficulty: "Hard",
    question: "According to the 'Tragedy of the Commons', what happens to shared resources?",
    options: ["They are efficiently managed by the community", "They are depleted by individuals acting in their own self-interest", "They are preserved for future generations", "They are monopolized by a single entity"],
    correctAnswer: "They are depleted by individuals acting in their own self-interest",
    explanation: "The tragedy of the commons is a situation in which individual users, acting independently according to their own self-interest, behave contrary to the common good of all users by depleting or spoiling the shared resource."
  },
  {
    id: "q22",
    category: "Global Affairs",
    difficulty: "Hard",
    question: "What is the 'Thucydides Trap'?",
    options: ["A military strategy involving deception", "The apparent tendency towards war when an emerging power threatens to displace an existing great power", "An economic embargo used as a political weapon", "A diplomatic stalemate in international negotiations"],
    correctAnswer: "The apparent tendency towards war when an emerging power threatens to displace an existing great power",
    explanation: "The Thucydides Trap is a term popularized by political scientist Graham Allison to describe an apparent tendency towards war when an emerging power threatens to displace an existing great power as a regional or international hegemon."
  },
  {
    id: "q23",
    category: "Innovation",
    difficulty: "Hard",
    question: "What is 'Moore's Law'?",
    options: ["The speed of light is constant", "The number of transistors on a microchip doubles about every two years", "Software expands to fill the available memory", "The value of a network is proportional to the square of the number of connected users"],
    correctAnswer: "The number of transistors on a microchip doubles about every two years",
    explanation: "Moore's law is the observation that the number of transistors in a dense integrated circuit doubles about every two years."
  },
  {
    id: "q24",
    category: "Environment",
    difficulty: "Medium",
    question: "Which layer of the atmosphere contains the ozone layer?",
    options: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"],
    correctAnswer: "Stratosphere",
    explanation: "The ozone layer is a region of Earth's stratosphere that absorbs most of the Sun's ultraviolet radiation."
  },
  {
    id: "q25",
    category: "Culture",
    difficulty: "Hard",
    question: "Which linguist proposed the theory of 'Universal Grammar'?",
    options: ["Ferdinand de Saussure", "Noam Chomsky", "Steven Pinker", "B.F. Skinner"],
    correctAnswer: "Noam Chomsky",
    explanation: "Universal grammar is a theoretical linguistics theory, proposed by Noam Chomsky, suggesting that the ability to learn grammar is hard-wired into the brain."
  }
];
