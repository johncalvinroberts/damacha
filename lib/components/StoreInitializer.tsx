'use client';

import { useRef } from 'react';

import { useStore } from '../store';
import { DamachaState } from '@/types/app';

function StoreInitializer({
  preloadedState,
}: {
  preloadedState: DamachaState;
}) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState(preloadedState);
    initialized.current = true;
  }

  return null;
}

export default StoreInitializer;
