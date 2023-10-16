//@ts-ignore
import { cache } from 'react';
import { Track } from '@/types/app';
import tracksJson from '../data/tracks.json';

export const getAllTracksFromFileSystem = async (): Promise<Track[]> => {
  return tracksJson.sort((a, b) => {
    const aDate = new Date(a.dateUploaded);
    const bDate = new Date(b.dateUploaded);
    return bDate.valueOf() - aDate.valueOf();
  });
};

export const getAllTracks: () => Promise<Track[]> = cache(
  getAllTracksFromFileSystem,
);

export const getTrackBySlugFromFileSystem = async (
  slug: string,
): Promise<Track | undefined> => {
  const allTracks = await getAllTracks();
  return allTracks.find((track) => track.slug === slug);
};

export const getTrackBySlug: (slug: string) => Promise<Track | undefined> =
  cache(getTrackBySlugFromFileSystem);
