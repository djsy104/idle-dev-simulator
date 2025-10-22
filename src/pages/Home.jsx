import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { upgradeCatalog } from '../features/Upgrades/upgradesCatalog';
import { deriveStats, getCost } from '../features/Upgrades/upgradesUtility';
import { SoundContext } from '../shared/Sounds/SoundProvider';
import { loadGameState, saveGameState } from '../shared/Storage/gameState';
import useSound from '../shared/Sounds/useSound';
import NavMenu from '../shared/NavigationMenu/NavMenu';
import Upgrades from '../features/Upgrades/Upgrades';
import ClickerIcon from '../assets/logo.svg?react';
import ClickerButton from '../features/ClickerButton';

const MUSIC_ID = 'lofi_music_tab';

function Home() {
  const initialSavedRef = useRef(loadGameState() || {});
  const { playClick, playUpgrade } = useSound();
  const { playMusic, stopMusic } = useContext(SoundContext);

  const defaultLevels = useMemo(
    () => Object.fromEntries(upgradeCatalog.map((upgrade) => [upgrade.id, 0])),
    []
  );

  const [levels, setLevels] = useState(() => ({
    ...defaultLevels,
    ...(initialSavedRef.current.levels || {}),
  }));

  const [codePoints, setCodePoints] = useState(
    () => initialSavedRef.current.codePoints ?? 0
  );

  // Derive stats from levels
  const { perClick, passivePointGain } = useMemo(
    () => deriveStats(levels),
    [levels]
  );

  // Save the game state (points and upgrades)
  useEffect(() => {
    saveGameState({ levels, codePoints });
  }, [levels, codePoints]);

  useEffect(() => {
    // Only set up if the music upgrade is owned
    if ((levels[MUSIC_ID] ?? 0) < 1) return;

    // When owned, ensure audio is resumed once a user gesture occurs
    const startMusic = () => {
      try {
        Howler?.ctx?.resume?.();
      } catch {}
      playMusic();
    };

    window.addEventListener('pointerdown', startMusic, { once: true });
    return () => {
      window.removeEventListener('pointerdown', startMusic);
    };
  }, [levels, playMusic]);

  useEffect(() => {
    const owned = (levels[MUSIC_ID] ?? 0) >= 1;
    if (owned) {
      try {
        Howler?.ctx?.resume?.();
      } catch {}
      playMusic();
    } else {
      stopMusic();
    }
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
  const handleClick = useCallback(() => {
    setCodePoints((prev) => prev + perClick);
    playClick();
  }, [perClick, playClick]);

  const handleUpgrade = useCallback(
    (upgrade) => {
      const cost = getCost(upgrade.id, levels);
      if (codePoints < cost) return;

      setCodePoints((prev) => prev - cost);
      setLevels((prev) => {
        const nextLevel = (prev[upgrade.id] ?? 0) + 1;
        const next = { ...prev, [upgrade.id]: nextLevel };

        if (upgrade.id === MUSIC_ID && nextLevel === 1) {
          try {
            Howler?.ctx?.resume?.();
          } catch {}
          playMusic();
        }

        return next;
      });
      playUpgrade();
    },
    [codePoints, levels, playMusic, playUpgrade]
  );

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
