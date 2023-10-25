import { useEffect, useState, useCallback, MouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useStore, cycleThemeBackward, cycleThemeForward } from '../store';

const useAudio = () => {
  const { tracks, currentTrackIndex, audioElement, time, duration } =
    useStore();

  const router = useRouter();
  const pathname = usePathname();

  const playing = audioElement && !audioElement.paused;
  const progress = time / duration || 0;

  const playPause = (track = tracks[currentTrackIndex]) => {
    if (!audioElement) {
      throw new Error('audio element not yet defined');
    }
    if (track.url === audioElement.src) {
      if (playing) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
    } else {
      audioElement.src = track.url;
      audioElement.play();
    }
  };

  const previous = () => {
    if (!audioElement) {
      throw new Error('audio element not yet defined');
    }
    const n = (currentTrackIndex - 1) % tracks.length;
    if (n < 0) {
      audioElement.pause();
      audioElement.currentTime = 0;
      return;
    }
    const track = tracks[n];
    audioElement.src = track.url;
    useStore.setState({ currentTrackIndex: n });
    audioElement.play();
    cycleThemeBackward();
    if (pathname !== '/') {
      router.push(`/${track.slug}`);
    }
  };

  const next = useCallback(() => {
    if (!audioElement) {
      throw new Error('audio element not yet defined');
    }
    const n = (currentTrackIndex + 1) % tracks.length;
    const track = tracks[n];
    audioElement.src = track.url;
    useStore.setState({ currentTrackIndex: n });
    audioElement.play();
    cycleThemeForward();
    if (pathname !== '/') {
      router.push(`/${track.slug}`);
    }
  }, [audioElement, currentTrackIndex, tracks, pathname, router]);

  const seek = (e: MouseEvent) => {
    if (!audioElement) {
      throw new Error('audio element not yet defined');
    }
    const target = e.target as HTMLProgressElement;
    const n = e.clientX - target.offsetLeft;
    const p = n / target?.offsetWidth;
    audioElement.currentTime = p * duration;
  };

  return {
    audioElement,
    time,
    duration,
    currentTrackIndex,
    playing,
    playPause,
    previous,
    next,
    seek,
    progress,
  };
};

export default useAudio;
