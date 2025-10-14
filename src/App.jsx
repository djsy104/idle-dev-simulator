import Home from './pages/Home';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import styles from './App.module.css';
import './App.css';

function App() {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
