import '@testing-library/jest-dom';
import React from 'react';
global.React = React;

vi.mock('next/font/google', () => ({
  Roboto: () => ({
    style: {
      fontFamily: 'Roboto, sans-serif',
    },
  }),
}));

vi.mock('@/shared/services/firebase/firebase.ts', () => ({
  app: {},
  auth: {
    onAuthStateChanged: vi.fn(() => {
      return () => {};
    }),
  },
  db: {},
}));

export const testGetParams = vi.fn();

export const testRouterPush = vi.fn();

export const testUseAuth = vi.fn();

export const testUseLocale = vi.fn();

export const testUseTranslations = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: (): { push: () => void } => ({ push: testRouterPush }),
  usePathname: (): string => '/',
  useSearchParams: (): object => ({
    get: testGetParams,
  }),
}));

vi.mock('@/shared/contexts', async importOriginal => {
  const actual = await importOriginal();

  return {
    ...(typeof actual === 'object' ? actual : {}),
    useAuth: testUseAuth,
  };
});

vi.mock('next-intl', () => ({
  useLocale: testUseLocale,
  useTranslations: testUseTranslations,
}));
