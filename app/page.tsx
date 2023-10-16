import { getAllTracks } from '@/lib/tracks';
import Link from 'next/link';

export default async function Home() {
  const tracks = await getAllTracks();
  return (
    <main className="">
      <div>
        <p>hello new damacha</p>
      </div>
      <ul>
        {tracks.map((item) => (
          <li key={item.slug}>
            <Link href={`/${item.slug}`}>{item.trackName}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
