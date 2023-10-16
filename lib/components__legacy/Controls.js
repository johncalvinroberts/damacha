/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useBeats } from './Beats';
import { Button, Play, Pause, Previous, Next } from './icons';

export default () => {
  const { playing, playPause, previous, next } = useBeats();

  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Button
        title="Previous"
        onClick={previous}
        sx={{ width: 32, height: 32 }}
      >
        <Previous />
      </Button>
      <div sx={{ mx: 2 }} />
      <Button title="Play/Pause" size={48} onClick={() => playPause()}>
        {playing ? (
          <Pause sx={{ width: 40, height: 40 }} />
        ) : (
          <Play sx={{ width: 40, height: 40 }} />
        )}
      </Button>
      <div sx={{ mx: 2 }} />
      <Button title="Next" onClick={next} sx={{ width: 32, height: 32 }}>
        <Next />
      </Button>
    </div>
  );
};
