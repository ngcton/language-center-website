import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import CSS file
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Render App vào div với id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
