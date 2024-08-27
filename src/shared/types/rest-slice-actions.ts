import RestSlice from '../store/slices/rest-slice';

export type RestSliceActions =
  (typeof RestSlice.actions)[keyof typeof RestSlice.actions];
