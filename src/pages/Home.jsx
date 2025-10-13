import { useState, useCallback, useEffect } from 'react';
import styles from './Home.module.css';
import styled from 'styled-components';
import ClickerIcon from '../assets/logo.svg?react';

function Home() {
  const [codePoints, setCodePoints] = useState(0); //Currency
  const [perClick, setPerClick] = useState(1); //Per click
  const [passivePointGain, setPassivePointGain] = useState(0); //Passive point gain per second
  const [upgrades, setUpgrades] = useState([]);

  // Only re-renders when perClick is updated
  // If you didn't useCallback, it would re-render everytime codePoints updated
  const handleClick = useCallback(() => {
    setCodePoints((currentPoints) => currentPoints + perClick);
  }, [perClick]);

  return (
    <>
      <section className={styles.clickerContainer}>
        <ClickerIcon className="logo" onClick={handleClick} />
        {codePoints}
      </section>
      <section className={styles.upgradesContainer}>
        <div className={styles.upgradesGridContainer}></div>
      </section>
    </>
  );
}

export default Home;
