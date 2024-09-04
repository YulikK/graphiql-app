import GraphqlSlice from '../store/slices/grahpql-client';
import RestSlice from '../store/slices/rest-slice';
import { makeStore } from '../store/store';

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export type RestState = typeof RestSlice.getInitialState;

export type GraphqlState = typeof GraphqlSlice.getInitialState;
