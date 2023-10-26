'use client';
import Link from 'next/link';
import styles from './Track.module.css';
import { Track } from '@/types/app';
import TrackPlayButton from '../TrackPlayButton';
import { useStore } from '@/lib/store';
import clsx from 'clsx';

type Props = {
  track: Track;
};

const Track = ({ track }: Props) => {
  const { currentTrackIndex } = useStore();
  const isCurrentTrack = currentTrackIndex === track.index;

  return (
    <li className={clsx(styles.root, { [styles.active]: isCurrentTrack })}>
      <TrackPlayButton track={track} />
      <Link href={`/${track.slug}`}>{track.trackName}</Link>
    </li>
  );
};

export default Track;
