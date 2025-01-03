import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTracks, getTrackBySlug } from '@/lib/tracks';
import { DEFAULT_METADATA } from '@/lib/constants';
import NiceDate from '@/lib/components/NiceDate';
import styles from './page.module.css';
import TrackPlayButton from '@/lib/components/TrackPlayButton';

type Props = { params: Promise<{ slug: string }> };

// this is an rsc
const TrackDetail = async ({ params }: Props) => {
  const track = await getTrackBySlug((await params).slug);
  if (!track) {
    notFound();
  }

  const { dateUploaded, trackName, remark } = track;
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <span>[{track.id}]</span>
        <TrackPlayButton track={track} eagerLoad />
      </div>
      <h1 className={styles.title}>{trackName}</h1>
      {remark && (
        <div
          dangerouslySetInnerHTML={{ __html: remark }}
          className={styles.remark}
        />
      )}
      <div className={styles.date}>
        Date Uploaded: <NiceDate date={dateUploaded} />
      </div>
    </div>
  );
};

// statically generates all track pages
export async function generateStaticParams() {
  const tracks = await getAllTracks();
  return tracks.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const track = await getTrackBySlug((await params).slug);
  return {
    ...DEFAULT_METADATA,
    description: 'A musical track by damacha with a free download',
    title: track?.trackName,
    twitter: {
      title: `${track?.trackName} | a damacha vault unreleased garbage track`,
    },
  };
}

export default TrackDetail;
