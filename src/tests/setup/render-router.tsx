import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';

import { AuthProvider } from '@/shared/contexts';
import { AlertProvider } from '@/shared/contexts/alert-context';
import { ThemeAppProvider } from '@/shared/contexts/theme-provider';
import GraphqlSlice from '@/shared/store/slices/grahpql-client';
import RestSlice from '@/shared/store/slices/rest-slice';
import StoreProvider from '@/shared/store/store-providers';
import { StyledRoot } from '@/shared/theme/styled-root';

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
          <AppRouterCacheProvider>
            <StoreProvider>
              <StyledRoot>{children}</StyledRoot>
            </StoreProvider>
          </AppRouterCacheProvider>
        </ThemeAppProvider>
      </AuthProvider>
    </AlertProvider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
