import { useEffect, useRef } from 'react';
import styles from './Progress.module.css';
import { useAudio } from '@/lib/hooks';
import { hhmmss } from '@/lib/utils';

import WaveSurfer from 'wavesurfer.js';

const Progress = () => {
  const { progress, time, duration, seek, audioElement, playing } = useAudio();

  const waveformElementRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer>();

  useEffect(() => {
    if (!waveformElementRef.current || !audioElement) {
      return;
    }
    // if (wavesurferRef.current) {
    //   wavesurferRef.current.destroy();
    // }
    wavesurferRef.current = WaveSurfer.create({
      container: waveformElementRef.current,
      waveColor: 'pink',
      progressColor: 'black',
      media: audioElement,
      width: '100%',
      height: 100,
    });

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [audioElement, playing]);

  return (
    <div className={styles.progressBox}>
      {/* <progress value={progress} className={styles.progress} onClick={seek}>
        {progress}
      </progress> */}
      <div className={styles.timeBox}>
        <div>{hhmmss(time)}</div>
        <div
          ref={waveformElementRef}
          style={{
            display: 'block',
            width: '100%',
            position: 'relative',
            height: '100px',
          }}
        ></div>
        <div>{hhmmss(duration)}</div>
      </div>
    </div>
  );
};

export default Progress;
