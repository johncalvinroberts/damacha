import { Metadata } from 'next';
import { getAllTracks, getTrackBySlug } from '@/lib/tracks';
import { DEFAULT_METADATA } from '@/lib/constants';

type Props = { params: { slug: string } };

const TrackDetail = async ({ params }: Props) => {
  const track = await getTrackBySlug(params.slug);
  return <>{track?.trackName}</>;
};

// statically generates all track pages
export async function generateStaticParams() {
  const tracks = await getAllTracks();
  return tracks.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const track = await getTrackBySlug(params.slug);
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
