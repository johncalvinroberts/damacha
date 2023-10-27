'use client';
import { useEffect, useRef } from 'react';
import ThemeToggle from '../ThemeToggle';
import styles from './Player.module.css';
import Button from '../Button';
import { Previous, Pause, Play, Next } from '../icons';
import { useAudio, useKeyboard } from '@/lib/hooks';
import { useStore } from '@/lib/store';
import { useWavesurfer } from '@/lib/hooks';
import { hhmmss } from '@/lib/utils';
import Loading from '../Loading';

const Player = () => {
  const { next, previous, playPause, playing, duration, time } = useAudio();
  const { tracks, loading, currentTrackIndex } = useStore();
  const waveSurferContainer = useRef<HTMLDivElement>(null);
  const initialTrackUrl = tracks[currentTrackIndex].url;
  useWavesurfer(waveSurferContainer, undefined, initialTrackUrl);
  useKeyboard();

  return (
    <div className={styles.root}>
      <div className={styles.player}>
        <div className={styles.controls}>
          <Button
            title="Previous"
            onClick={previous}
            className={styles.skipButton}
          >
            <Previous />
          </Button>
          <Button title="Play/Pause" onClick={() => playPause()}>
            {loading && <Loading size="lg" />}
            {!loading && playing && <Pause size={40} />}
            {!loading && !playing && <Play size={40} />}
          </Button>
          <Button title="Next" onClick={next} className={styles.skipButton}>
            <Next />
          </Button>
        </div>
      </div>
      <div className={styles.wavesurferContainer}>
        <div ref={waveSurferContainer} className={styles.wavesurfer}></div>
        <div className={styles.timeBox}>
          <span>{hhmmss(time)}</span>/<span>{hhmmss(duration)}</span>
        </div>
      </div>
      <ThemeToggle className={styles.themeToggle} />
    </div>
  );
};

export default Player;
