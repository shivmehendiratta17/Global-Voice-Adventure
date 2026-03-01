import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const db = new Database('game_data.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    keyHash TEXT NOT NULL,
    totalXP INTEGER DEFAULT 0,
    rank TEXT DEFAULT 'Novice Scholar',
    highestRoundUnlocked INTEGER DEFAULT 1,
    highestRecallLevelUnlocked INTEGER DEFAULT 1,
    highestSignalLevelUnlocked INTEGER DEFAULT 1,
    highestDuelLevelUnlocked INTEGER DEFAULT 1,
    lastPlayedRound INTEGER DEFAULT 1,
    totalQuestionsAnswered INTEGER DEFAULT 0,
    correctAnswers INTEGER DEFAULT 0,
    totalResponseTime INTEGER DEFAULT 0,
    highestStreak INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    gameId TEXT,
    score INTEGER,
    metrics TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(username) REFERENCES users(username)
  );

  CREATE TABLE IF NOT EXISTS achievements (
    username TEXT,
    achievementId TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(username, achievementId),
    FOREIGN KEY(username) REFERENCES users(username)
  );

  CREATE TABLE IF NOT EXISTS round_plays (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    game TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(username) REFERENCES users(username)
  );

  CREATE TABLE IF NOT EXISTS crisis_command_state (
    username TEXT PRIMARY KEY,
    current_year INTEGER DEFAULT 1,
    years_played_current_batch INTEGER DEFAULT 0,
    lockout_until DATETIME DEFAULT NULL,
    stability INTEGER DEFAULT 50,
    economy INTEGER DEFAULT 50,
    trust INTEGER DEFAULT 50,
    relations INTEGER DEFAULT 50,
    FOREIGN KEY(username) REFERENCES users(username)
  );
