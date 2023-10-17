import { create } from 'zustand';
import { DamachaState } from '@/types/app';

const initialState: DamachaState = {
  tracks: [],
  theme: 'purple',
  currentTrack: undefined,
};

export const useStore = create<DamachaState>((set) => initialState);
