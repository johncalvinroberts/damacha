/** @jsx jsx */
import { forwardRef, useRef, useEffect } from 'react';
import { jsx } from 'theme-ui';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useBeats } from './Beats';

/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */

const TrackListItem = forwardRef(({ track, active }, ref) => {
  const { playPause } = useBeats();
  return (
    <li
      key={track.id}
      ref={active ? ref : null}
      role="button"
      tabIndex="0"
      onClick={() => playPause(track)}
      aria-current={active}
      sx={{
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        ':hover': {
          color: 'primary',
          bg: 'muted',
        },
        '&[aria-current=true]': {
          color: 'background',
          bg: 'text',
        },
        ':focus': {
          outline: 'none',
          boxShadow: '0 0 0 2px',
        },
      }}
    >
      <div
        sx={{
          flex: 'none',
          p: 3,
        }}
      >
        {track.id}
      </div>
      <div
        sx={{
          py: 3,
          fontWeight: 'bold',
        }}
      >
        {track.trackName}
      </div>
      <div sx={{ mx: 'auto' }} />
      <div
        sx={{
          flex: 'none',
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        role="none"
      >
        <Link
          to={`/${track.slug}`}
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'block',
            p: 3,
            ':hover': {
              color: 'primary',
            },
            ':focus': {
              outline: '2px solid',
            },
          }}
        >
          {format(new Date(track.dateUploaded), 'EEEE MMM do, yyyy')}
        </Link>
      </div>
    </li>
  );
});
/* eslint-enable jsx-a11y/click-events-have-key-events */
/* eslint-enable jsx-a11y/no-noninteractive-element-to-interactive-role */

export default () => {
  const { tracks, index: activeIndex } = useBeats();
  const activeItem = useRef(null);
  useEffect(() => {
    if (!activeItem.current) return;
    const el = activeItem.current;
    const rect = el.getBoundingClientRect();
    if (rect.top < 128) {
      window.scrollTo(0, el.offsetTop - 256);
    } else if (rect.bottom > window.innerHeight) {
      window.scrollTo(0, el.offsetTop - window.innerHeight + rect.height);
    }
  }, []);

  return (
    <ul
      sx={{
        listStyle: 'none',
        p: 0,
        m: 0,
      }}
    >
      {tracks.map((track, index) => {
        const active = index === activeIndex;
        return (
          <TrackListItem
            track={track}
            active={active}
            ref={active ? activeItem : null}
            key={track.trackName}
          />
        );
      })}
    </ul>
  );
};
