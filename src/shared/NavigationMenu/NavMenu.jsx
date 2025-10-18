import { NavLink } from 'react-router';
import { useState } from 'react';
import styles from './NavMenu.module.css';
import HomeIcon from '../../assets/home.svg?react';
import SettingsIcon from '../../assets/settings.svg?react';
import AchievementsIcon from '../../assets/trophy.svg?react';

function NavMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <nav
        className={`${styles.panel} ${open ? styles.open : ''}`}
        aria-hidden={!open}
      >
        <ul className={styles.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : styles.inactive}`
              }
              onClick={() => setOpen(false)}
            >
              <HomeIcon className={styles.icon} />
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/Settings"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : styles.inactive}`
              }
              onClick={() => setOpen(false)}
            >
              <SettingsIcon className={styles.icon} />
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/Achievements "
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : styles.inactive}`
              }
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
