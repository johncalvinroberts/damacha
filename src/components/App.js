import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';
import Container from './Container';
import Beats from './Beats';
import Tracks from './Track';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Beats>
          <Container>
            <Tracks />
          </Container>
        </Beats>
      </ThemeProvider>
    </Router>
  );
};

export default App;
