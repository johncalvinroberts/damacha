import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Container from './Container';
import Beats from './Beats';
import Tracks from './Tracks';
import Track from './Track';
import NotFound from './NotFound';

export default () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Beats>
          <Container>
            <Routes>
              <Route path="/" element={<Tracks />} />
              <Route path="/:slug" element={<Track />} />
              <Route path="/not-found" element={<NotFound />} />
            </Routes>
          </Container>
        </Beats>
      </ThemeProvider>
    </Router>
  );
};
