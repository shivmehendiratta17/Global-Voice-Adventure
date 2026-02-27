import { Router } from 'express';
import { getGameData, submitGameScore } from '../controllers/gameController.js';

export const gameRoutes = Router();

gameRoutes.get('/:gameId', getGameData);
gameRoutes.post('/:gameId/score', submitGameScore);
