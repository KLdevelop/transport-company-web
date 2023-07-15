import React from 'react';
import { App } from './App';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './models/store';

const AppElement = document.getElementById('app') || document.createElement('div');
AppElement.id = 'app';
const root = createRoot(AppElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
