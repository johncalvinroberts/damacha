/** @jsx jsx */
import { useMemo } from 'react';
import { format } from 'date-fns';
import { jsx, Styled } from 'theme-ui';
import { useRoute, useLocation } from 'wouter';
import { useBeats } from './Beats';
import { Play } from './icons';
import { useHead } from '../hooks';

export default () => {
  const [, params] = useRoute('/:slug');
  const { slug } = params;
  const [location, setLocation] = useLocation();

  const { tracks, playPause } = useBeats();

  const track = useMemo(() => {
    const trackIndex = tracks.findIndex((item) => item.slug === slug);

    return tracks[trackIndex];
  }, [slug, tracks]);

  const { dateUploaded, url, trackName, remark } = track || {};
  useHead({
    title: trackName,
    meta: {
      description: {
        content: 'A musical track by damacha with a free download',
      },
      'og:title': { content: 'damacha unreleased track' },
      'twitter:title': { content: 'damacha unreleased track' },
      'twitter:text:title': {
        content: 'a damacha vault unreleased garbage track',
      },
      'twitter:description': {
        content: 'a damacha vault unreleased garbage track',
      },
    },
  });

  if (!track && location !== '/not-found') {
    setLocation('/not-found');
    return <div>Redirecting...you are lost.</div>;
  }

  if (location === '/not-found') {
    return null;
  }

  return (
    track && (
      <div sx={{ p: 3 }}>
        <Styled.h1
          sx={{
            fontSize: [3, 4, 5],
          }}
        >
          {track.id}. {trackName}
        </Styled.h1>
        {remark && (
          <div sx={{ mb: 4 }} dangerouslySetInnerHTML={{ __html: remark }} /> //eslint-disable-line
        )}
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
              cursor: 'pointer',
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
          <Styled.a
            download
            target="_blank"
            rel="noopener noreferrer"
            href={url}
          >
            Download MP3
          </Styled.a>
        </div>
      </div>
    )
  );
};
