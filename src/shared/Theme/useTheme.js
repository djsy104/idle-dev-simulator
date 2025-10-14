import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

function useTheme() {
  const currentContext = useContext(ThemeContext);
  if (!currentContext) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return currentContext;
}

export default useTheme;
