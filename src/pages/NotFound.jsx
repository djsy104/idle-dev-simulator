import { useNavigate } from 'react-router';
import { useEffect, useContext } from 'react';
import { SoundContext } from '../shared/Sounds/SoundProvider';
import styles from './NotFound.module.css';

function NotFound() {
  const navigate = useNavigate();
  const { stopMusic } = useContext(SoundContext);

  useEffect(() => {
    // Kill any background track the moment 404 renders
    stopMusic();
  }, [stopMusic]);

  return (
    <div className={styles.container}>
      <p>Page not found.</p>
      <button className={styles.homeButton} onClick={() => navigate('/')}>
        Home
      </button>
    </div>
  );
}

export default NotFound;
