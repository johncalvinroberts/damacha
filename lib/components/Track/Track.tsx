import Link from 'next/link';
import styles from './Track.module.css';
import { Track } from '@/types/app';

type Props = {
  track: Track;
};

const Track = ({ track }: Props) => {
  return (
    <li className={styles.root}>
      <Link href={`/${track.slug}`}>{track.trackName}</Link>
    </li>
  );
};

export default Track;
