import React from 'react';
import { App } from './App';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './models/store';

const AppElement = document.getElementById('app') || document.createElement('app');
AppElement.style.display = 'flex';
AppElement.style.flexDirection = 'column';
AppElement.style.minHeight = '100%';
const root = createRoot(AppElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
