import { useEffect } from 'react';

type UseKeyboardHookArguments = {
  playPause: () => void;
  previous: () => void;
  next: () => void;
};

const keys = {
  space: 32,
  j: 74,
  k: 75,
  left: 37,
  right: 39,
};

const useKeyboard = ({
  playPause,
  previous,
  next,
}: UseKeyboardHookArguments) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.shiftKey || e.altKey || e.ctrlKey) return;
      switch (e.keyCode) {
        case keys.space:
          e.preventDefault();
          playPause();
          break;
        case keys.j:
        case keys.right:
          next();
          break;
        case keys.k:
        case keys.left:
          previous();
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [playPause, previous, next]);
};

export default useKeyboard;
