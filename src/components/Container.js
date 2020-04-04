/** @jsx jsx */
import { jsx, Styled, useColorMode } from 'theme-ui';
import { Global } from '@emotion/core';
import { Link } from 'react-router-dom';
import { modes } from './theme';
import SpecialButton from './SpecialButton';
import Controls from './Controls';
import Progress from './Progress';

const Container = ({ children }) => {
  const [mode, setMode] = useColorMode();
  const cycleMode = () => {
    const n = (modes.indexOf(mode) + 1) % modes.length;
    setMode(modes[n]);
  };
  return (
    <Styled.root
      sx={{
        display: 'grid',
        gridTemplateColumns: [null, null, '1fr 1fr'],
      }}
    >
      <Global
        styles={{
          '*': {
            boxSizing: 'border-box',
          },
          body: {
            margin: 0,
            minHeight: '100vh',
          },
        }}
      />
      <header
        sx={{
          position: 'sticky',
          top: 0,
          alignSelf: 'flex-start',
          bg: 'background',
          p: 3,
        }}
      >
        <div sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Styled.a
            to="/"
            as={Link}
            sx={{
              variant: 'styles.navlink',
              fontWeight: 'bold',
              fontSize: 4, // picks up value from `theme.fontSizes[4]`
              color: 'primary', // picks up value from `theme.colors.primary`
            }}
          >
            damacha
          </Styled.a>
          <div sx={{ mx: 2 }} />
          <SpecialButton title="Change Color Mode" onClick={cycleMode} />
          <div sx={{ flex: '0 0 100%' }}>
            <div sx={{ my: [2, 4] }}>
              <Controls />
            </div>
            <Progress />
          </div>
        </div>
      </header>
      <main
        sx={{
          maxWidth: 768,
          minHeight: 'calc(100vh - 40px)',
        }}
      >
        {children}
      </main>
      <footer
        sx={{
          px: 3,
          py: 2,
          height: '40px',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <span>© {new Date().getFullYear()}</span>
        <Styled.a
          href="https://open.spotify.com/artist/0SNdS7f5RgPafbSwBraRKD?si=BGPOju1dQuG6qUpK95iCOA"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ pl: 1 }}
        >
          spotify
        </Styled.a>
        <Styled.a
          href="https://www.instagram.com/omg_damacha/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ pl: 1 }}
        >
          instagram
        </Styled.a>
      </footer>
    </Styled.root>
  );
};

export default Container;
