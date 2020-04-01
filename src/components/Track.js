/** @jsx jsx */
import { useMemo } from 'react';
import { format } from 'date-fns';
import { jsx, Styled } from 'theme-ui';
import { useParams } from 'react-router-dom';
import { useBeats } from './Beats';
import { Play } from './icons';

export default () => {
  const { slug } = useParams();
  const { tracks, playPause, index } = useBeats();

  const track = useMemo(() => {
    const trackIndex = tracks.findIndex((item) => item.slug === slug);

    return { ...tracks[trackIndex], isActive: index === trackIndex };
  }, [index, slug, tracks]);

  const { dateUploaded, url, trackName } = track;

  return (
    <div sx={{ p: 3 }}>
      <Styled.h1
        sx={{
          fontSize: [3, 4, 5],
        }}
      >
        {track.id}. {trackName}
      </Styled.h1>
      <div>
        Date Uploaded: {format(new Date(dateUploaded), 'EEEE MMM do, yyyy')}
      </div>
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
          my: 4,
        }}
      >
        <button
          onClick={() => playPause(track)}
          sx={{
            appearance: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            color: 'inherit',
            bg: 'transparent',
            border: 0,
            display: 'inline-flex',
            alignItems: 'center',
            p: 2,
            m: 0,
            mr: 3,
            outline: '2px solid',
            ':focus': {},
          }}
        >
          <Play sx={{ mr: 2 }} />
          Play Track
        </button>
        <Styled.a download href={url}>
          Download MP3
        </Styled.a>
      </div>
    </div>
  );
};
