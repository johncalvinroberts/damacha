import { Metadata } from "next";

export const DEFAULT_METADATA: Metadata = {
  title: 'damacha',
  alternates: { canonical: 'https://damachabeats.com' },
  robots: {},
  metadataBase: new URL('https://damachabeats.com'),
  description: 'damacha beats. beats by damacha.',
  twitter: {
    creator: '@omg_damacha',
    card: 'summary_large_image',
  },  
}
