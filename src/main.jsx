import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import All Plain CSS Stylesheets
import './styles/global.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/carousels.css';
import './styles/enquiry.css';
import './styles/admin.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
