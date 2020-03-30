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
      <Button title="Previous" onClick={previous}>
        <Previous />
      </Button>
      <div sx={{ mx: 2 }} />
      <Button title="Play/Pause" size={48} onClick={(e) => playPause()}>
        {playing ? <Pause size={40} /> : <Play size={40} />}
      </Button>
      <div sx={{ mx: 2 }} />
      <Button title="Next" onClick={next}>
        <Next />
      </Button>
    </div>
  );
};
