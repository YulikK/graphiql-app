import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

import { Inter } from 'next/font/google';

import { AuthProvider } from '@/shared/contexts/index.ts';
import { ThemeAppProvider } from '@/shared/contexts/theme-provider';
import StoreProvider from '@/shared/store/store-providers';
import { StyledRoot } from '@/shared/theme/styled-root.tsx';
import 'allotment/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
        <AuthProvider>
          <ThemeAppProvider>
            <AppRouterCacheProvider>
              <StoreProvider>
                <StyledRoot>
                  {children}
                  <ToastContainer position="top-center" autoClose={2000} />
                </StyledRoot>
              </StoreProvider>
            </AppRouterCacheProvider>
          </ThemeAppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
