'use client';
import { useEffect } from 'react';
import { useStore, cycleThemeForward } from '@/lib/store';
import Button from '../Button';
import styles from './ThemeToggle.module.css';

type Props = {
  className?: string;
};

const ThemeToggle = ({ className }: Props) => {
  const { theme } = useStore();

  useEffect(() => {
    document.cookie = `theme=${theme};path=/;`;
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Button
      onClick={cycleThemeForward}
      title={`Toggle theme. Current theme: ${theme}`}
      className={styles.root}
    >
      <div className={styles.spinnerOuter}>
        <div className={styles.spinnerInner} />
      </div>
    </Button>
  );
};

export default ThemeToggle;
