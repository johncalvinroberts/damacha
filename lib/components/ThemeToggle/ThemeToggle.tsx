'use client';
import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Themes } from '@/types/app';

const ThemeToggle = () => {
  const { theme } = useStore();

  useEffect(() => {
    document.cookie = `theme=${theme};path=/;`;
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  const handleCycleTheme = () => {
    const currentThemeIndex = Themes.findIndex((item) => item == theme);
    const nextTheme = Themes[(currentThemeIndex + 1) % Themes.length];
    console.log({ nextTheme });
    useStore.setState({ theme: nextTheme });
  };

  return <button onClick={handleCycleTheme}>Toggle Theme: {theme}</button>;
};

export default ThemeToggle;
