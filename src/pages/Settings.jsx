import { useContext, useState } from 'react';
import { SoundContext } from '../shared/Sounds/SoundProvider';
import { clearGameState } from '../shared/Storage/gameState';
import { useNavigate } from 'react-router';
import useTheme from '../shared/Theme/useTheme';
import NavMenu from '../shared/NavigationMenu/NavMenu';
import styles from './Settings.module.css';

function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const {
    muted,
    setMuted,
    volume,
    setVolume,
    musicVolume,
    setMusicVolume,
    sfxVolume,
    setSfxVolume,
    stopMusic,
  } = useContext(SoundContext);

  // Validation for existing theme radios
  const [displayTouched, setDisplayTouched] = useState(false);
  const themeChosen = theme === 'light' || theme === 'dark';
  const displayError = displayTouched && !themeChosen ? 'Select a theme.' : '';

  function handleThemeChange(event) {
    setTheme(event.target.value);
  }

  function handleDisplaySubmit(e) {
    e.preventDefault();
    setDisplayTouched(true);
    const hasError = !(theme === 'light' || theme === 'dark');
    if (hasError) return;
  }

  function handleResetGame() {
    const confirmationPrompt = window.confirm(
      'Reset all progress and upgrades? This cannot be undone.'
    );
    if (!confirmationPrompt) {
      return;
    }
    try {
      clearGameState();
      stopMusic({ unload: true });
    } catch {}
    // Force Home to remount
    navigate('/', { replace: true });
  }

  return (
    <div className={styles.settingsContainer}>
      <NavMenu />
      <div className={styles.header}>
        <h4 className={styles.title}>Settings</h4>
        <hr />
      </div>
      <aside className={styles.sidebar}>
        <a href="#display" className={styles.navigationLink}>
          Display
        </a>
        <a href="#audio" className={styles.navigationLink}>
          Audio
        </a>
        <a href="#gameplay" className={styles.navigationLink}>
          Gameplay
        </a>
      </aside>
      <main className={styles.mainContainer}>
        <section id="display" className={styles.displayContainer}>
          <h5>Display</h5>
          <p>Adjust the color of the interface for better visibility.</p>
          <hr />
          <form
            className={styles.radioContainer}
            onSubmit={handleDisplaySubmit}
            noValidate
          >
            <div>
              <input
                type="radio"
                id="lightMode"
                name="theme"
                className={styles.radioButton}
                checked={theme === 'light'}
                value="light"
                onChange={handleThemeChange}
              />
              <label htmlFor="lightMode" className={styles.radioLabels}>
                Light
              </label>
              <div className={styles.check}></div>
            </div>
            <div>
              <input
                type="radio"
                id="darkMode"
                name="theme"
                className={styles.radioButton}
                checked={theme === 'dark'}
                value="dark"
                onChange={(e) => handleThemeChange(e)}
              />
              <label htmlFor="darkMode" className={styles.radioLabels}>
                Dark
              </label>
              <div className={styles.check}></div>
            </div>

            {displayError && (
              <div role="alert" className={styles.errorText}>
                {displayError}
              </div>
            )}
            <button
              type="submit"
              className={styles.saveButton}
              disabled={!!displayError}
            >
              Save Display
            </button>
          </form>
        </section>

        <section id="audio" className={styles.audioContainer}>
          <h5>Audio</h5>
          <p>Adjust the audio settings to fit your preferences.</p>
          <hr />
          <form>
            <label className={styles.audioLabels}>Master Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
            <label className={styles.audioLabels}>Music Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={musicVolume}
              onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
            />
            <label className={styles.audioLabels}>SFX Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={sfxVolume}
              onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
            />
          </form>
        </section>

        <section id="gameplay" className={styles.gameContainer}>
          <h5>Gameplay</h5>
          <p>Customize your gameplay experience.</p>
          <hr />
          <button
            type="button"
            onClick={handleResetGame}
            className={styles.resetButton}
            aria-label="Reset all game progress"
          >
            Reset Game State
          </button>
        </section>
      </main>
    </div>
  );
}

export default Settings;
