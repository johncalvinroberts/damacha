import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import Container from './Container';
import Beats from './Beats';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Beats>
        <Container />
      </Beats>
    </ThemeProvider>
  );
};

export default App;
