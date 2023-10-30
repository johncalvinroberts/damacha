import './globals.css';
import styles from './layout.module.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Roboto_Mono } from 'next/font/google';
import Script from 'next/script';
import { DEFAULT_METADATA } from '../lib/constants';
import Player from '@/lib/components/Player';
import StoreInitializer from '@/lib/components/StoreInitializer';
import { getAllTracks } from '@/lib/tracks';
import { Theme } from '@/types/app';
import FavIcon from '@/lib/components/Favicon';
import ThemeToggle from '@/lib/components/ThemeToggle';
import Room from '@/lib/components/Room';
import Comments from '@/lib/components/Comments';

const roboto = Roboto_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tracks = await getAllTracks();
  const cookieStore = cookies();
  const theme: Theme = (cookieStore.get('theme')?.value as Theme) || 'purple';
  return (
    <html lang="en" data-theme={theme}>
      <StoreInitializer preloadedState={{ tracks, theme }} />
      <body className={roboto.className}>
        <div className={styles.root}>
          <div className={styles.left}>
            <header className={styles.player}>
              <div className={styles.top}>
                <Link href="/">damacha</Link>
                <ThemeToggle className={styles.themeToggle} />
              </div>
              <Player />
            </header>
            <Room>
              <Comments />
            </Room>
          </div>
          <main className={styles.contentColumn}>{children}</main>
          <footer className={styles.footer}>
            <span>© {new Date().getFullYear()}</span>
            <a
              href="https://open.spotify.com/artist/0SNdS7f5RgPafbSwBraRKD?si=BGPOju1dQuG6qUpK95iCOA"
              target="_blank"
              rel="noopener noreferrer"
            >
              spotify
            </a>
            <a
              href="https://www.instagram.com/omg_damacha/"
              target="_blank"
              rel="noopener noreferrer"
            >
              instagram
            </a>
          </footer>
        </div>
        <FavIcon />
      </body>
      {process.env.NODE_ENV === 'production' && (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "e5da4e06b46e4f9c81a0a3c540a36a1d"}'
        />
      )}
    </html>
  );
}
