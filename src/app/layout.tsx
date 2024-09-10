import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';

import { AlertProvider } from '@/shared/contexts/alert-context';
import { HistoryProvider } from '@/shared/contexts/history-context';
import { AuthProvider } from '@/shared/contexts/index.ts';
import { ThemeAppProvider } from '@/shared/contexts/theme-provider';
import StoreProvider from '@/shared/store/store-providers';
import { StyledRoot } from '@/shared/theme/styled-root.tsx';
import 'allotment/dist/style.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'GraphQl-Rest client',
  description: 'GraphQl-Rest api client',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '60x67',
      url: '/favicon.png',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AlertProvider>
          <AuthProvider>
            <ThemeAppProvider>
              <HistoryProvider>
                <AppRouterCacheProvider>
                  <StoreProvider>
                    <StyledRoot>{children}</StyledRoot>
                  </StoreProvider>
                </AppRouterCacheProvider>
              </HistoryProvider>
            </ThemeAppProvider>
          </AuthProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
