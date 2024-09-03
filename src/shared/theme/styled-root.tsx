'use client';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { useTheme } from '@/shared/contexts';

import { darkTheme, lightTheme } from './theme';

export function StyledRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { darkMode } = useTheme();
  const styledTheme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={styledTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
