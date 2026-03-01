import { GoogleGenAI, Type } from "@google/genai";
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateQuestions(difficulty: string, count: number) {
  const prompt = `Generate ${count} unique trivia questions for a game called Mind Duel.
  The difficulty should be ${difficulty}.
  Return a JSON array of objects with the following structure:
  {
    "question": "The question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "The correct option text"
  }
  Ensure the options are distinct and the correct answer is exactly one of the options.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer"]
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
}

async function main() {
  console.log("Generating Easy questions...");
  const easy = await generateQuestions("Easy/General Knowledge", 100);
  console.log("Generating Medium questions...");
  const medium = await generateQuestions("Medium/Logic & Strategy", 150);
  console.log("Generating Hard questions...");
  const hard = await generateQuestions("Hard/Advanced Analytics", 150);
  console.log("Generating Expert questions...");
  const expert = await generateQuestions("Expert/Abstract Reasoning", 100);

  const allQuestions = [...easy, ...medium, ...hard, ...expert];
  
  let content = `export interface DuelQuestionV2 {
  id: string;
  level: number;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
}

export const duelDatabaseV2: DuelQuestionV2[] = [
`;

  let idCounter = 1;
  let qIndex = 0;

  for (let level = 1; level <= 100; level++) {
    let difficulty = 'Easy';
    if (level >= 21 && level <= 50) difficulty = 'Medium';
    else if (level >= 51 && level <= 80) difficulty = 'Hard';
    else if (level >= 81 && level <= 100) difficulty = 'Expert';

    for (let i = 0; i < 5; i++) {
      const q = allQuestions[qIndex++];
      if (!q) break;
      content += `  {
    id: "d2_${idCounter++}",
    level: ${level},
    question: ${JSON.stringify(q.question)},
    options: ${JSON.stringify(q.options)},
    correctAnswer: ${JSON.stringify(q.correctAnswer)},
    difficulty: "${difficulty}" as any
  },\n`;
    }
  }

  content += `];\n`;

  fs.writeFileSync('src/data/duelQuestionsV2.ts', content);
  console.log("Done!");
}

main();
