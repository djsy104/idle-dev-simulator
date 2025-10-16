import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.jsx';
import ThemeProvider from './shared/Theme/ThemeProvider.jsx';
import SoundProvider from './shared/Sounds/SoundProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <SoundProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SoundProvider>
    </ThemeProvider>
  </StrictMode>
);
