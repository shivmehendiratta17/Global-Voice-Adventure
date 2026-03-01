import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { useGameStore } from './store/useGameStore';
import { ThemeManager } from './components/ThemeManager';

// Lazy load modules for performance optimization
const LandingPage = lazy(() => import('./modules/landing/LandingPage').then(m => ({ default: m.LandingPage })));
const AuthPage = lazy(() => import('./modules/auth/AuthPage').then(m => ({ default: m.AuthPage })));
const ArenaPage = lazy(() => import('./modules/arena/ArenaPage').then(m => ({ default: m.ArenaPage })));
const QuizGame = lazy(() => import('./modules/quiz/QuizGame').then(m => ({ default: m.QuizGame })));
const SignalRecallGame = lazy(() => import('./modules/signalRecall/SignalRecallGame').then(m => ({ default: m.SignalRecallGame })));
const MindDuelGame = lazy(() => import('./modules/mindDuel/MindDuelGame').then(m => ({ default: m.MindDuelGame })));
const CrisisCommandGame = lazy(() => import('./modules/crisisCommand/CrisisCommandGame').then(m => ({ default: m.CrisisCommandGame })));
const SignalVsNoiseGame = lazy(() => import('./modules/signalVsNoise/SignalVsNoiseGame').then(m => ({ default: m.SignalVsNoiseGame })));
const GlobalVoiceSignUp = lazy(() => import('./modules/competition/GlobalVoiceSignUp').then(m => ({ default: m.GlobalVoiceSignUp })));
const ProfilePage = lazy(() => import('./modules/profile/ProfilePage').then(m => ({ default: m.ProfilePage })));
const LeaderboardPage = lazy(() => import('./modules/leaderboard/LeaderboardPage').then(m => ({ default: m.LeaderboardPage })));
const SettingsPage = lazy(() => import('./modules/settings/SettingsPage').then(m => ({ default: m.SettingsPage })));
const FeedbackPage = lazy(() => import('./modules/settings/FeedbackPage').then(m => ({ default: m.FeedbackPage })));

// Protected Route Wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useGameStore();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <HashRouter>
      <ThemeManager />
      <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-cyan-500 font-mono">Loading Global Voice...</div>}>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="arena" element={<ProtectedRoute><ArenaPage /></ProtectedRoute>} />
            <Route path="arena/quiz" element={<ProtectedRoute><QuizGame /></ProtectedRoute>} />
            <Route path="arena/signal-recall" element={<ProtectedRoute><SignalRecallGame /></ProtectedRoute>} />
            <Route path="arena/mind-duel" element={<ProtectedRoute><MindDuelGame /></ProtectedRoute>} />
            <Route path="arena/crisis-command" element={<ProtectedRoute><CrisisCommandGame /></ProtectedRoute>} />
            <Route path="arena/signal-vs-noise" element={<ProtectedRoute><SignalVsNoiseGame /></ProtectedRoute>} />
            <Route path="global-voice-signup" element={<GlobalVoiceSignUp />} />
            <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
