'use client';
import { Pause, Play } from '../icons';
import Button from '../Button';
import { useAudio } from '@/lib/hooks';
import { Track } from '@/types/app';
import styles from './TrackPlayButton.module.css';
import { useStore } from '@/lib/store';
import Loading from '../Loading';

type Props = {
  track: Track;
};

const TrackPlayButton = ({ track }: Props) => {
  const { playing, playPause, currentTrackIndex, load } = useAudio();
  const { loading } = useStore();
  const isCurrentTrack = currentTrackIndex === track.index;
  const handleClick = async () => {
    if (isCurrentTrack) {
      playPause();
    } else {
      await load(track);
      await playPause();
    }
  };
  return (
    <>
      <Button
        onClick={handleClick}
        title={`Play ${track.trackName}`}
        className={styles.playButton}
      >
        {isCurrentTrack && !loading && playing && <Pause />}
        {isCurrentTrack && !loading && !playing && <Play />}
        {isCurrentTrack && loading && <Loading size="sm" />}
        {!isCurrentTrack && <Play />}
      </Button>
    </>
  );
};

export default TrackPlayButton;
