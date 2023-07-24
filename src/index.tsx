import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import rootReducer from './redux/reducers';
import {Provider} from 'react-redux';
import store from './redux/store';

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<Provider store={store}><App /></Provider>);
} else {
  console.error('Container element not found.');
}