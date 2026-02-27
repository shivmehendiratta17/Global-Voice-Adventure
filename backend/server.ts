import express from 'express';
import cors from 'cors';
import { gameRoutes } from './routes/gameRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/games', gameRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Global Voice Adventure API v1.0' });
});

if (process.env.NODE_ENV !== 'production') {
  // In dev, Vite handles the frontend.
  app.listen(PORT, () => {
    console.log(`Enterprise API running on port ${PORT}`);
  });
}

export default app;
