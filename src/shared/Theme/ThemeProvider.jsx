import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const THEME_KEY = 'idledev.theme';

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // keep initial theme consistent with saved preference
    try {
      return localStorage.getItem(THEME_KEY) || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
