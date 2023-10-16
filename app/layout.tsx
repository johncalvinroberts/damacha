import './globals.css';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import Script from 'next/script';
import { DEFAULT_METADATA } from '../lib/constants';
import Player from '@/lib/components/Player';

const roboto = Roboto_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Player />
        {children}
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
