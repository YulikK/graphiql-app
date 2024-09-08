'use client';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createContext, useEffect, useMemo, useState } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

type ThemeProviderProps = {
  children?: React.ReactNode;
};

export const ThemeAppContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeAppProvider = ({ children }: ThemeProviderProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [darkMode, setDarkMode] = useState<boolean>(prefersDarkMode);

  const toggleTheme = () => {
    setDarkMode((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  const value = useMemo(() => ({ darkMode, toggleTheme }), [darkMode]);

  return (
    <ThemeAppContext.Provider value={value}>
      {children}
    </ThemeAppContext.Provider>
  );
};
