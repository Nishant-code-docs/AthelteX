import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AthleteProvider } from './context/AthleteContext';
import { CoachProvider } from './context/CoachContext';
import App from './app/App';

// Global Styles
import './styles/index.css';
import './styles/animations.css';
import './styles/utilities.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AthleteProvider>
          <CoachProvider>
            <App />
          </CoachProvider>
        </AthleteProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
