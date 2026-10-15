import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initMetaPixel } from './services/metaPixel';
import './App.css';

initMetaPixel();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
