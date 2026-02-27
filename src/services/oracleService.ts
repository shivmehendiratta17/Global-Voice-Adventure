import { GoogleGenAI } from '@google/genai';

class OracleService {
  private ai: any;

  constructor() {
    // In a real app, this would be a backend call to protect the key.
    // For this MVP, we use the injected key.
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey: apiKey as string });
    }
  }

  async getHint(gameContext: string, currentQuestion?: string): Promise<string> {
    if (!this.ai) return "Oracle connection offline. API key missing.";
    
    try {
      const prompt = `
        You are The Oracle, an advanced AI assistant for a strategic intelligence game called Global Voice Adventure.
        The player is currently in the module: ${gameContext}.
        ${currentQuestion ? `The current challenge/question is: "${currentQuestion}"` : ''}
        
        Provide a subtle, cryptic, but helpful hint. DO NOT give the direct answer.
        Keep it under 2 sentences. Sound intelligent, mysterious, and executive.
      `;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      return response.text || "The signals are unclear. Trust your instincts.";
    } catch (error) {
      console.error("Oracle Hint Error:", error);
      return "The connection to the Oracle has been disrupted. Proceed with caution.";
    }
  }

  async getPostGameAnalysis(gameId: string, score: number, metrics: any): Promise<string> {
    if (!this.ai) return "Oracle connection offline. API key missing.";

    try {
      const prompt = `
        You are The Oracle, an advanced AI analyst for a strategic intelligence game called Global Voice Adventure.
        The player just completed a session of ${gameId}.
        Their score was ${score}.
        Their performance metrics were: ${JSON.stringify(metrics)}.
        
        Provide a brief post-session analysis (max 3 short paragraphs).
        Include:
        1. A performance summary.
        2. Strategic weakness insights based on the metrics.
        3. Improvement suggestions and cognitive pattern feedback.
        
        Tone: Intelligent, calm, insightful, executive. Avoid dramatic language.
      `;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      return response.text || "Analysis complete. Your performance has been logged.";
    } catch (error) {
      console.error("Oracle Analysis Error:", error);
      return "Unable to generate post-game analysis at this time.";
    }
  }
}

export const oracleService = new OracleService();
