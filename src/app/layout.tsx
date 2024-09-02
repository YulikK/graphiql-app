import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

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
      <Head>
        <script
          src="https://unpkg.com/prettier@2.6.2/standalone.js"
          async
        ></script>
        <script
          src="https://unpkg.com/prettier@2.6.2/parser-babel.js"
          async
        ></script>
      </Head>
      <body>
        <AppRouterCacheProvider>
          <StyledRoot>{children}</StyledRoot>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
