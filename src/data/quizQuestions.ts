export interface QuizQuestion {
  id: string;
  category: 'Global Affairs' | 'Economics' | 'Innovation' | 'Culture' | 'Environment';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswer: string;
  hint1: string;
  hint2: string;
  explanation: string;
}

export const quizDatabase: QuizQuestion[] = [
  {
    "id": "q1",
    "category": "Economics",
    "difficulty": "Medium",
    "question": "Sample Question 1 about Economics?",
    "options": [
      "Option A 1",
      "Option B 1",
      "Option C 1",
      "Option D 1"
    ],
    "correctAnswer": "Option A 1",
    "hint1": "Light guidance for question 1.",
    "hint2": "Stronger guidance for question 1.",
    "explanation": "This is the final explanation for question 1."
  },
  {
    "id": "q2",
    "category": "Innovation",
    "difficulty": "Hard",
    "question": "Sample Question 2 about Innovation?",
    "options": [
      "Option A 2",
      "Option B 2",
      "Option C 2",
      "Option D 2"
    ],
    "correctAnswer": "Option A 2",
    "hint1": "Light guidance for question 2.",
    "hint2": "Stronger guidance for question 2.",
    "explanation": "This is the final explanation for question 2."
  },
  {
    "id": "q3",
    "category": "Culture",
    "difficulty": "Easy",
    "question": "Sample Question 3 about Culture?",
    "options": [
      "Option A 3",
      "Option B 3",
      "Option C 3",
      "Option D 3"
    ],
    "correctAnswer": "Option A 3",
    "hint1": "Light guidance for question 3.",
    "hint2": "Stronger guidance for question 3.",
    "explanation": "This is the final explanation for question 3."
  },
  {
    "id": "q4",
    "category": "Environment",
    "difficulty": "Medium",
    "question": "Sample Question 4 about Environment?",
    "options": [
      "Option A 4",
      "Option B 4",
      "Option C 4",
      "Option D 4"
    ],
    "correctAnswer": "Option A 4",
    "hint1": "Light guidance for question 4.",
    "hint2": "Stronger guidance for question 4.",
    "explanation": "This is the final explanation for question 4."
  },
  {
    "id": "q5",
    "category": "Global Affairs",
    "difficulty": "Hard",
    "question": "Sample Question 5 about Global Affairs?",
    "options": [
      "Option A 5",
      "Option B 5",
      "Option C 5",
      "Option D 5"
    ],
    "correctAnswer": "Option A 5",
    "hint1": "Light guidance for question 5.",
    "hint2": "Stronger guidance for question 5.",
    "explanation": "This is the final explanation for question 5."
  },
  {
    "id": "q6",
    "category": "Economics",
    "difficulty": "Easy",
    "question": "Sample Question 6 about Economics?",
    "options": [
      "Option A 6",
      "Option B 6",
      "Option C 6",
      "Option D 6"
    ],
    "correctAnswer": "Option A 6",
    "hint1": "Light guidance for question 6.",
    "hint2": "Stronger guidance for question 6.",
    "explanation": "This is the final explanation for question 6."
  },
  {
    "id": "q7",
    "category": "Innovation",
    "difficulty": "Medium",
    "question": "Sample Question 7 about Innovation?",
    "options": [
      "Option A 7",
      "Option B 7",
      "Option C 7",
      "Option D 7"
    ],
    "correctAnswer": "Option A 7",
    "hint1": "Light guidance for question 7.",
    "hint2": "Stronger guidance for question 7.",
    "explanation": "This is the final explanation for question 7."
  },
  {
    "id": "q8",
    "category": "Culture",
    "difficulty": "Hard",
    "question": "Sample Question 8 about Culture?",
    "options": [
      "Option A 8",
      "Option B 8",
      "Option C 8",
      "Option D 8"
    ],
    "correctAnswer": "Option A 8",
    "hint1": "Light guidance for question 8.",
    "hint2": "Stronger guidance for question 8.",
    "explanation": "This is the final explanation for question 8."
  },
  {
    "id": "q9",
    "category": "Environment",
    "difficulty": "Easy",
    "question": "Sample Question 9 about Environment?",
    "options": [
      "Option A 9",
      "Option B 9",
      "Option C 9",
      "Option D 9"
    ],
    "correctAnswer": "Option A 9",
    "hint1": "Light guidance for question 9.",
    "hint2": "Stronger guidance for question 9.",
    "explanation": "This is the final explanation for question 9."
  },
  {
    "id": "q10",
    "category": "Global Affairs",
    "difficulty": "Medium",
    "question": "Sample Question 10 about Global Affairs?",
    "options": [
      "Option A 10",
      "Option B 10",
      "Option C 10",
      "Option D 10"
    ],
    "correctAnswer": "Option A 10",
    "hint1": "Light guidance for question 10.",
    "hint2": "Stronger guidance for question 10.",
    "explanation": "This is the final explanation for question 10."
  },
  {
    "id": "q11",
    "category": "Economics",
    "difficulty": "Hard",
    "question": "Sample Question 11 about Economics?",
    "options": [
      "Option A 11",
      "Option B 11",
      "Option C 11",
      "Option D 11"
    ],
    "correctAnswer": "Option A 11",
    "hint1": "Light guidance for question 11.",
    "hint2": "Stronger guidance for question 11.",
    "explanation": "This is the final explanation for question 11."
  },
  {
    "id": "q12",
    "category": "Innovation",
    "difficulty": "Easy",
    "question": "Sample Question 12 about Innovation?",
    "options": [
      "Option A 12",
      "Option B 12",
      "Option C 12",
      "Option D 12"
    ],
    "correctAnswer": "Option A 12",
    "hint1": "Light guidance for question 12.",
    "hint2": "Stronger guidance for question 12.",
    "explanation": "This is the final explanation for question 12."
  },
  {
    "id": "q13",
    "category": "Culture",
    "difficulty": "Medium",
    "question": "Sample Question 13 about Culture?",
    "options": [
      "Option A 13",
      "Option B 13",
      "Option C 13",
      "Option D 13"
    ],
    "correctAnswer": "Option A 13",
    "hint1": "Light guidance for question 13.",
    "hint2": "Stronger guidance for question 13.",
    "explanation": "This is the final explanation for question 13."
  },
  {
    "id": "q14",
    "category": "Environment",
    "difficulty": "Hard",
    "question": "Sample Question 14 about Environment?",
    "options": [
      "Option A 14",
      "Option B 14",
      "Option C 14",
      "Option D 14"
    ],
    "correctAnswer": "Option A 14",
    "hint1": "Light guidance for question 14.",
    "hint2": "Stronger guidance for question 14.",
    "explanation": "This is the final explanation for question 14."
  },
  {
    "id": "q15",
    "category": "Global Affairs",
    "difficulty": "Easy",
    "question": "Sample Question 15 about Global Affairs?",
    "options": [
      "Option A 15",
      "Option B 15",
      "Option C 15",
      "Option D 15"
    ],
    "correctAnswer": "Option A 15",
    "hint1": "Light guidance for question 15.",
    "hint2": "Stronger guidance for question 15.",
    "explanation": "This is the final explanation for question 15."
  },
  {
    "id": "q16",
    "category": "Economics",
    "difficulty": "Medium",
    "question": "Sample Question 16 about Economics?",
    "options": [
      "Option A 16",
      "Option B 16",
      "Option C 16",
      "Option D 16"
    ],
    "correctAnswer": "Option A 16",
    "hint1": "Light guidance for question 16.",
    "hint2": "Stronger guidance for question 16.",
    "explanation": "This is the final explanation for question 16."
  },
  {
    "id": "q17",
    "category": "Innovation",
    "difficulty": "Hard",
    "question": "Sample Question 17 about Innovation?",
    "options": [
      "Option A 17",
      "Option B 17",
      "Option C 17",
      "Option D 17"
    ],
    "correctAnswer": "Option A 17",
    "hint1": "Light guidance for question 17.",
    "hint2": "Stronger guidance for question 17.",
    "explanation": "This is the final explanation for question 17."
  },
  {
    "id": "q18",
    "category": "Culture",
    "difficulty": "Easy",
    "question": "Sample Question 18 about Culture?",
    "options": [
      "Option A 18",
      "Option B 18",
      "Option C 18",
      "Option D 18"
    ],
    "correctAnswer": "Option A 18",
    "hint1": "Light guidance for question 18.",
    "hint2": "Stronger guidance for question 18.",
    "explanation": "This is the final explanation for question 18."
  },
  {
    "id": "q19",
    "category": "Environment",
    "difficulty": "Medium",
    "question": "Sample Question 19 about Environment?",
    "options": [
      "Option A 19",
      "Option B 19",
      "Option C 19",
      "Option D 19"
    ],
    "correctAnswer": "Option A 19",
    "hint1": "Light guidance for question 19.",
    "hint2": "Stronger guidance for question 19.",
    "explanation": "This is the final explanation for question 19."
  },
  {
    "id": "q20",
    "category": "Global Affairs",
    "difficulty": "Hard",
    "question": "Sample Question 20 about Global Affairs?",
    "options": [
      "Option A 20",
      "Option B 20",
      "Option C 20",
      "Option D 20"
    ],
    "correctAnswer": "Option A 20",
    "hint1": "Light guidance for question 20.",
    "hint2": "Stronger guidance for question 20.",
    "explanation": "This is the final explanation for question 20."
  },
  {
    "id": "q21",
    "category": "Economics",
    "difficulty": "Easy",
    "question": "Sample Question 21 about Economics?",
    "options": [
      "Option A 21",
      "Option B 21",
      "Option C 21",
      "Option D 21"
    ],
    "correctAnswer": "Option A 21",
    "hint1": "Light guidance for question 21.",
    "hint2": "Stronger guidance for question 21.",
    "explanation": "This is the final explanation for question 21."
  },
  {
    "id": "q22",
    "category": "Innovation",
    "difficulty": "Medium",
    "question": "Sample Question 22 about Innovation?",
    "options": [
      "Option A 22",
      "Option B 22",
      "Option C 22",
      "Option D 22"
    ],
    "correctAnswer": "Option A 22",
    "hint1": "Light guidance for question 22.",
    "hint2": "Stronger guidance for question 22.",
    "explanation": "This is the final explanation for question 22."
  },
  {
    "id": "q23",
    "category": "Culture",
    "difficulty": "Hard",
    "question": "Sample Question 23 about Culture?",
    "options": [
      "Option A 23",
      "Option B 23",
      "Option C 23",
      "Option D 23"
    ],
    "correctAnswer": "Option A 23",
    "hint1": "Light guidance for question 23.",
    "hint2": "Stronger guidance for question 23.",
    "explanation": "This is the final explanation for question 23."
  },
  {
    "id": "q24",
    "category": "Environment",
    "difficulty": "Easy",
    "question": "Sample Question 24 about Environment?",
    "options": [
      "Option A 24",
      "Option B 24",
      "Option C 24",
      "Option D 24"
    ],
    "correctAnswer": "Option A 24",
    "hint1": "Light guidance for question 24.",
    "hint2": "Stronger guidance for question 24.",
    "explanation": "This is the final explanation for question 24."
  },
  {
    "id": "q25",
    "category": "Global Affairs",
    "difficulty": "Medium",
    "question": "Sample Question 25 about Global Affairs?",
    "options": [
      "Option A 25",
      "Option B 25",
      "Option C 25",
      "Option D 25"
    ],
    "correctAnswer": "Option A 25",
    "hint1": "Light guidance for question 25.",
    "hint2": "Stronger guidance for question 25.",
    "explanation": "This is the final explanation for question 25."
  },
  {
    "id": "q26",
    "category": "Economics",
    "difficulty": "Hard",
    "question": "Sample Question 26 about Economics?",
    "options": [
      "Option A 26",
      "Option B 26",
      "Option C 26",
      "Option D 26"
    ],
    "correctAnswer": "Option A 26",
    "hint1": "Light guidance for question 26.",
    "hint2": "Stronger guidance for question 26.",
    "explanation": "This is the final explanation for question 26."
  },
  {
    "id": "q27",
    "category": "Innovation",
    "difficulty": "Easy",
    "question": "Sample Question 27 about Innovation?",
    "options": [
      "Option A 27",
      "Option B 27",
      "Option C 27",
      "Option D 27"
    ],
    "correctAnswer": "Option A 27",
    "hint1": "Light guidance for question 27.",
    "hint2": "Stronger guidance for question 27.",
    "explanation": "This is the final explanation for question 27."
  },
  {
    "id": "q28",
    "category": "Culture",
    "difficulty": "Medium",
    "question": "Sample Question 28 about Culture?",
    "options": [
      "Option A 28",
      "Option B 28",
      "Option C 28",
      "Option D 28"
    ],
    "correctAnswer": "Option A 28",
    "hint1": "Light guidance for question 28.",
    "hint2": "Stronger guidance for question 28.",
    "explanation": "This is the final explanation for question 28."
  },
  {
    "id": "q29",
    "category": "Environment",
    "difficulty": "Hard",
    "question": "Sample Question 29 about Environment?",
    "options": [
      "Option A 29",
      "Option B 29",
      "Option C 29",
      "Option D 29"
    ],
    "correctAnswer": "Option A 29",
    "hint1": "Light guidance for question 29.",
    "hint2": "Stronger guidance for question 29.",
    "explanation": "This is the final explanation for question 29."
  },
  {
    "id": "q30",
    "category": "Global Affairs",
    "difficulty": "Easy",
    "question": "Sample Question 30 about Global Affairs?",
    "options": [
      "Option A 30",
      "Option B 30",
      "Option C 30",
      "Option D 30"
    ],
    "correctAnswer": "Option A 30",
    "hint1": "Light guidance for question 30.",
    "hint2": "Stronger guidance for question 30.",
    "explanation": "This is the final explanation for question 30."
  },
  {
    "id": "q31",
    "category": "Economics",
    "difficulty": "Medium",
    "question": "Sample Question 31 about Economics?",
    "options": [
      "Option A 31",
      "Option B 31",
      "Option C 31",
      "Option D 31"
    ],
    "correctAnswer": "Option A 31",
    "hint1": "Light guidance for question 31.",
    "hint2": "Stronger guidance for question 31.",
    "explanation": "This is the final explanation for question 31."
  },
  {
    "id": "q32",
    "category": "Innovation",
    "difficulty": "Hard",
    "question": "Sample Question 32 about Innovation?",
    "options": [
      "Option A 32",
      "Option B 32",
      "Option C 32",
      "Option D 32"
    ],
    "correctAnswer": "Option A 32",
    "hint1": "Light guidance for question 32.",
    "hint2": "Stronger guidance for question 32.",
    "explanation": "This is the final explanation for question 32."
  },
  {
    "id": "q33",
    "category": "Culture",
    "difficulty": "Easy",
    "question": "Sample Question 33 about Culture?",
    "options": [
      "Option A 33",
      "Option B 33",
      "Option C 33",
      "Option D 33"
    ],
    "correctAnswer": "Option A 33",
    "hint1": "Light guidance for question 33.",
    "hint2": "Stronger guidance for question 33.",
    "explanation": "This is the final explanation for question 33."
  },
  {
    "id": "q34",
    "category": "Environment",
    "difficulty": "Medium",
    "question": "Sample Question 34 about Environment?",
    "options": [
      "Option A 34",
      "Option B 34",
      "Option C 34",
      "Option D 34"
    ],
    "correctAnswer": "Option A 34",
    "hint1": "Light guidance for question 34.",
    "hint2": "Stronger guidance for question 34.",
    "explanation": "This is the final explanation for question 34."
  },
  {
    "id": "q35",
    "category": "Global Affairs",
    "difficulty": "Hard",
    "question": "Sample Question 35 about Global Affairs?",
    "options": [
      "Option A 35",
      "Option B 35",
      "Option C 35",
      "Option D 35"
    ],
    "correctAnswer": "Option A 35",
    "hint1": "Light guidance for question 35.",
    "hint2": "Stronger guidance for question 35.",
    "explanation": "This is the final explanation for question 35."
  },
  {
    "id": "q36",
    "category": "Economics",
    "difficulty": "Easy",
    "question": "Sample Question 36 about Economics?",
    "options": [
      "Option A 36",
      "Option B 36",
      "Option C 36",
      "Option D 36"
    ],
    "correctAnswer": "Option A 36",
    "hint1": "Light guidance for question 36.",
    "hint2": "Stronger guidance for question 36.",
    "explanation": "This is the final explanation for question 36."
  },
  {
    "id": "q37",
    "category": "Innovation",
    "difficulty": "Medium",
    "question": "Sample Question 37 about Innovation?",
    "options": [
      "Option A 37",
      "Option B 37",
      "Option C 37",
      "Option D 37"
    ],
    "correctAnswer": "Option A 37",
    "hint1": "Light guidance for question 37.",
    "hint2": "Stronger guidance for question 37.",
    "explanation": "This is the final explanation for question 37."
  },
  {
    "id": "q38",
    "category": "Culture",
    "difficulty": "Hard",
    "question": "Sample Question 38 about Culture?",
    "options": [
      "Option A 38",
      "Option B 38",
      "Option C 38",
      "Option D 38"
    ],
    "correctAnswer": "Option A 38",
    "hint1": "Light guidance for question 38.",
    "hint2": "Stronger guidance for question 38.",
    "explanation": "This is the final explanation for question 38."
  },
  {
    "id": "q39",
    "category": "Environment",
    "difficulty": "Easy",
    "question": "Sample Question 39 about Environment?",
    "options": [
      "Option A 39",
      "Option B 39",
      "Option C 39",
      "Option D 39"
    ],
    "correctAnswer": "Option A 39",
    "hint1": "Light guidance for question 39.",
    "hint2": "Stronger guidance for question 39.",
    "explanation": "This is the final explanation for question 39."
  },
  {
    "id": "q40",
    "category": "Global Affairs",
    "difficulty": "Medium",
    "question": "Sample Question 40 about Global Affairs?",
    "options": [
      "Option A 40",
      "Option B 40",
      "Option C 40",
      "Option D 40"
    ],
    "correctAnswer": "Option A 40",
    "hint1": "Light guidance for question 40.",
    "hint2": "Stronger guidance for question 40.",
    "explanation": "This is the final explanation for question 40."
  },
  {
    "id": "q41",
    "category": "Economics",
    "difficulty": "Hard",
    "question": "Sample Question 41 about Economics?",
    "options": [
      "Option A 41",
      "Option B 41",
      "Option C 41",
      "Option D 41"
    ],
    "correctAnswer": "Option A 41",
    "hint1": "Light guidance for question 41.",
    "hint2": "Stronger guidance for question 41.",
    "explanation": "This is the final explanation for question 41."
  },
  {
    "id": "q42",
    "category": "Innovation",
    "difficulty": "Easy",
    "question": "Sample Question 42 about Innovation?",
    "options": [
      "Option A 42",
      "Option B 42",
      "Option C 42",
      "Option D 42"
    ],
    "correctAnswer": "Option A 42",
    "hint1": "Light guidance for question 42.",
    "hint2": "Stronger guidance for question 42.",
    "explanation": "This is the final explanation for question 42."
  },
  {
    "id": "q43",
    "category": "Culture",
    "difficulty": "Medium",
    "question": "Sample Question 43 about Culture?",
    "options": [
      "Option A 43",
      "Option B 43",
      "Option C 43",
      "Option D 43"
    ],
    "correctAnswer": "Option A 43",
    "hint1": "Light guidance for question 43.",
    "hint2": "Stronger guidance for question 43.",
    "explanation": "This is the final explanation for question 43."
  },
  {
    "id": "q44",
    "category": "Environment",
    "difficulty": "Hard",
    "question": "Sample Question 44 about Environment?",
    "options": [
      "Option A 44",
      "Option B 44",
      "Option C 44",
      "Option D 44"
    ],
    "correctAnswer": "Option A 44",
    "hint1": "Light guidance for question 44.",
    "hint2": "Stronger guidance for question 44.",
    "explanation": "This is the final explanation for question 44."
  },
  {
    "id": "q45",
    "category": "Global Affairs",
    "difficulty": "Easy",
    "question": "Sample Question 45 about Global Affairs?",
    "options": [
      "Option A 45",
      "Option B 45",
      "Option C 45",
      "Option D 45"
    ],
    "correctAnswer": "Option A 45",
    "hint1": "Light guidance for question 45.",
    "hint2": "Stronger guidance for question 45.",
    "explanation": "This is the final explanation for question 45."
  },
  {
    "id": "q46",
    "category": "Economics",
    "difficulty": "Medium",
    "question": "Sample Question 46 about Economics?",
    "options": [
      "Option A 46",
      "Option B 46",
      "Option C 46",
      "Option D 46"
    ],
    "correctAnswer": "Option A 46",
    "hint1": "Light guidance for question 46.",
    "hint2": "Stronger guidance for question 46.",
    "explanation": "This is the final explanation for question 46."
  },
  {
    "id": "q47",
    "category": "Innovation",
    "difficulty": "Hard",
    "question": "Sample Question 47 about Innovation?",
    "options": [
      "Option A 47",
      "Option B 47",
      "Option C 47",
      "Option D 47"
    ],
    "correctAnswer": "Option A 47",
    "hint1": "Light guidance for question 47.",
    "hint2": "Stronger guidance for question 47.",
    "explanation": "This is the final explanation for question 47."
  },
  {
    "id": "q48",
    "category": "Culture",
    "difficulty": "Easy",
    "question": "Sample Question 48 about Culture?",
    "options": [
      "Option A 48",
      "Option B 48",
      "Option C 48",
      "Option D 48"
    ],
    "correctAnswer": "Option A 48",
    "hint1": "Light guidance for question 48.",
    "hint2": "Stronger guidance for question 48.",
    "explanation": "This is the final explanation for question 48."
  },
  {
    "id": "q49",
    "category": "Environment",
    "difficulty": "Medium",
    "question": "Sample Question 49 about Environment?",
    "options": [
      "Option A 49",
      "Option B 49",
      "Option C 49",
      "Option D 49"
    ],
    "correctAnswer": "Option A 49",
    "hint1": "Light guidance for question 49.",
    "hint2": "Stronger guidance for question 49.",
    "explanation": "This is the final explanation for question 49."
  },
  {
    "id": "q50",
    "category": "Global Affairs",
    "difficulty": "Hard",
    "question": "Sample Question 50 about Global Affairs?",
    "options": [
      "Option A 50",
      "Option B 50",
      "Option C 50",
      "Option D 50"
    ],
    "correctAnswer": "Option A 50",
    "hint1": "Light guidance for question 50.",
    "hint2": "Stronger guidance for question 50.",
    "explanation": "This is the final explanation for question 50."
  },
  {
    "id": "q51",
    "category": "Economics",
    "difficulty": "Easy",
    "question": "Sample Question 51 about Economics?",
    "options": [
      "Option A 51",
      "Option B 51",
      "Option C 51",
      "Option D 51"
    ],
    "correctAnswer": "Option A 51",
    "hint1": "Light guidance for question 51.",
    "hint2": "Stronger guidance for question 51.",
    "explanation": "This is the final explanation for question 51."
  },
  {
    "id": "q52",
    "category": "Innovation",
    "difficulty": "Medium",
    "question": "Sample Question 52 about Innovation?",
    "options": [
      "Option A 52",
      "Option B 52",
      "Option C 52",
      "Option D 52"
    ],
    "correctAnswer": "Option A 52",
    "hint1": "Light guidance for question 52.",
    "hint2": "Stronger guidance for question 52.",
    "explanation": "This is the final explanation for question 52."
  },
  {
    "id": "q53",
    "category": "Culture",
    "difficulty": "Hard",
    "question": "Sample Question 53 about Culture?",
    "options": [
      "Option A 53",
      "Option B 53",
      "Option C 53",
      "Option D 53"
    ],
    "correctAnswer": "Option A 53",
    "hint1": "Light guidance for question 53.",
    "hint2": "Stronger guidance for question 53.",
    "explanation": "This is the final explanation for question 53."
  },
  {
    "id": "q54",
    "category": "Environment",
    "difficulty": "Easy",
    "question": "Sample Question 54 about Environment?",
    "options": [
      "Option A 54",
      "Option B 54",
      "Option C 54",
      "Option D 54"
    ],
    "correctAnswer": "Option A 54",
    "hint1": "Light guidance for question 54.",
    "hint2": "Stronger guidance for question 54.",
    "explanation": "This is the final explanation for question 54."
  },
  {
    "id": "q55",
    "category": "Global Affairs",
    "difficulty": "Medium",
    "question": "Sample Question 55 about Global Affairs?",
    "options": [
      "Option A 55",
      "Option B 55",
      "Option C 55",
      "Option D 55"
    ],
    "correctAnswer": "Option A 55",
    "hint1": "Light guidance for question 55.",
    "hint2": "Stronger guidance for question 55.",
    "explanation": "This is the final explanation for question 55."
  },
  {
    "id": "q56",
    "category": "Economics",
    "difficulty": "Hard",
    "question": "Sample Question 56 about Economics?",
    "options": [
      "Option A 56",
      "Option B 56",
      "Option C 56",
      "Option D 56"
    ],
    "correctAnswer": "Option A 56",
    "hint1": "Light guidance for question 56.",
    "hint2": "Stronger guidance for question 56.",
    "explanation": "This is the final explanation for question 56."
  },
  {
    "id": "q57",
    "category": "Innovation",
    "difficulty": "Easy",
    "question": "Sample Question 57 about Innovation?",
    "options": [
      "Option A 57",
      "Option B 57",
      "Option C 57",
      "Option D 57"
    ],
    "correctAnswer": "Option A 57",
    "hint1": "Light guidance for question 57.",
    "hint2": "Stronger guidance for question 57.",
    "explanation": "This is the final explanation for question 57."
  },
  {
    "id": "q58",
    "category": "Culture",
    "difficulty": "Medium",
    "question": "Sample Question 58 about Culture?",
    "options": [
      "Option A 58",
      "Option B 58",
      "Option C 58",
      "Option D 58"
    ],
    "correctAnswer": "Option A 58",
    "hint1": "Light guidance for question 58.",
    "hint2": "Stronger guidance for question 58.",
    "explanation": "This is the final explanation for question 58."
  },
  {
    "id": "q59",
    "category": "Environment",
    "difficulty": "Hard",
    "question": "Sample Question 59 about Environment?",
    "options": [
      "Option A 59",
      "Option B 59",
      "Option C 59",
      "Option D 59"
    ],
    "correctAnswer": "Option A 59",
    "hint1": "Light guidance for question 59.",
    "hint2": "Stronger guidance for question 59.",
    "explanation": "This is the final explanation for question 59."
  },
  {
    "id": "q60",
    "category": "Global Affairs",
    "difficulty": "Easy",
    "question": "Sample Question 60 about Global Affairs?",
    "options": [
      "Option A 60",
      "Option B 60",
      "Option C 60",
      "Option D 60"
    ],
    "correctAnswer": "Option A 60",
    "hint1": "Light guidance for question 60.",
    "hint2": "Stronger guidance for question 60.",
    "explanation": "This is the final explanation for question 60."
  },
  {
    "id": "q61",
    "category": "Economics",
    "difficulty": "Medium",
    "question": "Sample Question 61 about Economics?",
    "options": [
      "Option A 61",
      "Option B 61",
      "Option C 61",
      "Option D 61"
    ],
    "correctAnswer": "Option A 61",
    "hint1": "Light guidance for question 61.",
    "hint2": "Stronger guidance for question 61.",
    "explanation": "This is the final explanation for question 61."
  },
  {
    "id": "q62",
    "category": "Innovation",
    "difficulty": "Hard",
    "question": "Sample Question 62 about Innovation?",
    "options": [
      "Option A 62",
      "Option B 62",
      "Option C 62",
      "Option D 62"
    ],
    "correctAnswer": "Option A 62",
    "hint1": "Light guidance for question 62.",
    "hint2": "Stronger guidance for question 62.",
    "explanation": "This is the final explanation for question 62."
  },
  {
    "id": "q63",
    "category": "Culture",
    "difficulty": "Easy",
    "question": "Sample Question 63 about Culture?",
    "options": [
      "Option A 63",
      "Option B 63",
      "Option C 63",
      "Option D 63"
    ],
    "correctAnswer": "Option A 63",
    "hint1": "Light guidance for question 63.",
    "hint2": "Stronger guidance for question 63.",
    "explanation": "This is the final explanation for question 63."
  },
  {
    "id": "q64",
    "category": "Environment",
    "difficulty": "Medium",
    "question": "Sample Question 64 about Environment?",
    "options": [
      "Option A 64",
      "Option B 64",
      "Option C 64",
      "Option D 64"
    ],
    "correctAnswer": "Option A 64",
    "hint1": "Light guidance for question 64.",
    "hint2": "Stronger guidance for question 64.",
    "explanation": "This is the final explanation for question 64."
  },
  {
    "id": "q65",
    "category": "Global Affairs",
    "difficulty": "Hard",
    "question": "Sample Question 65 about Global Affairs?",
    "options": [
      "Option A 65",
      "Option B 65",
      "Option C 65",
      "Option D 65"
    ],
    "correctAnswer": "Option A 65",
    "hint1": "Light guidance for question 65.",
    "hint2": "Stronger guidance for question 65.",
    "explanation": "This is the final explanation for question 65."
  },
  {
    "id": "q66",
    "category": "Economics",
    "difficulty": "Easy",
    "question": "Sample Question 66 about Economics?",
    "options": [
      "Option A 66",
      "Option B 66",
      "Option C 66",
      "Option D 66"
    ],
    "correctAnswer": "Option A 66",
    "hint1": "Light guidance for question 66.",
    "hint2": "Stronger guidance for question 66.",
    "explanation": "This is the final explanation for question 66."
  },
  {
    "id": "q67",
    "category": "Innovation",
    "difficulty": "Medium",
    "question": "Sample Question 67 about Innovation?",
    "options": [
      "Option A 67",
      "Option B 67",
      "Option C 67",
      "Option D 67"
    ],
    "correctAnswer": "Option A 67",
    "hint1": "Light guidance for question 67.",
    "hint2": "Stronger guidance for question 67.",
    "explanation": "This is the final explanation for question 67."
  },
  {
    "id": "q68",
    "category": "Culture",
    "difficulty": "Hard",
    "question": "Sample Question 68 about Culture?",
    "options": [
      "Option A 68",
      "Option B 68",
      "Option C 68",
      "Option D 68"
    ],
    "correctAnswer": "Option A 68",
    "hint1": "Light guidance for question 68.",
    "hint2": "Stronger guidance for question 68.",
    "explanation": "This is the final explanation for question 68."
  },
  {
    "id": "q69",
    "category": "Environment",
    "difficulty": "Easy",
    "question": "Sample Question 69 about Environment?",
    "options": [
      "Option A 69",
      "Option B 69",
      "Option C 69",
      "Option D 69"
    ],
    "correctAnswer": "Option A 69",
    "hint1": "Light guidance for question 69.",
    "hint2": "Stronger guidance for question 69.",
    "explanation": "This is the final explanation for question 69."
  },
  {
    "id": "q70",
    "category": "Global Affairs",
    "difficulty": "Medium",
    "question": "Sample Question 70 about Global Affairs?",
    "options": [
      "Option A 70",
      "Option B 70",
      "Option C 70",
      "Option D 70"
    ],
    "correctAnswer": "Option A 70",
    "hint1": "Light guidance for question 70.",
    "hint2": "Stronger guidance for question 70.",
    "explanation": "This is the final explanation for question 70."
  },
  {
    "id": "q71",
    "category": "Economics",
    "difficulty": "Hard",
    "question": "Sample Question 71 about Economics?",
    "options": [
      "Option A 71",
      "Option B 71",
      "Option C 71",
      "Option D 71"
    ],
    "correctAnswer": "Option A 71",
    "hint1": "Light guidance for question 71.",
    "hint2": "Stronger guidance for question 71.",
    "explanation": "This is the final explanation for question 71."
  },
  {
    "id": "q72",
    "category": "Innovation",
    "difficulty": "Easy",
    "question": "Sample Question 72 about Innovation?",
    "options": [
      "Option A 72",
      "Option B 72",
      "Option C 72",
      "Option D 72"
    ],
    "correctAnswer": "Option A 72",
    "hint1": "Light guidance for question 72.",
    "hint2": "Stronger guidance for question 72.",
    "explanation": "This is the final explanation for question 72."
  },
  {
    "id": "q73",
    "category": "Culture",
    "difficulty": "Medium",
    "question": "Sample Question 73 about Culture?",
    "options": [
      "Option A 73",
      "Option B 73",
      "Option C 73",
      "Option D 73"
    ],
    "correctAnswer": "Option A 73",
    "hint1": "Light guidance for question 73.",
    "hint2": "Stronger guidance for question 73.",
    "explanation": "This is the final explanation for question 73."
  },
  {
    "id": "q74",
    "category": "Environment",
    "difficulty": "Hard",
    "question": "Sample Question 74 about Environment?",
    "options": [
      "Option A 74",
      "Option B 74",
      "Option C 74",
      "Option D 74"
    ],
    "correctAnswer": "Option A 74",
    "hint1": "Light guidance for question 74.",
    "hint2": "Stronger guidance for question 74.",
    "explanation": "This is the final explanation for question 74."
  },
  {
    "id": "q75",
    "category": "Global Affairs",
    "difficulty": "Easy",
    "question": "Sample Question 75 about Global Affairs?",
    "options": [
      "Option A 75",
      "Option B 75",
      "Option C 75",
      "Option D 75"
    ],
    "correctAnswer": "Option A 75",
    "hint1": "Light guidance for question 75.",
    "hint2": "Stronger guidance for question 75.",
    "explanation": "This is the final explanation for question 75."
  },
  {
    "id": "q76",
    "category": "Economics",
    "difficulty": "Medium",
    "question": "Sample Question 76 about Economics?",
    "options": [
      "Option A 76",
      "Option B 76",
      "Option C 76",
      "Option D 76"
    ],
    "correctAnswer": "Option A 76",
    "hint1": "Light guidance for question 76.",
    "hint2": "Stronger guidance for question 76.",
    "explanation": "This is the final explanation for question 76."
  },
  {
    "id": "q77",
    "category": "Innovation",
    "difficulty": "Hard",
    "question": "Sample Question 77 about Innovation?",
    "options": [
      "Option A 77",
      "Option B 77",
      "Option C 77",
      "Option D 77"
    ],
    "correctAnswer": "Option A 77",
    "hint1": "Light guidance for question 77.",
    "hint2": "Stronger guidance for question 77.",
    "explanation": "This is the final explanation for question 77."
  },
  {
    "id": "q78",
    "category": "Culture",
    "difficulty": "Easy",
    "question": "Sample Question 78 about Culture?",
    "options": [
      "Option A 78",
      "Option B 78",
      "Option C 78",
      "Option D 78"
    ],
    "correctAnswer": "Option A 78",
    "hint1": "Light guidance for question 78.",
    "hint2": "Stronger guidance for question 78.",
    "explanation": "This is the final explanation for question 78."
  },
  {
    "id": "q79",
    "category": "Environment",
    "difficulty": "Medium",
    "question": "Sample Question 79 about Environment?",
    "options": [
      "Option A 79",
      "Option B 79",
      "Option C 79",
      "Option D 79"
    ],
    "correctAnswer": "Option A 79",
    "hint1": "Light guidance for question 79.",
    "hint2": "Stronger guidance for question 79.",
    "explanation": "This is the final explanation for question 79."
  },
  {
    "id": "q80",
    "category": "Global Affairs",
    "difficulty": "Hard",
    "question": "Sample Question 80 about Global Affairs?",
    "options": [
      "Option A 80",
      "Option B 80",
      "Option C 80",
      "Option D 80"
    ],
    "correctAnswer": "Option A 80",
    "hint1": "Light guidance for question 80.",
    "hint2": "Stronger guidance for question 80.",
    "explanation": "This is the final explanation for question 80."
  },
  {
    "id": "q81",
    "category": "Economics",
    "difficulty": "Easy",
    "question": "Sample Question 81 about Economics?",
    "options": [
      "Option A 81",
      "Option B 81",
      "Option C 81",
      "Option D 81"
    ],
    "correctAnswer": "Option A 81",
    "hint1": "Light guidance for question 81.",
    "hint2": "Stronger guidance for question 81.",
    "explanation": "This is the final explanation for question 81."
  },
  {
    "id": "q82",
    "category": "Innovation",
    "difficulty": "Medium",
    "question": "Sample Question 82 about Innovation?",
    "options": [
      "Option A 82",
      "Option B 82",
      "Option C 82",
      "Option D 82"
    ],
    "correctAnswer": "Option A 82",
    "hint1": "Light guidance for question 82.",
    "hint2": "Stronger guidance for question 82.",
    "explanation": "This is the final explanation for question 82."
  },
  {
    "id": "q83",
    "category": "Culture",
    "difficulty": "Hard",
    "question": "Sample Question 83 about Culture?",
    "options": [
      "Option A 83",
      "Option B 83",
      "Option C 83",
      "Option D 83"
    ],
    "correctAnswer": "Option A 83",
    "hint1": "Light guidance for question 83.",
    "hint2": "Stronger guidance for question 83.",
    "explanation": "This is the final explanation for question 83."
  },
  {
    "id": "q84",
    "category": "Environment",
    "difficulty": "Easy",
    "question": "Sample Question 84 about Environment?",
    "options": [
      "Option A 84",
      "Option B 84",
      "Option C 84",
      "Option D 84"
    ],
    "correctAnswer": "Option A 84",
    "hint1": "Light guidance for question 84.",
    "hint2": "Stronger guidance for question 84.",
    "explanation": "This is the final explanation for question 84."
  },
  {
    "id": "q85",
    "category": "Global Affairs",
    "difficulty": "Medium",
    "question": "Sample Question 85 about Global Affairs?",
    "options": [
      "Option A 85",
      "Option B 85",
      "Option C 85",
      "Option D 85"
    ],
    "correctAnswer": "Option A 85",
    "hint1": "Light guidance for question 85.",
    "hint2": "Stronger guidance for question 85.",
    "explanation": "This is the final explanation for question 85."
  },
  {
    "id": "q86",
    "category": "Economics",
    "difficulty": "Hard",
    "question": "Sample Question 86 about Economics?",
    "options": [
      "Option A 86",
      "Option B 86",
      "Option C 86",
      "Option D 86"
    ],
    "correctAnswer": "Option A 86",
    "hint1": "Light guidance for question 86.",
    "hint2": "Stronger guidance for question 86.",
    "explanation": "This is the final explanation for question 86."
  },
  {
    "id": "q87",
    "category": "Innovation",
    "difficulty": "Easy",
    "question": "Sample Question 87 about Innovation?",
    "options": [
      "Option A 87",
      "Option B 87",
      "Option C 87",
      "Option D 87"
    ],
    "correctAnswer": "Option A 87",
    "hint1": "Light guidance for question 87.",
    "hint2": "Stronger guidance for question 87.",
    "explanation": "This is the final explanation for question 87."
  },
  {
    "id": "q88",
    "category": "Culture",
    "difficulty": "Medium",
    "question": "Sample Question 88 about Culture?",
    "options": [
      "Option A 88",
      "Option B 88",
      "Option C 88",
      "Option D 88"
    ],
    "correctAnswer": "Option A 88",
    "hint1": "Light guidance for question 88.",
    "hint2": "Stronger guidance for question 88.",
    "explanation": "This is the final explanation for question 88."
  },
  {
    "id": "q89",
    "category": "Environment",
    "difficulty": "Hard",
    "question": "Sample Question 89 about Environment?",
    "options": [
      "Option A 89",
      "Option B 89",
      "Option C 89",
      "Option D 89"
    ],
    "correctAnswer": "Option A 89",
    "hint1": "Light guidance for question 89.",
    "hint2": "Stronger guidance for question 89.",
    "explanation": "This is the final explanation for question 89."
  },
  {
    "id": "q90",
    "category": "Global Affairs",
    "difficulty": "Easy",
    "question": "Sample Question 90 about Global Affairs?",
    "options": [
      "Option A 90",
      "Option B 90",
      "Option C 90",
      "Option D 90"
    ],
    "correctAnswer": "Option A 90",
    "hint1": "Light guidance for question 90.",
    "hint2": "Stronger guidance for question 90.",
    "explanation": "This is the final explanation for question 90."
  },
  {
    "id": "q91",
    "category": "Economics",
    "difficulty": "Medium",
    "question": "Sample Question 91 about Economics?",
    "options": [
      "Option A 91",
      "Option B 91",
      "Option C 91",
      "Option D 91"
    ],
    "correctAnswer": "Option A 91",
    "hint1": "Light guidance for question 91.",
    "hint2": "Stronger guidance for question 91.",
    "explanation": "This is the final explanation for question 91."
  },
  {
    "id": "q92",
    "category": "Innovation",
    "difficulty": "Hard",
    "question": "Sample Question 92 about Innovation?",
    "options": [
      "Option A 92",
      "Option B 92",
      "Option C 92",
      "Option D 92"
    ],
    "correctAnswer": "Option A 92",
    "hint1": "Light guidance for question 92.",
    "hint2": "Stronger guidance for question 92.",
    "explanation": "This is the final explanation for question 92."
  },
  {
    "id": "q93",
    "category": "Culture",
    "difficulty": "Easy",
    "question": "Sample Question 93 about Culture?",
    "options": [
      "Option A 93",
      "Option B 93",
      "Option C 93",
      "Option D 93"
    ],
    "correctAnswer": "Option A 93",
    "hint1": "Light guidance for question 93.",
    "hint2": "Stronger guidance for question 93.",
    "explanation": "This is the final explanation for question 93."
  },
  {
    "id": "q94",
    "category": "Environment",
    "difficulty": "Medium",
    "question": "Sample Question 94 about Environment?",
    "options": [
      "Option A 94",
      "Option B 94",
      "Option C 94",
      "Option D 94"
    ],
    "correctAnswer": "Option A 94",
    "hint1": "Light guidance for question 94.",
    "hint2": "Stronger guidance for question 94.",
    "explanation": "This is the final explanation for question 94."
  },
  {
    "id": "q95",
    "category": "Global Affairs",
    "difficulty": "Hard",
    "question": "Sample Question 95 about Global Affairs?",
    "options": [
      "Option A 95",
      "Option B 95",
      "Option C 95",
      "Option D 95"
    ],
    "correctAnswer": "Option A 95",
    "hint1": "Light guidance for question 95.",
    "hint2": "Stronger guidance for question 95.",
    "explanation": "This is the final explanation for question 95."
  },
  {
    "id": "q96",
    "category": "Economics",
    "difficulty": "Easy",
    "question": "Sample Question 96 about Economics?",
    "options": [
      "Option A 96",
      "Option B 96",
      "Option C 96",
      "Option D 96"
    ],
    "correctAnswer": "Option A 96",
    "hint1": "Light guidance for question 96.",
    "hint2": "Stronger guidance for question 96.",
    "explanation": "This is the final explanation for question 96."
  },
  {
    "id": "q97",
    "category": "Innovation",
    "difficulty": "Medium",
    "question": "Sample Question 97 about Innovation?",
    "options": [
      "Option A 97",
      "Option B 97",
      "Option C 97",
      "Option D 97"
    ],
    "correctAnswer": "Option A 97",
    "hint1": "Light guidance for question 97.",
    "hint2": "Stronger guidance for question 97.",
    "explanation": "This is the final explanation for question 97."
  },
  {
    "id": "q98",
    "category": "Culture",
    "difficulty": "Hard",
    "question": "Sample Question 98 about Culture?",
    "options": [
      "Option A 98",
      "Option B 98",
      "Option C 98",
      "Option D 98"
    ],
    "correctAnswer": "Option A 98",
    "hint1": "Light guidance for question 98.",
    "hint2": "Stronger guidance for question 98.",
    "explanation": "This is the final explanation for question 98."
  },
  {
    "id": "q99",
    "category": "Environment",
    "difficulty": "Easy",
    "question": "Sample Question 99 about Environment?",
    "options": [
      "Option A 99",
      "Option B 99",
      "Option C 99",
      "Option D 99"
    ],
    "correctAnswer": "Option A 99",
    "hint1": "Light guidance for question 99.",
    "hint2": "Stronger guidance for question 99.",
    "explanation": "This is the final explanation for question 99."
  },
  {
    "id": "q100",
    "category": "Global Affairs",
    "difficulty": "Medium",
    "question": "Sample Question 100 about Global Affairs?",
    "options": [
      "Option A 100",
      "Option B 100",
      "Option C 100",
      "Option D 100"
    ],
    "correctAnswer": "Option A 100",
    "hint1": "Light guidance for question 100.",
    "hint2": "Stronger guidance for question 100.",
    "explanation": "This is the final explanation for question 100."
  }
];
