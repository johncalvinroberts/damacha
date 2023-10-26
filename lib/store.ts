import { create } from 'zustand';
import { DamachaState } from '@/types/app';
import { Themes } from '@/types/app';

const initialState: DamachaState = {
  tracks: [],
  theme: 'purple',
  currentTrackIndex: 0,
  wavesurfer: undefined,
  duration: 0,
  time: 0,
  playing: false,
  loading: false,
};

export const useStore = create<DamachaState>(() => initialState);

export const cycleThemeForward = () => {
  const { theme } = useStore.getState();
  const currentThemeIndex = Themes.findIndex((item) => item == theme);
  const nextTheme = Themes[(currentThemeIndex + 1) % Themes.length];
  useStore.setState({ theme: nextTheme });
};

export const cycleThemeBackward = () => {
  const { theme } = useStore.getState();
  const currentThemeIndex = Themes.findIndex((item) => item == theme);
  const prevTheme =
    Themes[(currentThemeIndex - 1 + Themes.length) % Themes.length];
  useStore.setState({ theme: prevTheme });
};
