'use client';
import { useRef, useState } from 'react';
import { useCssVariable, useInterval, useAudio } from '@/lib/hooks';
import { getRandomUnicodeString } from '../utils';

function useWickedFavIcon() {
  const [letter, setLetter] = useState(getRandomUnicodeString(1));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text = useCssVariable('--text') || '';
  const background = useCssVariable('--primary') || '';

  useInterval(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const letter = getRandomUnicodeString(1);
    setLetter(letter);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = text;
    ctx.font = `310px monospace`;
    ctx.fillText(letter, 10, canvas.height - 10);
    const data = canvas.toDataURL('image/png');
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    link.type = 'image/x-icon';
    link.href = data;
  }, 1000);
  return { letter, canvasRef };
}

const PlayingFavicon = () => {
  const { canvasRef } = useWickedFavIcon();
  return (
    <div>
      <canvas
        style={{ border: '1px solid yellow' }}
        ref={canvasRef}
        width="200"
        height="200"
        hidden
      />
    </div>
  );
};

export default function FavIcon() {
  const { playing } = useAudio();
  return playing ? <PlayingFavicon /> : null;
}