`);

try {
  db.exec('ALTER TABLE users ADD COLUMN highestRecallLevelUnlocked INTEGER DEFAULT 1;');
} catch (e) {
  // Column might already exist
}

try {
  db.exec('ALTER TABLE users ADD COLUMN highestSignalLevelUnlocked INTEGER DEFAULT 1;');
} catch (e) {
  // Column might already exist
}

try {
  db.exec('ALTER TABLE users ADD COLUMN highestDuelLevelUnlocked INTEGER DEFAULT 1;');
} catch (e) {
  // Column might already exist
}

const getRankFromXP = (xp: number): string => {
  if (xp < 1000) return "Novice Scholar";
  if (xp < 2500) return "Emerging Strategist";
  if (xp < 5000) return "Global Thinker";
  if (xp < 8000) return "Intellectual Vanguard";
  if (xp < 12000) return "Elite Diplomat";
  return "Grandmaster of Global Voice";
};

// API Routes
app.post('/api/auth/register', (req, res) => {
  const { username, keyHash } = req.body;
  if (!username || !keyHash) return res.status(400).json({ error: 'Missing credentials' });

  try {
    const stmt = db.prepare('INSERT INTO users (username, keyHash) VALUES (?, ?)');
    stmt.run(username, keyHash);
    
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    res.json({ user });
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
      res.status(400).json({ error: 'Username already taken.' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.post('/api/auth/login', (req, res) => {
  const { username, keyHash } = req.body;
  if (!username || !keyHash) return res.status(400).json({ error: 'Missing credentials' });

  try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
    if (!user) {
      return res.status(404).json({ error: 'Account not found.' });
    }
    if (user.keyHash !== keyHash) {
      return res.status(401).json({ error: 'Incorrect secret key.' });
    }
    
    // Fetch achievements
    const achievements = db.prepare('SELECT achievementId FROM achievements WHERE username = ?').all(username).map((a: any) => a.achievementId);
    user.achievements = achievements;

    res.json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/score', (req, res) => {
  const { username, gameId, score, metrics } = req.body;
  if (!username || !gameId || score === undefined) return res.status(400).json({ error: 'Missing data' });

  try {
    // Validate score server-side
    if (typeof score !== 'number') {
      return res.status(400).json({ error: 'Invalid score' });
    }

    // Insert score
    const insertScore = db.prepare('INSERT INTO scores (username, gameId, score, metrics) VALUES (?, ?, ?, ?)');
    insertScore.run(username, gameId, score, JSON.stringify(metrics || {}));

    // Update user stats
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
    if (user) {
      const newXp = Math.max(0, user.totalXP + score);
      const newRank = getRankFromXP(newXp);
      const newTotalQuestions = user.totalQuestionsAnswered + 1;
      const newCorrectAnswers = user.correctAnswers + (score > 0 ? 1 : 0);

      const updateUser = db.prepare(`
        UPDATE users 
        SET totalXP = ?, rank = ?, totalQuestionsAnswered = ?, correctAnswers = ?
        WHERE username = ?
      `);
      updateUser.run(newXp, newRank, newTotalQuestions, newCorrectAnswers, username);
      
      const updatedUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
      const achievements = db.prepare('SELECT achievementId FROM achievements WHERE username = ?').all(username).map((a: any) => a.achievementId);
      updatedUser.achievements = achievements;

      res.json({ success: true, user: updatedUser });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/achievements', (req, res) => {
  const { username, achievementId } = req.body;
  if (!username || !achievementId) return res.status(400).json({ error: 'Missing data' });

  try {
    const stmt = db.prepare('INSERT OR IGNORE INTO achievements (username, achievementId) VALUES (?, ?)');
    stmt.run(username, achievementId);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/progress', (req, res) => {
  const { username, updates } = req.body;
  if (!username || !updates) return res.status(400).json({ error: 'Missing data' });

  try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
    if (user) {
      const setClauses = [];
      const values = [];
      
      if (updates.highestRoundUnlocked !== undefined) {
        setClauses.push('highestRoundUnlocked = ?');
        values.push(updates.highestRoundUnlocked);
      }
      if (updates.highestRecallLevelUnlocked !== undefined) {
        setClauses.push('highestRecallLevelUnlocked = ?');
        values.push(updates.highestRecallLevelUnlocked);
      }
      if (updates.highestSignalLevelUnlocked !== undefined) {
        setClauses.push('highestSignalLevelUnlocked = ?');
        values.push(updates.highestSignalLevelUnlocked);
      }
      if (updates.highestDuelLevelUnlocked !== undefined) {
        setClauses.push('highestDuelLevelUnlocked = ?');
        values.push(updates.highestDuelLevelUnlocked);
      }
      if (updates.lastPlayedRound !== undefined) {
        setClauses.push('lastPlayedRound = ?');
        values.push(updates.lastPlayedRound);
      }
      
      if (setClauses.length > 0) {
        values.push(username);
        const stmt = db.prepare(`UPDATE users SET ${setClauses.join(', ')} WHERE username = ?`);
        stmt.run(...values);
      }
      
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/wager/check-limit', (req, res) => {
  const { username } = req.body;
  const game = req.query.game as string || 'default';
  if (!username) return res.status(400).json({ error: 'Missing username' });

  try {
    let limitCount = 3;
    let limitTimeMs = 7 * 60 * 1000; // 7 mins default

    if (game === 'quiz') {
      limitCount = 3;
      limitTimeMs = 10 * 60 * 1000; // 10 mins
    } else if (game === 'recall') {
      limitCount = 3;
      limitTimeMs = 10 * 60 * 1000; // 10 mins
    } else if (game === 'signal') {
      limitCount = 10;
      limitTimeMs = 30 * 60 * 1000; // 30 mins
    }

    const limitTimeStr = new Date(Date.now() - limitTimeMs).toISOString().replace('T', ' ').replace('Z', '');

    const recentPlays = db.prepare(`
      SELECT COUNT(*) as count, 
             (strftime('%s', MIN(timestamp)) * 1000) as oldest_ms 
      FROM round_plays 
      WHERE username = ? AND game = ? AND timestamp > ?
    `).get(username, game, limitTimeStr) as any;
    
    if (recentPlays.count >= limitCount) {
      const nowMs = Date.now();
      const timeToWait = (recentPlays.oldest_ms + limitTimeMs) - nowMs;
      return res.json({ allowed: false, timeRemaining: Math.max(0, timeToWait) });
    }
    
    res.json({ allowed: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/wager/start-round', (req, res) => {
  const { username } = req.body;
  const game = req.query.game as string || 'default';
  if (!username) return res.status(400).json({ error: 'Missing username' });

  try {
    let limitCount = 3;
    let limitTimeMs = 7 * 60 * 1000;

    if (game === 'quiz') {
      limitCount = 3;
      limitTimeMs = 10 * 60 * 1000;
    } else if (game === 'recall') {
      limitCount = 3;
      limitTimeMs = 10 * 60 * 1000;
    } else if (game === 'signal') {
      limitCount = 10;
      limitTimeMs = 30 * 60 * 1000;
    }

    const limitTimeStr = new Date(Date.now() - limitTimeMs).toISOString().replace('T', ' ').replace('Z', '');

    const recentPlays = db.prepare(`
      SELECT COUNT(*) as count 
      FROM round_plays 
      WHERE username = ? AND game = ? AND timestamp > ?
    `).get(username, game, limitTimeStr) as any;
    
    if (recentPlays.count >= limitCount) {
      return res.status(429).json({ error: 'Play limit reached' });
    }
    
    const stmt = db.prepare('INSERT INTO round_plays (username, game) VALUES (?, ?)');
    stmt.run(username, game);
    
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/crisis/state', (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Missing username' });

  try {
    let state = db.prepare('SELECT * FROM crisis_command_state WHERE username = ?').get(username) as any;
    if (!state) {
      const stmt = db.prepare('INSERT INTO crisis_command_state (username) VALUES (?)');
      stmt.run(username);
      state = db.prepare('SELECT * FROM crisis_command_state WHERE username = ?').get(username);
    }

    // Check if lockout has expired
    if (state.lockout_until && new Date(state.lockout_until).getTime() <= Date.now()) {
      const stmt = db.prepare('UPDATE crisis_command_state SET lockout_until = NULL, years_played_current_batch = 0 WHERE username = ?');
      stmt.run(username);
      state.lockout_until = null;
      state.years_played_current_batch = 0;
    }

    res.json({ state });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/crisis/play-year', (req, res) => {
  const { username, impact } = req.body;
  if (!username || !impact) return res.status(400).json({ error: 'Missing data' });

  try {
    const state = db.prepare('SELECT * FROM crisis_command_state WHERE username = ?').get(username) as any;
    if (!state) return res.status(404).json({ error: 'State not found' });

    if (state.lockout_until && new Date(state.lockout_until).getTime() > Date.now()) {
      return res.status(403).json({ error: 'Locked out', lockout_until: state.lockout_until });
    }

    const newStability = Math.max(0, Math.min(100, state.stability + (impact.stability || 0)));
    const newEconomy = Math.max(0, Math.min(100, state.economy + (impact.economy || 0)));
    const newTrust = Math.max(0, Math.min(100, state.trust + (impact.trust || 0)));
    const newRelations = Math.max(0, Math.min(100, state.relations + (impact.relations || 0)));
    
    const newYear = state.current_year + 1;
    let newYearsPlayed = state.years_played_current_batch + 1;
    let newLockout = null;

    if (newYearsPlayed >= 10) {
      newLockout = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    }

    const stmt = db.prepare(`
      UPDATE crisis_command_state 
      SET current_year = ?, years_played_current_batch = ?, lockout_until = ?, 
          stability = ?, economy = ?, trust = ?, relations = ?
      WHERE username = ?
    `);
    
    stmt.run(newYear, newYearsPlayed, newLockout, newStability, newEconomy, newTrust, newRelations, username);

    const updatedState = db.prepare('SELECT * FROM crisis_command_state WHERE username = ?').get(username);
    res.json({ state: updatedState });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/leaderboard', (req, res) => {
  try {
    const users = db.prepare('SELECT username, totalXP, rank FROM users ORDER BY totalXP DESC, createdAt ASC LIMIT 20').all();
    res.json({ leaderboard: users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
