import { useContext } from 'react';

import { AuthContext } from './auth-provider';
import { ThemeAppContext } from './theme-provider';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth hook must be used within a AuthProvider');
  }

  return context;
};

export const useTheme = () => {
  const context = useContext(ThemeAppContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
