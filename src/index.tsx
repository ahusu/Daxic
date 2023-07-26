import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import {Provider} from 'react-redux';
import store from './redux/store';


const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<div className='justify-center flex'><Provider store={store}><App /></Provider></div>);

  if (module.hot) {
    module.hot.accept();
  }

} else {
  console.error('Container element not found.');
}