import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import ChangeVariableItem from '@/shared/models/change-variable-item';
import checkLastTuple from '@/shared/utils/check-last-tuple';

const initialState: {
  url: string;
  urlDoc: string;
  query: string;
  schema: string;
  isTrySchemaDownload: boolean;
  headers: string[][];
  variables: string;
} = {
  url: '',
  urlDoc: '',
  query: '',
  schema: '',
  isTrySchemaDownload: false,
  headers: [
    ['Content-type', 'application/json'],
    ['', ''],
  ],
  variables: '',
};

const GraphqlSlice = createSlice({
  name: 'graphql-slice',
  initialState,
  reducers: {
    setGraphUrl(state, { payload }: PayloadAction<string>) {
      const prevUrl = state.url;
      state.url = payload;
      if (!state.urlDoc || state.urlDoc === `${prevUrl}?sdl`) {
        state.urlDoc = `${state.url}?sdl`;
      }
      if (!payload) {
        state.urlDoc = '';
        state.schema = '';
        state.isTrySchemaDownload = false;
      }
    },
    setGraphUrlDoc(state, { payload }: PayloadAction<string>) {
      state.urlDoc = payload;
      if (!payload) {
        state.schema = '';
        state.isTrySchemaDownload = false;
      }
    },
    setGraphSchema(state, { payload }: PayloadAction<string>) {
      state.schema = payload;
      state.isTrySchemaDownload = true;
    },
    setGraphQuery(state, { payload }: PayloadAction<string>) {
      state.query = payload;
    },
    setGraphHeader(
      state,
      {
        payload: { index, keyOrValue, newValue },
      }: PayloadAction<ChangeVariableItem>
    ) {
      const temp = state.headers;
      temp[index][keyOrValue] = newValue;
      const filtered = temp.filter(([key, value]) => key || value);
      state.headers = checkLastTuple(filtered);
    },
    deleteGraphHeader(state, { payload }: PayloadAction<number>) {
      const newHeaders = state.headers;
      newHeaders.splice(payload, 1);
      state.headers = checkLastTuple(newHeaders);
    },
    setRestVariables(state, { payload }: PayloadAction<string>) {
      state.variables = payload;
    },
  },
});

export const {
  setGraphUrl,
  setGraphUrlDoc,
  setGraphSchema,
  setGraphQuery,
  setRestVariables,
  setGraphHeader,
  deleteGraphHeader,
} = GraphqlSlice.actions;

export default GraphqlSlice;
