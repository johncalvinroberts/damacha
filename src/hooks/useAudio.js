import { useColorMode } from 'theme-ui';
import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'wouter';
import { modes } from '../components/theme';

export default (tracks = []) => {
  const [audio, setAudio] = useState(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [index, setIndex] = useState(0);

  const [location, setLocation] = useLocation();

  const playing = audio && !audio.paused;
  const progress = time / duration || 0;

  const [mode, setMode] = useColorMode();
  const nextMode = useCallback(() => {
    const n = (modes.indexOf(mode) + 1) % modes.length;
    setMode(modes[n]);
  }, [mode, setMode]);

  const prevMode = useCallback(() => {
    const n = (modes.indexOf(mode) - 1) % modes.length;
    setMode(modes[n]);
  }, [mode, setMode]);

  const playPause = (track = tracks[index]) => {
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
    if (location.pathname !== '/') {
      setLocation(`/${track.slug}`);
    }
  };

  const next = useCallback(() => {
    const n = (index + 1) % tracks.length;
    const track = tracks[n];
    audio.src = track.url;
    setIndex(n);
    audio.play();
    nextMode();
    if (location.pathname !== '/') {
      setLocation(`/${track.slug}`);
    }
  }, [audio, index, location.pathname, nextMode, setLocation, tracks]);

  const seek = (e) => {
    const n = e.clientX - e.target.offsetLeft;
    const p = n / e.target.offsetWidth;
    audio.currentTime = p * duration;
  };

  useEffect(() => {
    const _audio = document.createElement('audio');
    setAudio(_audio);
    return () => {
      setAudio(null);
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
    if (location === '/') return;
    const slug = location.replace(/^\//, '');
    const index = tracks.findIndex((t) => t.slug === slug);
    if (index < 0) return;
    setIndex(index);
  }, [location, tracks]);

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
