'use client';
import { useEffect } from 'react';
import { useStore, cycleThemeForward } from '@/lib/store';
import { Themes } from '@/types/app';

const ThemeToggle = () => {
  const { theme } = useStore();

  useEffect(() => {
    document.cookie = `theme=${theme};path=/;`;
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return <button onClick={cycleThemeForward}>{theme}</button>;
};

export default ThemeToggle;
