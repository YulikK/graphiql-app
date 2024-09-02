import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

import { Inter } from 'next/font/google';

import { AuthProvider } from '@/shared/contexts/index.ts';
import './globals.css';

import 'react-toastify/dist/ReactToastify.css';
import { StyledRoot } from '../shared/theme/styled-root.tsx';

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
          <AppRouterCacheProvider>
            <StyledRoot>
              {children}
              <ToastContainer position="top-center" autoClose={2000} />
            </StyledRoot>
          </AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
