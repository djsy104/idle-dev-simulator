import { Howler } from 'howler';
import { createContext, useEffect, useState, useMemo } from 'react';

const STORAGE_KEY = 'idledev.sound';

export const SoundContext = createContext();

function SoundProvider({ children }) {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (typeof saved.muted === 'boolean') setMuted(saved.muted);
      if (typeof saved.volume === 'number') {
        const vol = Math.min(1, Math.max(0, saved.volume));
        setVolume(Number.isFinite(v) ? v : 1);
      }
    } catch {}
  }, []);

  useEffect(() => {
    Howler.mute(muted);
    Howler.volume(volume);
  }, [muted, volume]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ muted, volume }));
    } catch {}
  }, [muted, volume]);

  // function toggleMuted() {
  //   setMuted((prev) => {
  //     const newVal = !prev;
  //     Howler.mute(newVal);
  //     return newVal;
  //   });
  // }

  function playMusic(src) {
    if (musicHowl) return; // music already playing
    musicHowl = new Howl({
      src: Array.isArray(src) ? src : [src],
      loop: true,
      volume: 0.4 * volume,
    });
    musicHowl.play();
  }

  function stopMusic() {
    if (!musicHowl) return;
    musicHowl.stop();
    musicHowl.unload();
    musicHowl = null;
  }

  const value = useMemo(
    () => ({ muted, setMuted, volume, setVolume, playMusic, stopMusic }),
    [muted, volume]
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export default SoundProvider;
