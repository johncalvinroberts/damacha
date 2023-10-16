import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { Route } from 'wouter';
import theme from './theme';
import Container from './Container';
import Beats from './Beats';
import Favicon from './Favicon';
import Tracks from './Tracks';
import Track from './Track';
import NotFound from './NotFound';

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <Favicon />
      <Beats>
        <Container>
          <Route path="/">
            <Tracks />
          </Route>
          <Route path="/:slug">
            <Track />
          </Route>
          <Route path="/not-found">
            <NotFound />
          </Route>
        </Container>
      </Beats>
    </ThemeProvider>
  );
};
