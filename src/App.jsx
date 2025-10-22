import Home from './pages/Home';
import Settings from './pages/Settings';
import Achievements from './pages/Achievements';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router';
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
        <Route path="/Achievements" element={<Achievements />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
