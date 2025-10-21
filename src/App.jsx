import Home from './pages/Home';
import Settings from './pages/Settings';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import styles from './App.module.css';
import './App.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.homeContainer}>
              <Home />
            </div>
          }
        />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
