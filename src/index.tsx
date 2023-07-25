import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import {Provider} from 'react-redux';
import store from './redux/store';

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<Provider store={store}><App /></Provider>);

  //webpack to update/watch
  if (module.hot) {
    module.hot.accept();
  }

} else {
  console.error('Container element not found.');
}