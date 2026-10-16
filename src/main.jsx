import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initMetaPixel } from './services/metaPixel';
import { initAnalytics } from './services/analytics';
import './App.css';

initMetaPixel();
initAnalytics();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
