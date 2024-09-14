import { StateField } from '@codemirror/state';
import React from 'react';

import '@testing-library/jest-dom';
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

export const testUseTranslations = vi.fn(() => (key: string) => key);

export const testUseAppDispatch = vi.fn();

export const testUseAppSelector = vi.fn();

export const testUseGraphRequest = vi.fn();

export const testUseResizeContext = vi.fn();

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
    useResizeContext: testUseResizeContext,
  };
});

vi.mock('next-intl', () => ({
  useLocale: testUseLocale,
  useTranslations: testUseTranslations,
}));

vi.mock('@/shared/hooks/redux-hooks', () => ({
  useAppDispatch: testUseAppDispatch,
  useAppSelector: testUseAppSelector,
}));

vi.mock('@/shared/hooks/use-graph-request', () => ({
  default: testUseGraphRequest,
}));

vi.mock('graphql', async () => {
  const actual = await vi.importActual('graphql');

  return {
    ...actual,
    buildClientSchema: () => 'schema',
  };
});
vi.mock('@codemirror/lang-json', () => {
  return {
    json: () => ({
      language: () => ({
        parser: {
          configure: () => ({}),
        },
      }),
      extension: StateField.define({
        create: () => ({}),
        update: () => ({}),
      }),
    }),
  };
});

vi.mock('thememirror', () => {
  return {
    dracula: {
      extension: StateField.define({
        create: () => ({}),
        update: () => ({}),
      }),
    },
    tomorrow: {
      extension: StateField.define({
        create: () => ({}),
        update: () => ({}),
      }),
    },
  };
});
