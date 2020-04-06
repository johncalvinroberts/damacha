import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { EditorProvider } from '@theme-ui/editor';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Container from './Container';
import Beats from './Beats';
import Favicon from './Favicon';
import Tracks from './Tracks';
import Track from './Track';
import Editor from './Editor';
import NotFound from './NotFound';

export default () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <EditorProvider>
          <Favicon />
          <Beats>
            <Container>
              <Routes>
                <Route path="/" element={<Tracks />} />
                <Route path="/:slug" element={<Track />} />
                <Route path="/edit-themes" element={<Editor />} />
                <Route path="/not-found" element={<NotFound />} />
              </Routes>
            </Container>
          </Beats>
        </EditorProvider>
      </ThemeProvider>
    </Router>
  );
};
