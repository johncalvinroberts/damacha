import { useEffect, useRef } from 'react';
import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js';
import { useStore } from '../store';
import { useAudio } from '.';

// Run this hook only once, no more than one component should use this hook
const useWavesurfer = (
  containerRef: React.RefObject<HTMLDivElement>,
  options?: Partial<WaveSurferOptions>,
  initialTrackUrl?: string,
) => {
  const { wavesurfer } = useStore();
  const { next } = useAudio();
  const optionsRef = useRef<Partial<WaveSurferOptions>>(options || {});
  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return;

    const wavesurfer = WaveSurfer.create({
      ...optionsRef.current,
      container: containerRef.current,
      cursorColor: 'green',
      height: 50,
    });

    useStore.setState({ wavesurfer });

    return () => {
      wavesurfer?.destroy();
    };
  }, [containerRef]);

  useEffect(() => {
    if (!wavesurfer) return;
    if (initialTrackUrl) wavesurfer.load(initialTrackUrl);
    useStore.setState({ time: 0 });
    const subscriptions = [
      wavesurfer.on('loading', () => useStore.setState({ loading: true })),
      wavesurfer.on('play', () => useStore.setState({ playing: true })),
      wavesurfer.on('pause', () => useStore.setState({ playing: false })),
      wavesurfer.on('timeupdate', (time) => useStore.setState({ time })),
      wavesurfer.on('ready', (duration) =>
        useStore.setState({ duration, loading: false }),
      ),
      wavesurfer.on('finish', () => next()),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
    // eslint-disable-next-line
  }, [wavesurfer]);
};

export default useWavesurfer;
