import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';

export function ThemeManager() {
  const { theme } = useGameStore();

  useEffect(() => {
    const root = document.documentElement;
    // Remove existing theme classes
    root.classList.remove('theme-executive-dark', 'theme-cyber-neon', 'theme-deep-ocean', 'theme-executive-light');
    // Add new theme class
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return null;
}
