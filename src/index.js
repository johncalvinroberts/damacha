import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const rootElement = document.getElementById('root');

if (process.env.NODE_ENV === 'production') {
  window.fathom = { q: [] };
  window.snapSaveState = () => ({
    fathom: {
      q: [
        ['set', 'siteId', 'IKNUK'],
        ['set', 'spa', 'pushstate'],
      ],
    },
  });
}

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
} else {
  ReactDOM.render(<App />, rootElement);
}
