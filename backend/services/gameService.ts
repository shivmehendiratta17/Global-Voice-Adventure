// Mock Database Abstraction Layer
export const fetchGameConfig = async (gameId: string) => {
  return {
    id: gameId,
    title: `Game Configuration for ${gameId}`,
    difficulty: 'adaptive',
    maxScore: 10000
  };
};

export const saveScore = async (gameId: string, userId: string, score: number, metrics: any) => {
  return {
    gameId,
    userId,
    score,
    metrics,
    timestamp: new Date().toISOString()
  };
};
