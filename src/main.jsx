import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // This is the correct file import

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

