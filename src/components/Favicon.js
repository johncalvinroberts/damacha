import React, { useEffect, useState, useRef } from 'react';
import { useColorMode } from 'theme-ui';
import theme from './theme';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function useWickedFavIcon() {
  const letters = [
    ...'✨💅✨♻️✨🦜✨🍄✨☄️✨💫✨🐱✨💆☘️☘️🍀🌿🌳🌲🐿🌲🌲🌱🍃🎋🌲🌸🌸🌼🌺🥀💐🌕🌖🌗🌘🌑🌒🌓🌔🌎🌍🌏🌔🌓🌒🌑🌘🌗🌖🌕',
  ];
  const [index, setIndex] = useState(0);
  const canvasRef = useRef(0);
  const [mode] = useColorMode();

  const colorMode =
    mode === 'default' ? theme.colors : theme.colors.modes[mode];
  const { text, background } = colorMode;

  useInterval(() => {
    setIndex(index >= letters.length - 1 ? 0 : index + 1);
    const letter = letters[index];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = text;
    ctx.font = `310px monospace`;
    ctx.fillText(letter, 10, canvas.height - 10);
    const data = canvas.toDataURL('image/png');

    const link = document.querySelector("link[rel*='icon']");
    link.type = 'image/x-icon';
    link.href = data;
  }, 1000);
  return { letter: letters[index], index, canvasRef };
}

export default function FavIcon() {
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
}
