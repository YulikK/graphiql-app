import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';

import { AuthProvider } from '../contexts';
import { AlertProvider } from '../contexts/alert-context';
import { HistoryProvider } from '../contexts/history-context';
import { ThemeAppProvider } from '../contexts/theme-provider';
import GraphqlSlice from '../store/slices/grahpql-client';
import RestSlice from '../store/slices/rest-slice';
import StoreProvider from '../store/store-providers';
import { StyledRoot } from '../theme/styled-root';

const rootReducer = combineReducers({
  [RestSlice.reducerPath]: RestSlice.reducer,
  [GraphqlSlice.reducerPath]: GraphqlSlice.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export async function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
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
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
