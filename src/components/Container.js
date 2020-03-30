/** @jsx jsx */
import { jsx, Styled, useColorMode } from 'theme-ui';
import { Global } from '@emotion/core';
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
        <div sx={{ display: 'flex', alignItems: 'center' }}>
          <Styled.a
            href="/"
            sx={{
              variant: 'styles.navlink',
              fontWeight: 'bold',
              fontSize: 4, // picks up value from `theme.fontSizes[4]`
              color: 'primary', // picks up value from `theme.colors.primary`
            }}
          >
            DAMACHA
          </Styled.a>
          <Styled.p sx={{ marginLeft: 2 }}>Lost tracks</Styled.p>
          <div sx={{ mx: 2 }} />
          <SpecialButton title="Change Color Mode" onClick={cycleMode} />
          <div sx={{ my: [2, 4] }}>
            <Controls />
          </div>
          <Progress />
        </div>
      </header>
      <main
        sx={{
          p: 3,
          maxWidth: 768,
        }}
      >
        {children}
      </main>
      <footer
        sx={{
          px: 3,
          py: 4,
        }}
      >
        © {new Date().getFullYear()}
      </footer>
    </Styled.root>
  );
};

export default Container;
