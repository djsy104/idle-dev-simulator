import { useState, useCallback, useMemo, useEffect, useContext } from 'react';
import styles from './Home.module.css';
import useTheme from '../shared/Theme/useTheme';
import useSound from '../shared/Sounds/useSound';
import NavMenu from '../shared/NavigationMenu/NavMenu';
import Upgrades from '../features/Upgrades/Upgrades';
import ClickerIcon from '../assets/logo.svg?react';
import ClickerButton from '../features/ClickerButton';
import musicTabTrack from "../assets/You're my little flower.mp3";
import { upgradeCatalog } from '../features/Upgrades/upgradesCatalog';
import { deriveStats, getCost } from '../features/Upgrades/upgradesUtility';
import { Howler } from 'howler';
import { SoundContext } from '../shared/Sounds/SoundProvider';

const MUSIC_ID = 'lofi_music_tab';
const MUSIC_SRC = [musicTabTrack];

function Home() {
  const initialLevels = Object.fromEntries(
    upgradeCatalog.map((upgrade) => [upgrade.id, 0])
  );
  const [levels, setLevels] = useState(initialLevels);
  const [codePoints, setCodePoints] = useState(0); // Currency
  const { theme } = useTheme();
  const { playClick, playUpgrade } = useSound();
  const { playMusic, stopMusic } = useContext(SoundContext);

  // Derive stats from levels
  const { perClick, passivePointGain } = useMemo(
    () => deriveStats(levels),
    [levels]
  );

  useEffect(() => {
    const unlocked = (levels[MUSIC_ID] ?? 0) >= 1;
    console.log('bgm level:', levels[MUSIC_ID], 'unlocked:', unlocked);
    if (unlocked) playMusic(MUSIC_SRC);
    else stopMusic();
  }, [levels, playMusic, stopMusic]);

  // Passive point gain loop
  useEffect(() => {
    if (passivePointGain <= 0) return;
    const t = setInterval(() => {
      setCodePoints((p) => p + passivePointGain);
    }, 1000);
    return () => clearInterval(t);
  }, [passivePointGain]);

  // Only re-renders when perClick is updated
  // If you didn't useCallback, it would re-render everytime codePoints updated
  const handleClick = useCallback(() => {
    setCodePoints((prev) => prev + perClick);
    playClick();
  }, [perClick]);

  function handleUpgrade(upgrade) {
    const cost = getCost(upgrade.id, levels); // use your cost scaling logic
    if (codePoints < cost) return;

    setCodePoints((prev) => prev - cost);
    setLevels((prev) => ({
      ...prev,
      [upgrade.id]: (prev[upgrade.id] ?? 0) + 1,
    }));
    playUpgrade();
  }

  return (
    <main>
      <NavMenu />
      <ClickerButton
        onClick={handleClick}
        icon={ClickerIcon}
        codePoints={codePoints}
      />
      <Upgrades
        codePoints={codePoints}
        levels={levels}
        onUpgrade={handleUpgrade}
      />
    </main>
  );
}

export default Home;
