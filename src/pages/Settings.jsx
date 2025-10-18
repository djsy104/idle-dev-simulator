import { NavLink, Link } from 'react-router';
import NavMenu from '../shared/NavigationMenu/NavMenu';
import styles from './Settings.module.css';

function Settings() {
  return (
    <div className={styles.settingsContainer}>
      <NavMenu />
      <div className={styles.header}>
        <h4 className={styles.title}>Settings</h4>
        <p>Placeholder text</p>
      </div>
      <aside className={styles.sidebar}>
        <a href="">Display</a>
        <a href="">Audio</a>
        <a href="">Gameplay</a>
      </aside>
      <main className={styles.main}></main>
    </div>
  );
}

export default Settings;
