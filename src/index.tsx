import React from 'react';
import { App } from './App';
import { createRoot } from 'react-dom/client';

const AppElement = document.getElementById('app') || document.createElement('app');
const root = createRoot(AppElement);

root.render(<App />);
