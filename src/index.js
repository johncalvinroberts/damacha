import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

window.env = process.env.NODE_ENV;
const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
} else {
  ReactDOM.render(<App />, rootElement);
}
