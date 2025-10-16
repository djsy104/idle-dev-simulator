import { useState, useCallback, useEffect } from 'react';
import styles from './Home.module.css';
import styled from 'styled-components';
import useTheme from '../shared/Theme/useTheme';
import useSound from '../shared/Sounds/useSound';
import ClickerIcon from '../assets/logo.svg?react';

function Home() {
  const [codePoints, setCodePoints] = useState(0); //Currency
  const [perClick, setPerClick] = useState(1); //Per click
  const [passivePointGain, setPassivePointGain] = useState(0); //Passive point gain per second
  const [upgrades, setUpgrades] = useState([]);
  const { theme } = useTheme();
  const { playClick, playUpgrade } = useSound();

  // Only re-renders when perClick is updated
  // If you didn't useCallback, it would re-render everytime codePoints updated
  const handleClick = useCallback(() => {
    setCodePoints((currentPoints) => currentPoints + perClick);
    playClick();
  }, [perClick]);

  const handleUpgrade = () => {
    playUpgrade();
  };

  return (
    <main>
      <section className={styles.clickerContainer}>
        <ClickerIcon className={styles.clickerIcon} onClick={handleClick} />
        <h3 className={styles.codePointsText}>{codePoints}</h3>
      </section>
      <section className={styles.upgradesContainer}>
        <div className={styles.upgradesGridContainer}>
          <div className={styles.card} onClick={handleUpgrade}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
        </div>
      </section>
    </main>
  );
}

export default Home;
