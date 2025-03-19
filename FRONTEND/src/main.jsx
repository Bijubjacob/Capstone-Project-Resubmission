import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';  // Wrap everything in Router
import App from './App.jsx';  // Main App component
import AppProvider from './context/app_context.jsx';  // Context Provider for App-level state
import AuthProvider from './context/auth/auth_context.jsx';  // Auth Provider for Auth-level state

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Ensure that AppProvider and AuthProvider are inside Router */}
    <Router>
      <AppProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AppProvider>
    </Router>
  </React.StrictMode>
);
