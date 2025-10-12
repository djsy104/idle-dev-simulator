import { useState, useCallback, useEffect } from 'react';
import styles from './Home.module.css';
import styled from 'styled-components';
import ClickerIcon from '../assets/logo.svg?react';

const StyledClickerIcon = styled.img`
  height: 10rem;
`;

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
      <div className={styles.clickerContainer}>
        <ClickerIcon className="logo" onClick={handleClick} />
        {codePoints}
      </div>
    </>
  );
}

export default Home;
