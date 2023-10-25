'use client';
import { useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle';
import styles from './Player.module.css';
import Button from '../Button';
import { Previous, Pause, Play, Next } from '../icons';
import { useAudio, useKeyboard } from '@/lib/hooks';
import { useStore } from '@/lib/store';
import { usePathname } from 'next/navigation';
import Progress from '../Progress/Progress';

const Player = () => {
  const { next, previous, playPause, playing } = useAudio();
  const { tracks, audioElement } = useStore();
  const pathname = usePathname();

  useKeyboard();
  useEffect(() => {
    const audioElement = document.createElement('audio');
    useStore.setState({ audioElement });
    return () => {
      useStore.setState({ audioElement: undefined });
    };
  }, []);

  useEffect(() => {
    if (!audioElement) return () => {};
    const handleTimeUpdate = () => {
      useStore.setState({ time: audioElement.currentTime ?? 0 });
    };
    const handleMetadata = () => {
      useStore.setState({ duration: audioElement.duration ?? 0 });
    };
    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('loadedmetadata', handleMetadata);
    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('loadedmetadata', handleMetadata);
    };
  }, [audioElement]);

  useEffect(() => {
    if (!audioElement) return;
    audioElement.addEventListener('ended', next);
    return () => {
      audioElement.removeEventListener('ended', next);
    };
  }, [audioElement, next]);

  useEffect(() => {
    if (pathname === '/') return;
    const slug = pathname.replace(/^\//, '');
    const index = tracks.findIndex((t) => t.slug === slug);
    if (index < 0) return;
    useStore.setState({ currentTrackIndex: index });
  }, [pathname, tracks]);

  return (
    <div className={styles.root}>
      <div className={styles.player}>
        <Button
          title="Previous"
          onClick={previous}
          className={styles.skipButton}
        >
          <Previous />
        </Button>
        <Button title="Play/Pause" onClick={() => playPause()}>
          {playing ? <Pause size={40} /> : <Play size={40} />}
        </Button>
        <Button title="Next" onClick={next} className={styles.skipButton}>
          <Next />
        </Button>
        <Progress />
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Player;
