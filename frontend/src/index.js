import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// npx nodemon ./index.js on backend
// run docker-compose up -d on mongodb

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Having this makes api call twice
  <React.StrictMode>
    <App />
  </React.StrictMode>
);