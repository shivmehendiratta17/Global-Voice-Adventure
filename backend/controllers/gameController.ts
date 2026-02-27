import { Request, Response } from 'express';
import { fetchGameConfig, saveScore } from '../services/gameService.js';

export const getGameData = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const data = await fetchGameConfig(gameId);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitGameScore = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const { userId, score, metrics } = req.body;
    const result = await saveScore(gameId, userId, score, metrics);
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
