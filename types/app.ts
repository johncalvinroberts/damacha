import WaveSurfer from 'wavesurfer.js';

export const Themes = ['purple', 'dark', 'light', 'pink', 'regal'] as const;

export type Theme = (typeof Themes)[number];

export type Track = {
  trackName: string;
  slug: string;
  url: string;
  cloudflareURL: string;
  dateUploaded: string;
  id: string;
  remark?: string | undefined;
  index: number;
};

export type DamachaState = {
  tracks: Track[];
  currentTrackIndex: number;
  theme: Theme;
  wavesurfer: WaveSurfer | undefined;
  duration: number;
  time: number;
  playing: boolean;
  loading: boolean;
};
