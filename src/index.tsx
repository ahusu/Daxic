import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './redux/store';


const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(
    <div>
      <div className="relative min-h-screen">
        <div className="bg bg-fixed bg-bottom bg-no-repeat bg-cover absolute bottom-0 left-0 w-full h-full z-0 pointer-events-none"></div>
        <div className='justify-center flex z-10 relative'><Provider store={store}><App /></Provider></div>
      </div>
    </div>

  );

  if (module.hot) {
    module.hot.accept();
  }

} else {
  console.error('Container element not found.');
}