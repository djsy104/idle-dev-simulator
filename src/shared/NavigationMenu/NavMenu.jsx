import { NavLink } from 'react-router';
import { useState, useCallback } from 'react';
import styles from './NavMenu.module.css';
import HomeIcon from '../../assets/home.svg?react';
import SettingsIcon from '../../assets/settings.svg?react';
import AchievementsIcon from '../../assets/trophy.svg?react';

function NavMenu() {
  const [open, setOpen] = useState(false);
  const linkClass = useCallback(
    ({ isActive }) =>
      `${styles.item} ${isActive ? styles.active : styles.inactive}`,
    []
  );

  return (
    <div className={styles.wrapper}>
      <nav
        className={`${styles.panel} ${open ? styles.open : ''}`}
        aria-hidden={!open}
        id="main-menu"
        aria-label="Main"
      >
        <ul className={styles.list}>
          <li>
            <NavLink
              to="/"
              aria-label="Home"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              <HomeIcon className={styles.icon} />
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/Settings"
              aria-label="Settings"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              <SettingsIcon className={styles.icon} />
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/Achievements"
              aria-label="Achievements"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              <AchievementsIcon className={styles.icon} />
            </NavLink>
          </li>
        </ul>
      </nav>

      <button
        className={`${styles.fab} ${open ? styles.open : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>
    </div>
  );
}

export default NavMenu;
