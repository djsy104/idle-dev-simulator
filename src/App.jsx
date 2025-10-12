import Home from './pages/Home';
import { Route, Routes, useLocation } from 'react-router';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
