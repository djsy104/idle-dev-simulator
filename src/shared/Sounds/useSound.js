import { useEffect, useContext, useMemo, useRef } from 'react';
import { Howl } from 'howler';
import { SFX_CONFIG } from './sfxConfig';
import { SoundContext } from './SoundProvider';

//Custom hook to manage and play sound effects
function useSound() {
  const currentContext = useContext(SoundContext);
  if (!currentContext) {
    throw new Error('useSound must be used within <SoundProvider>');
  }

  const { muted, volume } = currentContext;

  // Rebuild when any source URL changes (handles HMR)
  const configSignature = useMemo(() => {
    return Object.entries(SFX_CONFIG)
      .map(([k, cfg]) => {
        const srcs = Array.isArray(cfg.src) ? cfg.src : [cfg.src];
        return `${k}:${srcs.filter(Boolean).join(',')}`;
      })
      .sort()
      .join('|');
  }, []);

  const soundsRef = useRef(new Map());

  useEffect(() => {
    const oldMap = soundsRef.current;
    const newMap = new Map();

    for (const [key, cfg] of Object.entries(SFX_CONFIG)) {
      const raw = Array.isArray(cfg.src) ? cfg.src : [cfg.src];

      // Filter to formats this browser can decode
      const sources = raw.filter(Boolean).filter((url) => {
        const ext = url.split('.').pop()?.toLowerCase();
        return ext && Howler.codecs(ext);
      });
      if (!sources[0]) {
        console.error(`SFX "${key}" has no playable source`, cfg);
        continue;
      }

      const howl = new Howl({
        src: sources,
        volume: typeof cfg.volume === 'number' ? cfg.volume : 1,
        preload: cfg.preload !== false, // default to true
      });

      newMap.set(key, howl);
    }

    soundsRef.current = newMap;

    // Unload the previous batch
    return () => {
      for (const h of oldMap.values()) h.unload();
    };
  }, [configSignature]);

  function play(soundName) {
    if (muted) return;

    const sound = soundsRef.current.get(soundName);
    if (!sound) {
      console.error(`No sound found for "${soundName}"`);
      return;
    }

    // Combine per-sound volume from config with global master volume
    const perSoundVolume = SFX_CONFIG[soundName]?.volume ?? 1;
    const finalVolume = Math.max(0, Math.min(1, perSoundVolume * volume));

    const id = sound.play();
    sound.volume(finalVolume, id);
  }

  return {
    play,
    playClick: () => play('click'),
    playUpgrade: () => play('upgrade'),
  };
}

export default useSound;
