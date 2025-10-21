import useTheme from '../shared/Theme/useTheme';
import NavMenu from '../shared/NavigationMenu/NavMenu';
import useSound from '../shared/Sounds/useSound';
import styles from './Settings.module.css';

function Settings() {
  const { theme, setTheme } = useTheme();

  function handleThemeChange(event) {
    setTheme(event.target.value);
  }

  return (
    <div className={styles.settingsContainer}>
      <NavMenu />
      <div className={styles.header}>
        <h4 className={styles.title}>Settings</h4>
        <p>Placeholder text</p>
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
          <form>
            <input
              type="radio"
              id="lightMode"
              name="theme"
              checked={theme === 'light'}
              value="light"
              onChange={(e) => handleThemeChange(e)}
            />
            <label for="html">Light</label>
            <br />
            <input
              type="radio"
              id="darkMode"
              name="theme"
              checked={theme === 'dark'}
              value="dark"
              onChange={(e) => handleThemeChange(e)}
            />
            <label for="css">Dark</label>
            <br />
          </form>
        </section>

        <section id="audio" className={styles.audioContainer}>
          <h5>Display</h5>
          <p>Adjust the color of the interface for better visibility.</p>
          <hr />
        </section>

        <section id="gameplay" className={styles.audioContainer}>
          <h5>Display</h5>
          <p>Adjust the color of the interface for better visibility.</p>
          <hr />
        </section>
      </main>
    </div>
  );
}

export default Settings;
