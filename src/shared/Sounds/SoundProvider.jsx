import { Howler } from 'howler';
import { createContext, useEffect, useState, useMemo, useRef } from 'react';

const STORAGE_KEY = 'idledev.sound';

export const SoundContext = createContext();

function limitToUnitRange(n) {
  return Math.min(1, Math.max(0, n));
}

function SoundProvider({ children }) {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [musicVolume, setMusicVolume] = useState(0.4);
  const [sfxVolume, setSfxVolume] = useState(0.5);
  const musicRef = useRef(null);

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

  useEffect(() => {
    Howler.mute(muted);
    Howler.volume(limitToUnitRange(volume));
  }, [muted, volume]);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume(limitToUnitRange(musicVolume * volume));
    }
  }, [musicVolume, volume]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ muted, volume, musicVolume, sfxVolume })
      );
    } catch {}
  }, [muted, volume, musicVolume, sfxVolume]);

  function toggleMuted() {
    setMuted((prev) => !prev);
  }

  function playMusic(src) {
    if (musicRef.current) return; // music already playing
    musicRef.current = new Howl({
      src: Array.isArray(src) ? src : [src],
      loop: true,
      volume: limitToUnitRange(musicVolume * volume),
    });
    musicRef.current.play();
  }

  function stopMusic() {
    if (!musicRef.current) return;
    musicRef.current.stop();
    musicRef.current.unload();
    musicRef.current = null;
  }

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
    [muted, volume, musicVolume, sfxVolume]
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export default SoundProvider;
