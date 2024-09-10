'use client';

import { createContext, useMemo, useState } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

type ThemeProviderProps = {
  children?: React.ReactNode;
  initTheme?: string;
};

export const ThemeAppContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeAppProvider = ({
  children,
  initTheme,
}: ThemeProviderProps) => {
  // const prefersDarkMode = getInitialTheme(headers()) === 'dark';

  const [darkMode, setDarkMode] = useState<boolean>(initTheme === 'dark');

  const toggleTheme = () => {
    setDarkMode(prevTheme => !prevTheme);
  };

  // useEffect(() => {
  //   setDarkMode(prefersDarkMode);
  // }, [prefersDarkMode]);

  const value = useMemo(() => ({ darkMode, toggleTheme }), [darkMode]);

  return (
    <ThemeAppContext.Provider value={value}>
      {children}
    </ThemeAppContext.Provider>
  );
};
