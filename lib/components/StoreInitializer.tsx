'use client';

import { useRef } from 'react';

import { useStore } from '../store';
import { DamachaState } from '@/types/app';

type Props = {
  preloadedState: Partial<DamachaState>;
};

function StoreInitializer({ preloadedState }: Props) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState(preloadedState);
    initialized.current = true;
  }

  return null;
}

export default StoreInitializer;
