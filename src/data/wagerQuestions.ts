export interface WagerQuestion {
  id: string;
  level: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const wagerDatabase: WagerQuestion[] = [
  {
    "id": "wq_1_0",
    "level": 1,
    "category": "Maths",
    "question": "What is 15 + 27?",
    "options": [
      "42",
      "32",
      "45",
      "52"
    ],
    "correctAnswer": "42"
  },
  {
    "id": "wq_1_1",
    "level": 1,
    "category": "Social Sciences",
    "question": "Which of these is a primary need for human survival?",
    "options": [
      "Internet",
      "Money",
      "Education",
      "Water"
    ],
    "correctAnswer": "Water"
  },
  {
    "id": "wq_1_2",
    "level": 1,
    "category": "Natural Sciences",
    "question": "What planet is known as the Red Planet?",
    "options": [
      "Venus",
      "Saturn",
      "Mars",
      "Jupiter"
    ],
    "correctAnswer": "Mars"
  },
  {
    "id": "wq_1_3",
    "level": 1,
    "category": "Politics",
    "question": "What is the title of the head of state in a monarchy?",
    "options": [
      "King or Queen",
      "President",
      "Prime Minister",
      "Chancellor"
    ],
    "correctAnswer": "King or Queen"
  },
  {
    "id": "wq_1_4",
    "level": 1,
    "category": "General Knowledge",
    "question": "How many days are in a standard year?",
    "options": [
      "360",
      "365",
      "366",
      "364"
    ],
    "correctAnswer": "365"
  },
  {
    "id": "wq_2_5",
    "level": 2,
    "category": "Maths",
    "question": "What is the value of pi to two decimal places?",
    "options": [
      "3.18",
      "3.12",
      "3.16",
      "3.14"
    ],
    "correctAnswer": "3.14"
  },
  {
    "id": "wq_2_6",
    "level": 2,
    "category": "Social Sciences",
    "question": "Who was the first President of the United States?",
    "options": [
      "George Washington",
      "Thomas Jefferson",
      "Abraham Lincoln",
      "John Adams"
    ],
    "correctAnswer": "George Washington"
  },
  {
    "id": "wq_2_7",
    "level": 2,
    "category": "Natural Sciences",
    "question": "What is the chemical symbol for Gold?",
    "options": [
      "Pb",
      "Au",
      "Ag",
      "Fe"
    ],
    "correctAnswer": "Au"
  },
  {
    "id": "wq_2_8",
    "level": 2,
    "category": "Politics",
    "question": "What are the three branches of the US government?",
    "options": [
      "Local, State, Federal",
      "Executive, Legislative, Judicial",
      "Army, Navy, Air Force",
      "Senate, House, Cabinet"
    ],
    "correctAnswer": "Executive, Legislative, Judicial"
  },
  {
    "id": "wq_2_9",
    "level": 2,
    "category": "General Knowledge",
    "question": "Which ocean is the largest on Earth?",
    "options": [
      "Atlantic Ocean",
      "Pacific Ocean",
      "Arctic Ocean",
      "Indian Ocean"
    ],
    "correctAnswer": "Pacific Ocean"
  },
  {
    "id": "wq_3_10",
    "level": 3,
    "category": "Maths",
    "question": "In the context of High School Geometry, which principle defines the core operational boundary?",
    "options": [
      "The Geometry Theorem",
      "Standard Limit Principle",
      "Orthogonal Projection",
      "Derivative Constant"
    ],
    "correctAnswer": "The Geometry Theorem"
  },
  {
    "id": "wq_3_11",
    "level": 3,
    "category": "Social Sciences",
    "question": "Which foundational theory in Psychology best explains behavioral shifts in large populations?",
    "options": [
      "Structural Functionalism",
      "Social Contract Theory",
      "Cognitive Dissonance",
      "The Psychology Model"
    ],
    "correctAnswer": "The Psychology Model"
  },
  {
    "id": "wq_3_12",
    "level": 3,
    "category": "Natural Sciences",
    "question": "At an advanced level of Thermodynamics, what is the primary mechanism for state transformation?",
    "options": [
      "Catalytic Conversion",
      "Thermal Degradation",
      "The Thermodynamics Effect",
      "Quantum Tunneling"
    ],
    "correctAnswer": "The Thermodynamics Effect"
  },
  {
    "id": "wq_3_13",
    "level": 3,
    "category": "Politics",
    "question": "Within Public Administration, how is institutional power typically balanced against external pressures?",
    "options": [
      "Executive Privilege",
      "The Public Administration Doctrine",
      "Proportional Representation",
      "Bilateral Treaties"
    ],
    "correctAnswer": "The Public Administration Doctrine"
  },
  {
    "id": "wq_3_14",
    "level": 3,
    "category": "General Knowledge",
    "question": "Which major movement in Philosophy fundamentally altered the 20th-century landscape?",
    "options": [
      "The Enlightenment",
      "Post-Structuralism",
      "The Philosophy Renaissance",
      "Modernism"
    ],
    "correctAnswer": "The Philosophy Renaissance"
  },
  {
    "id": "wq_4_15",
    "level": 4,
    "category": "Maths",
    "question": "In the context of High School Probability, which principle defines the core operational boundary?",
    "options": [
      "Derivative Constant",
      "Standard Limit Principle",
      "The Probability Theorem",
      "Orthogonal Projection"
    ],
    "correctAnswer": "The Probability Theorem"
  },
  {
    "id": "wq_4_16",
    "level": 4,
    "category": "Social Sciences",
    "question": "Which foundational theory in Anthropology best explains behavioral shifts in large populations?",
    "options": [
      "The Anthropology Model",
      "Cognitive Dissonance",
      "Social Contract Theory",
      "Structural Functionalism"
    ],
    "correctAnswer": "The Anthropology Model"
  },
  {
    "id": "wq_4_17",
    "level": 4,
    "category": "Natural Sciences",
    "question": "At an advanced level of Astrophysics, what is the primary mechanism for state transformation?",
    "options": [
      "Catalytic Conversion",
      "The Astrophysics Effect",
      "Quantum Tunneling",
      "Thermal Degradation"
    ],
    "correctAnswer": "The Astrophysics Effect"
  },
  {
    "id": "wq_4_18",
    "level": 4,
    "category": "Politics",
    "question": "Within Public Policy, how is institutional power typically balanced against external pressures?",
    "options": [
      "Proportional Representation",
      "The Public Policy Doctrine",
      "Bilateral Treaties",
      "Executive Privilege"
    ],
    "correctAnswer": "The Public Policy Doctrine"
  },
  {
    "id": "wq_4_19",
    "level": 4,
    "category": "General Knowledge",
    "question": "Which major movement in World Religions fundamentally altered the 20th-century landscape?",
    "options": [
      "The World Religions Renaissance",
      "Modernism",
      "Post-Structuralism",
      "The Enlightenment"
    ],
    "correctAnswer": "The World Religions Renaissance"
  },
  {
    "id": "wq_5_20",
    "level": 5,
    "category": "Maths",
    "question": "In the context of High School Statistics, which principle defines the core operational boundary?",
    "options": [
      "The Statistics Theorem",
      "Standard Limit Principle",
      "Derivative Constant",
      "Orthogonal Projection"
    ],
    "correctAnswer": "The Statistics Theorem"
  },
  {
    "id": "wq_5_21",
    "level": 5,
    "category": "Social Sciences",
    "question": "Which foundational theory in Archaeology best explains behavioral shifts in large populations?",
    "options": [
      "Structural Functionalism",
      "Cognitive Dissonance",
      "The Archaeology Model",
      "Social Contract Theory"
    ],
    "correctAnswer": "The Archaeology Model"
  },
  {
    "id": "wq_5_22",
    "level": 5,
    "category": "Natural Sciences",
    "question": "At an advanced level of Microbiology, what is the primary mechanism for state transformation?",
    "options": [
      "Quantum Tunneling",
      "The Microbiology Effect",
      "Thermal Degradation",
      "Catalytic Conversion"
    ],
    "correctAnswer": "The Microbiology Effect"
  },
  {
    "id": "wq_5_23",
    "level": 5,
    "category": "Politics",
    "question": "Within Political Economy, how is institutional power typically balanced against external pressures?",
    "options": [
      "Executive Privilege",
      "Proportional Representation",
      "Bilateral Treaties",
      "The Political Economy Doctrine"
    ],
    "correctAnswer": "The Political Economy Doctrine"
  },
  {
    "id": "wq_5_24",
    "level": 5,
    "category": "General Knowledge",
    "question": "Which major movement in Music Theory fundamentally altered the 20th-century landscape?",
    "options": [
      "Post-Structuralism",
      "The Enlightenment",
      "Modernism",
      "The Music Theory Renaissance"
    ],
    "correctAnswer": "The Music Theory Renaissance"
  },
  {
    "id": "wq_6_25",
    "level": 6,
    "category": "Maths",
    "question": "In the context of High School Differential Equations, which principle defines the core operational boundary?",
    "options": [
      "Orthogonal Projection",
      "Standard Limit Principle",
      "Derivative Constant",
      "The Differential Equations Theorem"
    ],
    "correctAnswer": "The Differential Equations Theorem"
  },
  {
    "id": "wq_6_26",
    "level": 6,
    "category": "Social Sciences",
    "question": "Which foundational theory in Human Geography best explains behavioral shifts in large populations?",
    "options": [
      "Social Contract Theory",
      "The Human Geography Model",
      "Cognitive Dissonance",
      "Structural Functionalism"
    ],
    "correctAnswer": "The Human Geography Model"
  },
  {
    "id": "wq_6_27",
    "level": 6,
    "category": "Natural Sciences",
    "question": "At an advanced level of Ecology, what is the primary mechanism for state transformation?",
    "options": [
      "The Ecology Effect",
      "Thermal Degradation",
      "Quantum Tunneling",
      "Catalytic Conversion"
    ],
    "correctAnswer": "The Ecology Effect"
  },
  {
    "id": "wq_6_28",
    "level": 6,
    "category": "Politics",
    "question": "Within Constitutional Law, how is institutional power typically balanced against external pressures?",
    "options": [
      "Bilateral Treaties",
      "The Constitutional Law Doctrine",
      "Executive Privilege",
      "Proportional Representation"
    ],
    "correctAnswer": "The Constitutional Law Doctrine"
  },
  {
    "id": "wq_6_29",
    "level": 6,
    "category": "General Knowledge",
    "question": "Which major movement in Architecture fundamentally altered the 20th-century landscape?",
    "options": [
      "The Enlightenment",
      "Post-Structuralism",
      "The Architecture Renaissance",
      "Modernism"
    ],
    "correctAnswer": "The Architecture Renaissance"
  },
  {
    "id": "wq_7_30",
    "level": 7,
    "category": "Maths",
    "question": "In the context of High School Topology, which principle defines the core operational boundary?",
    "options": [
      "Derivative Constant",
      "Orthogonal Projection",
      "Standard Limit Principle",
      "The Topology Theorem"
    ],
    "correctAnswer": "The Topology Theorem"
  },
  {
    "id": "wq_7_31",
    "level": 7,
    "category": "Social Sciences",
    "question": "Which foundational theory in Linguistics best explains behavioral shifts in large populations?",
    "options": [
      "Social Contract Theory",
      "The Linguistics Model",
      "Cognitive Dissonance",
      "Structural Functionalism"
    ],
    "correctAnswer": "The Linguistics Model"
  },
  {
    "id": "wq_7_32",
    "level": 7,
    "category": "Natural Sciences",
    "question": "At an advanced level of Neuroscience, what is the primary mechanism for state transformation?",
    "options": [
      "Quantum Tunneling",
      "Thermal Degradation",
      "The Neuroscience Effect",
      "Catalytic Conversion"
    ],
    "correctAnswer": "The Neuroscience Effect"
  },
  {
    "id": "wq_7_33",
    "level": 7,
    "category": "Politics",
    "question": "Within Human Rights, how is institutional power typically balanced against external pressures?",
    "options": [
      "Proportional Representation",
      "The Human Rights Doctrine",
      "Bilateral Treaties",
      "Executive Privilege"
    ],
    "correctAnswer": "The Human Rights Doctrine"
  },
  {
    "id": "wq_7_34",
    "level": 7,
    "category": "General Knowledge",
    "question": "Which major movement in Mythology fundamentally altered the 20th-century landscape?",
    "options": [
      "The Mythology Renaissance",
      "Modernism",
      "Post-Structuralism",
      "The Enlightenment"
    ],
    "correctAnswer": "The Mythology Renaissance"
  },
  {
    "id": "wq_8_35",
    "level": 8,
    "category": "Maths",
    "question": "In the context of High School Abstract Algebra, which principle defines the core operational boundary?",
    "options": [
      "The Abstract Algebra Theorem",
      "Orthogonal Projection",
      "Standard Limit Principle",
      "Derivative Constant"
    ],
    "correctAnswer": "The Abstract Algebra Theorem"
  },
  {
    "id": "wq_8_36",
    "level": 8,
    "category": "Social Sciences",
    "question": "Which foundational theory in Political Science best explains behavioral shifts in large populations?",
    "options": [
      "Structural Functionalism",
      "Cognitive Dissonance",
      "The Political Science Model",
      "Social Contract Theory"
    ],
    "correctAnswer": "The Political Science Model"
  },
  {
    "id": "wq_8_37",
    "level": 8,
    "category": "Natural Sciences",
    "question": "At an advanced level of Particle Physics, what is the primary mechanism for state transformation?",
    "options": [
      "Catalytic Conversion",
      "The Particle Physics Effect",
      "Quantum Tunneling",
      "Thermal Degradation"
    ],
    "correctAnswer": "The Particle Physics Effect"
  },
  {
    "id": "wq_8_38",
    "level": 8,
    "category": "Politics",
    "question": "Within Electoral Systems, how is institutional power typically balanced against external pressures?",
    "options": [
      "Proportional Representation",
      "Executive Privilege",
      "The Electoral Systems Doctrine",
      "Bilateral Treaties"
    ],
    "correctAnswer": "The Electoral Systems Doctrine"
  },
  {
    "id": "wq_8_39",
    "level": 8,
    "category": "General Knowledge",
    "question": "Which major movement in Culinary Arts fundamentally altered the 20th-century landscape?",
    "options": [
      "The Culinary Arts Renaissance",
      "Modernism",
      "The Enlightenment",
      "Post-Structuralism"
    ],
    "correctAnswer": "The Culinary Arts Renaissance"
  },
  {
    "id": "wq_9_40",
    "level": 9,
    "category": "Maths",
    "question": "In the context of High School Complex Analysis, which principle defines the core operational boundary?",
    "options": [
      "Standard Limit Principle",
      "The Complex Analysis Theorem",
      "Orthogonal Projection",
      "Derivative Constant"
    ],
    "correctAnswer": "The Complex Analysis Theorem"
  },
  {
    "id": "wq_9_41",
    "level": 9,
    "category": "Social Sciences",
    "question": "Which foundational theory in Criminology best explains behavioral shifts in large populations?",
    "options": [
      "The Criminology Model",
      "Social Contract Theory",
      "Structural Functionalism",
      "Cognitive Dissonance"
    ],
    "correctAnswer": "The Criminology Model"
  },
  {
    "id": "wq_9_42",
    "level": 9,
    "category": "Natural Sciences",
    "question": "At an advanced level of Geology, what is the primary mechanism for state transformation?",
    "options": [
      "Catalytic Conversion",
      "The Geology Effect",
      "Quantum Tunneling",
      "Thermal Degradation"
    ],
    "correctAnswer": "The Geology Effect"
  },
  {
    "id": "wq_9_43",
    "level": 9,
    "category": "Politics",
    "question": "Within Diplomacy, how is institutional power typically balanced against external pressures?",
    "options": [
      "Proportional Representation",
      "Bilateral Treaties",
      "Executive Privilege",
      "The Diplomacy Doctrine"
    ],
    "correctAnswer": "The Diplomacy Doctrine"
  },
  {
    "id": "wq_9_44",
    "level": 9,
    "category": "General Knowledge",
    "question": "Which major movement in Cinema History fundamentally altered the 20th-century landscape?",
    "options": [
      "The Cinema History Renaissance",
      "Modernism",
      "Post-Structuralism",
      "The Enlightenment"
    ],
    "correctAnswer": "The Cinema History Renaissance"
  },
  {
    "id": "wq_10_45",
    "level": 10,
    "category": "Maths",
    "question": "In the context of College Calculus, which principle defines the core operational boundary?",
    "options": [
      "Derivative Constant",
      "Orthogonal Projection",
      "Standard Limit Principle",
      "The Calculus Theorem"
    ],
    "correctAnswer": "The Calculus Theorem"
  },
  {
    "id": "wq_10_46",
    "level": 10,
    "category": "Social Sciences",
    "question": "Which foundational theory in Macroeconomics best explains behavioral shifts in large populations?",
    "options": [
      "Social Contract Theory",
      "The Macroeconomics Model",
      "Cognitive Dissonance",
      "Structural Functionalism"
    ],
    "correctAnswer": "The Macroeconomics Model"
  },
  {
    "id": "wq_10_47",
    "level": 10,
    "category": "Natural Sciences",
    "question": "At an advanced level of Quantum Mechanics, what is the primary mechanism for state transformation?",
    "options": [
      "Quantum Tunneling",
      "Catalytic Conversion",
      "Thermal Degradation",
      "The Quantum Mechanics Effect"
    ],
    "correctAnswer": "The Quantum Mechanics Effect"
  },
  {
    "id": "wq_10_48",
    "level": 10,
    "category": "Politics",
    "question": "Within International Relations, how is institutional power typically balanced against external pressures?",
    "options": [
      "Proportional Representation",
      "Executive Privilege",
      "Bilateral Treaties",
      "The International Relations Doctrine"
    ],
    "correctAnswer": "The International Relations Doctrine"
  },
  {
    "id": "wq_10_49",
    "level": 10,
    "category": "General Knowledge",
    "question": "Which major movement in World History fundamentally altered the 20th-century landscape?",
    "options": [
      "The World History Renaissance",
      "Post-Structuralism",
      "The Enlightenment",
      "Modernism"
    ],
    "correctAnswer": "The World History Renaissance"
  },
  {
    "id": "wq_11_50",
    "level": 11,
    "category": "Maths",
    "question": "In the context of College Linear Algebra, which principle defines the core operational boundary?",
    "options": [
      "The Linear Algebra Theorem",
      "Standard Limit Principle",
      "Orthogonal Projection",
      "Derivative Constant"
    ],
    "correctAnswer": "The Linear Algebra Theorem"
  },
  {
    "id": "wq_11_51",
    "level": 11,
    "category": "Social Sciences",
    "question": "Which foundational theory in Microeconomics best explains behavioral shifts in large populations?",
    "options": [
      "Structural Functionalism",
      "Cognitive Dissonance",
      "The Microeconomics Model",
      "Social Contract Theory"
    ],
    "correctAnswer": "The Microeconomics Model"
  },
  {
    "id": "wq_11_52",
    "level": 11,
    "category": "Natural Sciences",
    "question": "At an advanced level of Organic Chemistry, what is the primary mechanism for state transformation?",
    "options": [
      "Thermal Degradation",
      "Catalytic Conversion",
      "Quantum Tunneling",
      "The Organic Chemistry Effect"
    ],
    "correctAnswer": "The Organic Chemistry Effect"
  },
  {
    "id": "wq_11_53",
    "level": 11,
    "category": "Politics",
    "question": "Within Comparative Politics, how is institutional power typically balanced against external pressures?",
    "options": [
      "Executive Privilege",
      "The Comparative Politics Doctrine",
      "Proportional Representation",
      "Bilateral Treaties"
    ],
    "correctAnswer": "The Comparative Politics Doctrine"
  },
  {
    "id": "wq_11_54",
    "level": 11,
    "category": "General Knowledge",
    "question": "Which major movement in Art History fundamentally altered the 20th-century landscape?",
    "options": [
      "Modernism",
      "The Enlightenment",
      "Post-Structuralism",
      "The Art History Renaissance"
    ],
    "correctAnswer": "The Art History Renaissance"
  },
  {
    "id": "wq_12_55",
    "level": 12,
    "category": "Maths",
    "question": "In the context of College Number Theory, which principle defines the core operational boundary?",
    "options": [
      "Standard Limit Principle",
      "The Number Theory Theorem",
      "Orthogonal Projection",
      "Derivative Constant"
    ],
    "correctAnswer": "The Number Theory Theorem"
  },
  {
    "id": "wq_12_56",
    "level": 12,
    "category": "Social Sciences",
    "question": "Which foundational theory in Sociology best explains behavioral shifts in large populations?",
    "options": [
      "Social Contract Theory",
      "Structural Functionalism",
      "Cognitive Dissonance",
      "The Sociology Model"
    ],
    "correctAnswer": "The Sociology Model"
  },
  {
    "id": "wq_12_57",
    "level": 12,
    "category": "Natural Sciences",
    "question": "At an advanced level of Genetics, what is the primary mechanism for state transformation?",
    "options": [
      "Catalytic Conversion",
      "The Genetics Effect",
      "Thermal Degradation",
      "Quantum Tunneling"
    ],
    "correctAnswer": "The Genetics Effect"
  },
  {
    "id": "wq_12_58",
    "level": 12,
    "category": "Politics",
    "question": "Within Political Theory, how is institutional power typically balanced against external pressures?",
    "options": [
      "Proportional Representation",
      "Executive Privilege",
      "The Political Theory Doctrine",
      "Bilateral Treaties"
    ],
    "correctAnswer": "The Political Theory Doctrine"
  },
  {
    "id": "wq_12_59",
    "level": 12,
    "category": "General Knowledge",
    "question": "Which major movement in Classical Literature fundamentally altered the 20th-century landscape?",
    "options": [
      "The Enlightenment",
      "Post-Structuralism",
      "Modernism",
      "The Classical Literature Renaissance"
    ],
    "correctAnswer": "The Classical Literature Renaissance"
  },
  {
    "id": "wq_13_60",
    "level": 13,
    "category": "Maths",
    "question": "In the context of College Geometry, which principle defines the core operational boundary?",
    "options": [
      "The Geometry Theorem",
      "Standard Limit Principle",
      "Orthogonal Projection",
      "Derivative Constant"
    ],
    "correctAnswer": "The Geometry Theorem"
  },
  {
    "id": "wq_13_61",
    "level": 13,
    "category": "Social Sciences",
    "question": "Which foundational theory in Psychology best explains behavioral shifts in large populations?",
    "options": [
      "Social Contract Theory",
      "Structural Functionalism",
      "Cognitive Dissonance",
      "The Psychology Model"
    ],
    "correctAnswer": "The Psychology Model"
  },
  {
    "id": "wq_13_62",
    "level": 13,
    "category": "Natural Sciences",
    "question": "At an advanced level of Thermodynamics, what is the primary mechanism for state transformation?",
    "options": [
      "Thermal Degradation",
      "Quantum Tunneling",
      "The Thermodynamics Effect",
      "Catalytic Conversion"
    ],
    "correctAnswer": "The Thermodynamics Effect"
  },
  {
    "id": "wq_13_63",
    "level": 13,
    "category": "Politics",
    "question": "Within Public Administration, how is institutional power typically balanced against external pressures?",
    "options": [
      "Executive Privilege",
      "The Public Administration Doctrine",
      "Proportional Representation",
      "Bilateral Treaties"
    ],
    "correctAnswer": "The Public Administration Doctrine"
  },
  {
    "id": "wq_13_64",
    "level": 13,
    "category": "General Knowledge",
    "question": "Which major movement in Philosophy fundamentally altered the 20th-century landscape?",
    "options": [
      "The Philosophy Renaissance",
      "Post-Structuralism",
      "Modernism",
      "The Enlightenment"
    ],
    "correctAnswer": "The Philosophy Renaissance"
  },
  {
    "id": "wq_14_65",
    "level": 14,
    "category": "Maths",
    "question": "In the context of College Probability, which principle defines the core operational boundary?",
    "options": [
      "Standard Limit Principle",
      "Derivative Constant",
      "Orthogonal Projection",
      "The Probability Theorem"
    ],
    "correctAnswer": "The Probability Theorem"
  },
  {
    "id": "wq_14_66",
    "level": 14,
    "category": "Social Sciences",
    "question": "Which foundational theory in Anthropology best explains behavioral shifts in large populations?",
    "options": [
      "Cognitive Dissonance",
      "Structural Functionalism",
      "The Anthropology Model",
      "Social Contract Theory"
    ],
    "correctAnswer": "The Anthropology Model"
  },
  {
    "id": "wq_14_67",
    "level": 14,
    "category": "Natural Sciences",
    "question": "At an advanced level of Astrophysics, what is the primary mechanism for state transformation?",
    "options": [
      "Catalytic Conversion",
      "The Astrophysics Effect",
      "Quantum Tunneling",
      "Thermal Degradation"
    ],
    "correctAnswer": "The Astrophysics Effect"
  },
  {
    "id": "wq_14_68",
    "level": 14,
    "category": "Politics",
    "question": "Within Public Policy, how is institutional power typically balanced against external pressures?",
    "options": [
      "Proportional Representation",
      "Executive Privilege",
      "Bilateral Treaties",
      "The Public Policy Doctrine"
    ],
    "correctAnswer": "The Public Policy Doctrine"
  },
  {
    "id": "wq_14_69",
    "level": 14,
    "category": "General Knowledge",
    "question": "Which major movement in World Religions fundamentally altered the 20th-century landscape?",
    "options": [
      "Post-Structuralism",
      "Modernism",
      "The Enlightenment",
      "The World Religions Renaissance"
    ],
    "correctAnswer": "The World Religions Renaissance"
  },
  {
    "id": "wq_15_70",
    "level": 15,
    "category": "Maths",
    "question": "In the context of College Statistics, which principle defines the core operational boundary?",
    "options": [
      "Derivative Constant",
      "Orthogonal Projection",
      "Standard Limit Principle",
      "The Statistics Theorem"
    ],
    "correctAnswer": "The Statistics Theorem"
  },
  {
    "id": "wq_15_71",
    "level": 15,
    "category": "Social Sciences",
    "question": "Which foundational theory in Archaeology best explains behavioral shifts in large populations?",
    "options": [
      "The Archaeology Model",
      "Social Contract Theory",
      "Structural Functionalism",
      "Cognitive Dissonance"
    ],
    "correctAnswer": "The Archaeology Model"
  },
  {
    "id": "wq_15_72",
    "level": 15,
    "category": "Natural Sciences",
    "question": "At an advanced level of Microbiology, what is the primary mechanism for state transformation?",
    "options": [
      "Quantum Tunneling",
      "Thermal Degradation",
      "The Microbiology Effect",
      "Catalytic Conversion"
    ],
    "correctAnswer": "The Microbiology Effect"
  },
  {
    "id": "wq_15_73",
    "level": 15,
    "category": "Politics",
    "question": "Within Political Economy, how is institutional power typically balanced against external pressures?",
    "options": [
      "Executive Privilege",
      "The Political Economy Doctrine",
      "Bilateral Treaties",
      "Proportional Representation"
    ],
    "correctAnswer": "The Political Economy Doctrine"
  },
  {
    "id": "wq_15_74",
    "level": 15,
    "category": "General Knowledge",
    "question": "Which major movement in Music Theory fundamentally altered the 20th-century landscape?",
    "options": [
      "The Music Theory Renaissance",
      "Modernism",
      "The Enlightenment",
      "Post-Structuralism"
    ],
    "correctAnswer": "The Music Theory Renaissance"
  },
  {
    "id": "wq_16_75",
    "level": 16,
    "category": "Maths",
    "question": "In the context of College Differential Equations, which principle defines the core operational boundary?",
    "options": [
      "The Differential Equations Theorem",
      "Standard Limit Principle",
      "Derivative Constant",
      "Orthogonal Projection"
    ],
    "correctAnswer": "The Differential Equations Theorem"
  },
  {
    "id": "wq_16_76",
    "level": 16,
    "category": "Social Sciences",
    "question": "Which foundational theory in Human Geography best explains behavioral shifts in large populations?",
    "options": [
      "Structural Functionalism",
      "Cognitive Dissonance",
      "The Human Geography Model",
      "Social Contract Theory"
    ],
    "correctAnswer": "The Human Geography Model"
  },
  {
    "id": "wq_16_77",
    "level": 16,
    "category": "Natural Sciences",
    "question": "At an advanced level of Ecology, what is the primary mechanism for state transformation?",
    "options": [
      "Catalytic Conversion",
      "The Ecology Effect",
      "Thermal Degradation",
      "Quantum Tunneling"
    ],
    "correctAnswer": "The Ecology Effect"
  },
  {
    "id": "wq_16_78",
    "level": 16,
    "category": "Politics",
    "question": "Within Constitutional Law, how is institutional power typically balanced against external pressures?",
    "options": [
      "Bilateral Treaties",
      "The Constitutional Law Doctrine",
      "Executive Privilege",
      "Proportional Representation"
    ],
    "correctAnswer": "The Constitutional Law Doctrine"
  },
  {
    "id": "wq_16_79",
    "level": 16,
    "category": "General Knowledge",
    "question": "Which major movement in Architecture fundamentally altered the 20th-century landscape?",
    "options": [
      "The Architecture Renaissance",
      "Modernism",
      "The Enlightenment",
      "Post-Structuralism"
    ],
    "correctAnswer": "The Architecture Renaissance"
  },
  {
    "id": "wq_17_80",
    "level": 17,
    "category": "Maths",
    "question": "In the context of College Topology, which principle defines the core operational boundary?",
    "options": [
      "The Topology Theorem",
      "Standard Limit Principle",
      "Derivative Constant",
      "Orthogonal Projection"
    ],
    "correctAnswer": "The Topology Theorem"
  },
  {
    "id": "wq_17_81",
    "level": 17,
    "category": "Social Sciences",
    "question": "Which foundational theory in Linguistics best explains behavioral shifts in large populations?",
    "options": [
      "Social Contract Theory",
      "Structural Functionalism",
      "Cognitive Dissonance",
      "The Linguistics Model"
    ],
    "correctAnswer": "The Linguistics Model"
  },
  {
    "id": "wq_17_82",
    "level": 17,
    "category": "Natural Sciences",
    "question": "At an advanced level of Neuroscience, what is the primary mechanism for state transformation?",
    "options": [
      "The Neuroscience Effect",
      "Quantum Tunneling",
      "Catalytic Conversion",
      "Thermal Degradation"
    ],
    "correctAnswer": "The Neuroscience Effect"
  },
  {
    "id": "wq_17_83",
    "level": 17,
    "category": "Politics",
    "question": "Within Human Rights, how is institutional power typically balanced against external pressures?",
    "options": [
      "Executive Privilege",
      "Proportional Representation",
      "The Human Rights Doctrine",
      "Bilateral Treaties"
    ],
    "correctAnswer": "The Human Rights Doctrine"
  },
  {
    "id": "wq_17_84",
    "level": 17,
    "category": "General Knowledge",
    "question": "Which major movement in Mythology fundamentally altered the 20th-century landscape?",
    "options": [
      "The Enlightenment",
      "Post-Structuralism",
      "Modernism",
      "The Mythology Renaissance"
    ],
    "correctAnswer": "The Mythology Renaissance"
  },
  {
    "id": "wq_18_85",
    "level": 18,
    "category": "Maths",
    "question": "In the context of Undergrad Abstract Algebra, which principle defines the core operational boundary?",
    "options": [
      "The Abstract Algebra Theorem",
      "Derivative Constant",
      "Standard Limit Principle",
      "Orthogonal Projection"
    ],
    "correctAnswer": "The Abstract Algebra Theorem"
  },
  {
    "id": "wq_18_86",
    "level": 18,
    "category": "Social Sciences",
    "question": "Which foundational theory in Political Science best explains behavioral shifts in large populations?",
    "options": [
      "The Political Science Model",
      "Cognitive Dissonance",
      "Social Contract Theory",
      "Structural Functionalism"
    ],
    "correctAnswer": "The Political Science Model"
  },
  {
    "id": "wq_18_87",
    "level": 18,
    "category": "Natural Sciences",
    "question": "At an advanced level of Particle Physics, what is the primary mechanism for state transformation?",
    "options": [
      "Catalytic Conversion",
      "The Particle Physics Effect",
      "Quantum Tunneling",
      "Thermal Degradation"
    ],
    "correctAnswer": "The Particle Physics Effect"
  },
  {
    "id": "wq_18_88",
    "level": 18,
    "category": "Politics",
    "question": "Within Electoral Systems, how is institutional power typically balanced against external pressures?",
    "options": [
      "Bilateral Treaties",
      "The Electoral Systems Doctrine",
      "Proportional Representation",
      "Executive Privilege"
    ],
    "correctAnswer": "The Electoral Systems Doctrine"
  },
  {
    "id": "wq_18_89",
    "level": 18,
    "category": "General Knowledge",
    "question": "Which major movement in Culinary Arts fundamentally altered the 20th-century landscape?",
    "options": [
      "The Culinary Arts Renaissance",
      "Modernism",
      "The Enlightenment",
      "Post-Structuralism"
    ],
    "correctAnswer": "The Culinary Arts Renaissance"
  },
  {
    "id": "wq_19_90",
    "level": 19,
    "category": "Maths",
    "question": "In the context of Undergrad Complex Analysis, which principle defines the core operational boundary?",
    "options": [
      "The Complex Analysis Theorem",
      "Standard Limit Principle",
      "Orthogonal Projection",
      "Derivative Constant"
    ],
    "correctAnswer": "The Complex Analysis Theorem"
  },
  {
    "id": "wq_19_91",
    "level": 19,
    "category": "Social Sciences",
    "question": "Which foundational theory in Criminology best explains behavioral shifts in large populations?",
    "options": [
      "Social Contract Theory",
      "Cognitive Dissonance",
      "The Criminology Model",
      "Structural Functionalism"
    ],
    "correctAnswer": "The Criminology Model"
  },
  {
    "id": "wq_19_92",
    "level": 19,
    "category": "Natural Sciences",
    "question": "At an advanced level of Geology, what is the primary mechanism for state transformation?",
    "options": [
      "The Geology Effect",
      "Thermal Degradation",
      "Quantum Tunneling",
      "Catalytic Conversion"
    ],
    "correctAnswer": "The Geology Effect"
  },
  {
    "id": "wq_19_93",
    "level": 19,
    "category": "Politics",
    "question": "Within Diplomacy, how is institutional power typically balanced against external pressures?",
    "options": [
      "Bilateral Treaties",
      "The Diplomacy Doctrine",
      "Executive Privilege",
      "Proportional Representation"
    ],
    "correctAnswer": "The Diplomacy Doctrine"
  },
  {
    "id": "wq_19_94",
    "level": 19,
    "category": "General Knowledge",
    "question": "Which major movement in Cinema History fundamentally altered the 20th-century landscape?",
    "options": [
      "The Cinema History Renaissance",
      "Modernism",
      "The Enlightenment",
      "Post-Structuralism"
    ],
    "correctAnswer": "The Cinema History Renaissance"
  },
  {
    "id": "wq_20_95",
    "level": 20,
    "category": "Maths",
    "question": "In the context of Undergrad Calculus, which principle defines the core operational boundary?",
    "options": [
      "Derivative Constant",
      "The Calculus Theorem",
      "Standard Limit Principle",
      "Orthogonal Projection"
    ],
    "correctAnswer": "The Calculus Theorem"
  },
  {
    "id": "wq_20_96",
    "level": 20,
    "category": "Social Sciences",
    "question": "Which foundational theory in Macroeconomics best explains behavioral shifts in large populations?",
    "options": [
      "Structural Functionalism",
      "Cognitive Dissonance",
      "The Macroeconomics Model",
      "Social Contract Theory"
    ],
    "correctAnswer": "The Macroeconomics Model"
  },
  {
    "id": "wq_20_97",
    "level": 20,
    "category": "Natural Sciences",
    "question": "At an advanced level of Quantum Mechanics, what is the primary mechanism for state transformation?",
    "options": [
      "Quantum Tunneling",
      "Thermal Degradation",
      "The Quantum Mechanics Effect",
      "Catalytic Conversion"
    ],
    "correctAnswer": "The Quantum Mechanics Effect"
  },
  {
    "id": "wq_20_98",
    "level": 20,
    "category": "Politics",
    "question": "Within International Relations, how is institutional power typically balanced against external pressures?",
    "options": [
      "The International Relations Doctrine",
      "Bilateral Treaties",
      "Executive Privilege",
      "Proportional Representation"
    ],
    "correctAnswer": "The International Relations Doctrine"
  },
  {
    "id": "wq_20_99",
    "level": 20,
    "category": "General Knowledge",
    "question": "Which major movement in World History fundamentally altered the 20th-century landscape?",
    "options": [
      "Post-Structuralism",
      "Modernism",
      "The Enlightenment",
      "The World History Renaissance"
    ],
    "correctAnswer": "The World History Renaissance"
  },
  {
    "id": "wq_21_100",
    "level": 21,
    "category": "Maths",
    "question": "In the context of Undergrad Linear Algebra, which principle defines the core operational boundary?",
    "options": [
      "Standard Limit Principle",
      "The Linear Algebra Theorem",
      "Derivative Constant",
      "Orthogonal Projection"
    ],
    "correctAnswer": "The Linear Algebra Theorem"
  },
  {
    "id": "wq_21_101",
    "level": 21,
    "category": "Social Sciences",
    "question": "Which foundational theory in Microeconomics best explains behavioral shifts in large populations?",
    "options": [
      "Cognitive Dissonance",
      "Structural Functionalism",
      "Social Contract Theory",
      "The Microeconomics Model"
    ],
    "correctAnswer": "The Microeconomics Model"
  },
  {
    "id": "wq_21_102",
    "level": 21,
    "category": "Natural Sciences",
    "question": "At an advanced level of Organic Chemistry, what is the primary mechanism for state transformation?",
    "options": [
      "Quantum Tunneling",
      "Thermal Degradation",
      "The Organic Chemistry Effect",
      "Catalytic Conversion"
    ],
    "correctAnswer": "The Organic Chemistry Effect"
  },
  {
    "id": "wq_21_103",
    "level": 21,
    "category": "Politics",
    "question": "Within Comparative Politics, how is institutional power typically balanced against external pressures?",
    "options": [
      "Proportional Representation",
      "Bilateral Treaties",
      "The Comparative Politics Doctrine",
      "Executive Privilege"
    ],
    "correctAnswer": "The Comparative Politics Doctrine"
  },
  {
    "id": "wq_21_104",
    "level": 21,
    "category": "General Knowledge",
    "question": "Which major movement in Art History fundamentally altered the 20th-century landscape?",
    "options": [
      "The Enlightenment",
      "Modernism",
      "Post-Structuralism",
      "The Art History Renaissance"
    ],
    "correctAnswer": "The Art History Renaissance"
  },
  {
    "id": "wq_22_105",
    "level": 22,
    "category": "Maths",
    "question": "In the context of Undergrad Number Theory, which principle defines the core operational boundary?",
    "options": [
      "The Number Theory Theorem",
      "Standard Limit Principle",
      "Derivative Constant",
      "Orthogonal Projection"
    ],
    "correctAnswer": "The Number Theory Theorem"
  },
  {
    "id": "wq_22_106",
    "level": 22,
    "category": "Social Sciences",
    "question": "Which foundational theory in Sociology best explains behavioral shifts in large populations?",
    "options": [
      "Structural Functionalism",
      "Cognitive Dissonance",
      "The Sociology Model",
      "Social Contract Theory"
    ],
    "correctAnswer": "The Sociology Model"
  },
  {
    "id": "wq_22_107",
    "level": 22,
    "category": "Natural Sciences",
    "question": "At an advanced level of Genetics, what is the primary mechanism for state transformation?",
    "options": [
      "Catalytic Conversion",
      "Thermal Degradation",
      "The Genetics Effect",
      "Quantum Tunneling"
    ],
    "correctAnswer": "The Genetics Effect"
  },
  {
    "id": "wq_22_108",
    "level": 22,
    "category": "Politics",
    "question": "Within Political Theory, how is institutional power typically balanced against external pressures?",
    "options": [
      "Proportional Representation",
      "Executive Privilege",
      "The Political Theory Doctrine",
      "Bilateral Treaties"
    ],
    "correctAnswer": "The Political Theory Doctrine"
  },
  {
    "id": "wq_22_109",
    "level": 22,
    "category": "General Knowledge",
    "question": "Which major movement in Classical Literature fundamentally altered the 20th-century landscape?",
    "options": [
      "Post-Structuralism",
      "The Enlightenment",
      "Modernism",
      "The Classical Literature Renaissance"
    ],
    "correctAnswer": "The Classical Literature Renaissance"
  },
  {
    "id": "wq_23_110",
    "level": 23,
    "category": "Maths",
    "question": "In the context of Undergrad Geometry, which principle defines the core operational boundary?",
    "options": [
      "Derivative Constant",
      "Orthogonal Projection",
      "Standard Limit Principle",
      "The Geometry Theorem"
    ],
    "correctAnswer": "The Geometry Theorem"
  },
  {
    "id": "wq_23_111",
    "level": 23,
    "category": "Social Sciences",
    "question": "Which foundational theory in Psychology best explains behavioral shifts in large populations?",
    "options": [
      "Structural Functionalism",
      "Cognitive Dissonance",
      "The Psychology Model",
      "Social Contract Theory"
    ],
    "correctAnswer": "The Psychology Model"
  },
  {
    "id": "wq_23_112",
    "level": 23,
    "category": "Natural Sciences",
    "question": "At an advanced level of Thermodynamics, what is the primary mechanism for state transformation?",
    "options": [
      "Catalytic Conversion",
      "The Thermodynamics Effect",
      "Thermal Degradation",
      "Quantum Tunneling"
    ],
    "correctAnswer": "The Thermodynamics Effect"
  },
  {
    "id": "wq_23_113",
    "level": 23,
    "category": "Politics",
    "question": "Within Public Administration, how is institutional power typically balanced against external pressures?",
    "options": [
      "Proportional Representation",
      "Executive Privilege",
      "The Public Administration Doctrine",
      "Bilateral Treaties"
    ],
    "correctAnswer": "The Public Administration Doctrine"
  },
  {
    "id": "wq_23_114",
    "level": 23,
    "category": "General Knowledge",
    "question": "Which major movement in Philosophy fundamentally altered the 20th-century landscape?",
    "options": [
      "The Philosophy Renaissance",
      "Modernism",
      "The Enlightenment",
      "Post-Structuralism"
    ],
    "correctAnswer": "The Philosophy Renaissance"
  },
  {
    "id": "wq_24_115",
    "level": 24,
    "category": "Maths",
    "question": "In the context of Undergrad Probability, which principle defines the core operational boundary?",
    "options": [
      "Derivative Constant",
      "The Probability Theorem",
      "Orthogonal Projection",
      "Standard Limit Principle"
    ],
    "correctAnswer": "The Probability Theorem"
  },
  {
    "id": "wq_24_116",
    "level": 24,
    "category": "Social Sciences",
    "question": "Which foundational theory in Anthropology best explains behavioral shifts in large populations?",
    "options": [
      "Structural Functionalism",
      "Cognitive Dissonance",
      "Social Contract Theory",
      "The Anthropology Model"
    ],
    "correctAnswer": "The Anthropology Model"
  },
  {
    "id": "wq_24_117",
    "level": 24,
    "category": "Natural Sciences",
    "question": "At an advanced level of Astrophysics, what is the primary mechanism for state transformation?",
    "options": [
      "Catalytic Conversion",
      "The Astrophysics Effect",
      "Thermal Degradation",
      "Quantum Tunneling"
    ],
    "correctAnswer": "The Astrophysics Effect"
  },
  {
    "id": "wq_24_118",
    "level": 24,
    "category": "Politics",
    "question": "Within Public Policy, how is institutional power typically balanced against external pressures?",
    "options": [
      "Executive Privilege",
      "The Public Policy Doctrine",
      "Bilateral Treaties",
      "Proportional Representation"
    ],
    "correctAnswer": "The Public Policy Doctrine"
  },
  {
    "id": "wq_24_119",
    "level": 24,
    "category": "General Knowledge",
    "question": "Which major movement in World Religions fundamentally altered the 20th-century landscape?",
    "options": [
      "The World Religions Renaissance",
      "Modernism",
      "The Enlightenment",
      "Post-Structuralism"
    ],
    "correctAnswer": "The World Religions Renaissance"
  },
  {
    "id": "wq_25_120",
    "level": 25,
    "category": "Maths",
    "question": "In the context of Undergrad Statistics, which principle defines the core operational boundary?",
    "options": [
      "The Statistics Theorem",
      "Standard Limit Principle",
      "Orthogonal Projection",
      "Derivative Constant"
    ],
    "correctAnswer": "The Statistics Theorem"
  },
  {
    "id": "wq_25_121",
    "level": 25,
    "category": "Social Sciences",
    "question": "Which foundational theory in Archaeology best explains behavioral shifts in large populations?",
    "options": [
      "Social Contract Theory",
      "The Archaeology Model",
      "Cognitive Dissonance",
      "Structural Functionalism"
    ],
    "correctAnswer": "The Archaeology Model"
  },
  {
    "id": "wq_25_122",
    "level": 25,
    "category": "Natural Sciences",
    "question": "At an advanced level of Microbiology, what is the primary mechanism for state transformation?",
    "options": [
      "Catalytic Conversion",
      "The Microbiology Effect",
      "Quantum Tunneling",
      "Thermal Degradation"
    ],
    "correctAnswer": "The Microbiology Effect"
  },
  {
    "id": "wq_25_123",
    "level": 25,
    "category": "Politics",
    "question": "Within Political Economy, how is institutional power typically balanced against external pressures?",
    "options": [
      "The Political Economy Doctrine",
      "Proportional Representation",
      "Bilateral Treaties",
      "Executive Privilege"
    ],
    "correctAnswer": "The Political Economy Doctrine"
  },
  {
    "id": "wq_25_124",
    "level": 25,
    "category": "General Knowledge",
    "question": "Which major movement in Music Theory fundamentally altered the 20th-century landscape?",
    "options": [
      "Post-Structuralism",
      "Modernism",
      "The Enlightenment",
      "The Music Theory Renaissance"
    ],
    "correctAnswer": "The Music Theory Renaissance"
  }
];
