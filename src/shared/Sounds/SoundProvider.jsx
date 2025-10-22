import { Howler, Howl } from 'howler';
import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import musicTabTrack from "../../assets/You're my little flower.mp3";

const STORAGE_KEY = 'idledev.sound';

export const SoundContext = createContext();

// Keeps value wwithin range of 0.0 to 1.0
function limitToUnitRange(n) {
  return Math.min(1, Math.max(0, n));
}

function SoundProvider({ children }) {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [musicVolume, setMusicVolume] = useState(0.4);
  const [sfxVolume, setSfxVolume] = useState(0.5);
  const musicRef = useRef(null);
  const wantMusicRef = useRef(false);
  const MUSIC_SRC = [musicTabTrack];

  // Load persisted settings once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (typeof saved.muted === 'boolean') setMuted(saved.muted);
      if (typeof saved.volume === 'number') {
        const vol = Math.min(1, Math.max(0, saved.volume));
        setVolume(Number.isFinite(vol) ? vol : 1);
      }
      if (typeof saved.musicVolume === 'number') {
        setMusicVolume(limitToUnitRange(saved.musicVolume));
      }
      if (typeof saved.sfxVolume === 'number') {
        setSfxVolume(limitToUnitRange(saved.sfxVolume));
      }
    } catch {}
  }, []);

  // Keep changed settings
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ muted, volume, musicVolume, sfxVolume })
      );
    } catch {}
  }, [muted, volume, musicVolume, sfxVolume]);

  // Apply global mute and master volume
  useEffect(() => {
    Howler.mute(muted);
    Howler.volume(limitToUnitRange(volume));
  }, [muted, volume]);

  // Gesture unlock and tab visibility resume
  useEffect(() => {
    const tryResume = () => {
      if (!wantMusicRef.current) return;
      try {
        Howler?.ctx?.resume?.();
      } catch {}
      if (musicRef.current && !musicRef.current.playing()) {
        musicRef.current.play();
      }
    };

    const onPointerDown = () => tryResume();
    const onVisibility = () => {
      if (document.visibilityState === 'visible') tryResume();
    };

    window.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Keep music howl volume in sync
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume(limitToUnitRange(musicVolume * volume));
    }
  }, [musicVolume, volume]);

  function toggleMuted() {
    setMuted((prev) => !prev);
  }

  // Play the music track; safe if called reaptedly
  const playMusic = useCallback(() => {
    try {
      Howler?.ctx?.resume?.();
    } catch {}
    wantMusicRef.current = true;

    if (!musicRef.current) {
      musicRef.current = new Howl({
        src: MUSIC_SRC,
        loop: true,
        volume: limitToUnitRange(musicVolume * volume),
      });
    }
    if (!musicRef.current.playing()) {
      musicRef.current.play();
    }
  }, [MUSIC_SRC, musicVolume, volume]);

  const stopMusic = useCallback((opts = {}) => {
    const { unload = false } = opts;
    wantMusicRef.current = false;
    if (!musicRef.current) return;
    try {
      musicRef.current.stop();
      if (unload) {
        musicRef.current.unload();
        musicRef.current = null;
      }
    } catch {}
  }, []);

  const value = useMemo(
    () => ({
      muted,
      setMuted,
      toggleMuted,
      volume,
      setVolume,
      musicVolume,
      setMusicVolume,
      sfxVolume,
      setSfxVolume,
      playMusic,
      stopMusic,
    }),
    [muted, volume, musicVolume, sfxVolume, playMusic, stopMusic]
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export default SoundProvider;
