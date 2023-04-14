import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RouterDOM from './Router/index.js';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <RouterDOM />
  </React.StrictMode>

);