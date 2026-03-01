import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthScreen } from '../../components/AuthScreen';
import { useGameStore } from '../../store/useGameStore';
import { UserProfile } from '../../lib/api';

export function AuthPage() {
  const navigate = useNavigate();
  const { setUser } = useGameStore();

  const handleLoginSuccess = (user: UserProfile) => {
    setUser(user);
    navigate('/arena');
  };

  return (
    <AuthScreen 
      onLoginSuccess={handleLoginSuccess}
      onViewLeaderboard={() => navigate('/leaderboard')}
      onViewProtocol={() => navigate('/')}
    />
  );
}
