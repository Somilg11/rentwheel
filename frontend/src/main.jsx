import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Use BrowserRouter here

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Only one Router is required */}
      <App />
    </Router>
  </StrictMode>
);
