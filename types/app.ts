export const Themes = ['purple', 'dark', 'light', 'pink', 'regal'] as const;

export type Theme = (typeof Themes)[number];

export type Track = {
  trackName: string;
  slug: string;
  url: string;
  dateUploaded: string;
  id: string;
  remark?: string | undefined;
};

export type DamachaState = {
  tracks: Track[];
  currentTrack: Track | undefined;
  theme: Theme;
};
