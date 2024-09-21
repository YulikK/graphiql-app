import { configureStore } from '@reduxjs/toolkit';

import GraphqlSlice from './slices/grahpql-client';
import RestSlice from './slices/rest-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [RestSlice.reducerPath]: RestSlice.reducer,
      [GraphqlSlice.reducerPath]: GraphqlSlice.reducer,
    },
  });
};
