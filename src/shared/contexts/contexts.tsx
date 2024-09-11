import { useContext } from 'react';

import { AlertContext } from './alert-context';
import { AuthContext } from './auth-provider';
import { HistoryContext } from './history-context';
import { ResizeContext } from './resize-provider';
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

export const useResizeContext = () => {
  const context = useContext(ResizeContext);

  if (!context) {
    throw new Error('useResizeContext must be used within a ResizeProvider');
  }

  return context;
};

export const useAlertBar = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useAlertBar must be used within an AlertProvider');
  }

  return context;
};

export const useHistory = () => {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error('useHistory must be used within an HistoryProvider');
  }

  return context;
};
