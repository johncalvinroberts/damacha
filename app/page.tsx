import { getAllTracks } from '@/lib/tracks';
import Track from '@/lib/components/Track/Track';

export default async function Home() {
  const tracks = await getAllTracks();
  return (
    <ul>
      {tracks.map((item) => (
        <Track track={item} key={item.slug} />
      ))}
    </ul>
  );
}
