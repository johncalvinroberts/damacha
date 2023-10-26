import { useEffect, useState, useCallback, MouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useStore, cycleThemeBackward, cycleThemeForward } from '../store';
import { Track } from '@/types/app';

const useAudio = () => {
  const { tracks, currentTrackIndex, wavesurfer, time, duration, playing } =
    useStore();

  const router = useRouter();
  const pathname = usePathname();

  const progress = time / duration || 0;

  const playPause = async () => {
    const track = tracks[currentTrackIndex];
    const mediaElement = wavesurfer?.getMediaElement();
    if (!mediaElement || !wavesurfer) {
      throw new Error('audio element not yet defined');
    }
    if (!mediaElement.src) {
      await wavesurfer.load(track.url);
      await wavesurfer.play();
      return;
    }
    if (playing) {
      wavesurfer.pause();
    } else {
      wavesurfer.play();
    }
  };

  const previous = async () => {
    if (!wavesurfer) {
      throw new Error('audio element not yet defined');
    }
    const n = (currentTrackIndex - 1) % tracks.length;
    if (n < 0) {
      wavesurfer.pause();
      wavesurfer.seekTo(0);
      return;
    }
    const track = tracks[n];
    useStore.setState({ currentTrackIndex: n });
    await wavesurfer.load(track.url);
    await wavesurfer.play();
    cycleThemeBackward();
    if (pathname !== '/') {
      router.push(`/${track.slug}`);
    }
  };

  const next = async () => {
    if (!wavesurfer) {
      throw new Error('audio element not yet defined');
    }
    const n = (currentTrackIndex + 1) % tracks.length;
    const track = tracks[n];
    useStore.setState({ currentTrackIndex: n });
    await wavesurfer.load(track.url);
    await wavesurfer.play();
    cycleThemeForward();
    if (pathname !== '/') {
      router.push(`/${track.slug}`);
    }
  };

  const load = async (track: Track) => {
    useStore.setState({ currentTrackIndex: track.index });
    await wavesurfer?.load(track.url);
  };

  return {
    time,
    duration,
    currentTrackIndex,
    playing,
    playPause,
    previous,
    next,
    progress,
    load,
  };
};

export default useAudio;
