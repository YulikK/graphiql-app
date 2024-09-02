import { configureStore } from '@reduxjs/toolkit';

import RestSlice from './slices/rest-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [RestSlice.reducerPath]: RestSlice.reducer,
    },
  });
};
