import { useEffect, useState, useCallback, MouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Track } from '@/types/app';

const useAudio = (tracks: Track[] = []) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const playing = audio && !audio.paused;
  const progress = time / duration || 0;

  const nextMode = useCallback(() => {
    console.log('TODO: set color mode');
  }, []);

  const prevMode = useCallback(() => {
    console.log('TODO: set color mode');
  }, []);

  const playPause = (track = tracks[index]) => {
    if (!audio) {
      throw new Error('audio element not yet defined');
    }
    if (track.url === audio.src) {
      if (playing) {
        audio.pause();
      } else {
        audio.play();
      }
    } else {
      const i = tracks.indexOf(track);
      audio.src = track.url;
      audio.play();
      setIndex(i);
    }
  };

  const previous = () => {
    if (!audio) {
      throw new Error('audio element not yet defined');
    }
    const n = (index - 1) % tracks.length;
    if (n < 0) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }
    const track = tracks[n];
    audio.src = track.url;
    setIndex(n);
    audio.play();
    prevMode();
    if (pathname !== '/') {
      router.push(`/${track.slug}`);
    }
  };

  const next = useCallback(() => {
    if (!audio) {
      throw new Error('audio element not yet defined');
    }
    const n = (index + 1) % tracks.length;
    const track = tracks[n];
    audio.src = track.url;
    setIndex(n);
    audio.play();
    nextMode();
    if (pathname !== '/') {
      router.push(`/${track.slug}`);
    }
  }, [audio, index, nextMode, tracks, router, pathname]);

  const seek = (e: MouseEvent) => {
    if (!audio) {
      throw new Error('audio element not yet defined');
    }
    const target = e.target as HTMLProgressElement;
    const n = e.clientX - target.offsetLeft;
    const p = n / target?.offsetWidth;
    audio.currentTime = p * duration;
  };

  useEffect(() => {
    const _audio = document.createElement('audio');
    setAudio(_audio);
    return () => {
      setAudio(undefined);
    };
  }, []);

  useEffect(() => {
    if (!audio) return () => {};
    const handleTimeUpdate = () => {
      setTime(audio.currentTime);
    };
    const handleMetadata = () => {
      setDuration(audio.duration);
    };
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleMetadata);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleMetadata);
    };
  }, [audio]);

  useEffect(() => {
    if (!audio) return;
    audio.addEventListener('ended', next);
    return () => {
      audio.removeEventListener('ended', next);
    };
  }, [audio, index, next]);

  useEffect(() => {
    if (pathname === '/') return;
    const slug = pathname.replace(/^\//, '');
    const index = tracks.findIndex((t) => t.slug === slug);
    if (index < 0) return;
    setIndex(index);
  }, [pathname, tracks]);

  return {
    audio,
    time,
    duration,
    index,
    setIndex,
    playing,
    playPause,
    previous,
    next,
    seek,
    progress,
  };
};

export default useAudio;
