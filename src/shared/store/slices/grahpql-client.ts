import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import ChangeVariableItem from '@/shared/models/change-variable-item';
import checkLastTuple from '@/shared/utils/check-last-tuple';

const initialState: {
  url: string;
  urlDoc: string;
  query: string;
  schema: string;
  // body: string;
  // method: HttpMethods;
  headers: string[][];
  variables: string;
  // textMode: boolean;
} = {
  url: '',
  urlDoc: '',
  query: '',
  schema: '',
  // body: '',
  // method: 'GET',
  headers: [
    ['Content-type', 'application/json'],
    ['', ''],
  ],
  variables: '',
  // textMode: false,
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
      }
    },
    setGraphUrlDoc(state, { payload }: PayloadAction<string>) {
      state.urlDoc = payload;
    },
    setGraphSchema(state, { payload }: PayloadAction<string>) {
      state.schema = payload;
    },

    // setRestQuery(
    //   state,
    //   {
    //     payload: { index, keyOrValue, newValue },
    //   }: PayloadAction<ChangeVariableItem>
    // ) {
    //   const temp = [...state.query];
    //   temp[index][keyOrValue] = newValue;
    //   [state.url, state.query] = updateUlrAndQuery(state.url, temp);
    // },
    // deleteRestQuery(state, { payload }: PayloadAction<number>) {
    //   const newParams = state.query;
    //   newParams.splice(payload, 1);
    //   [state.url, state.query] = updateUlrAndQuery(state.url, newParams);
    // },
    // setRestMethod(state, { payload }: PayloadAction<HttpMethods>) {
    //   state.method = payload;
    // },
    // setRestBody(state, { payload }: PayloadAction<string>) {
    //   state.body = payload;
    // },
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
    // deleteRestVariables(state, { payload }: PayloadAction<number>) {
    //   const newVariables = state.variables;
    //   newVariables.splice(payload, 1);
    //   state.variables = checkLastTuple(newVariables);
    // },
    // handleRestBodyMode(state, { payload }: PayloadAction<boolean>) {
    //   state.textMode = payload;
    // },
  },
});

export const {
  setGraphUrl,
  setGraphUrlDoc,
  setGraphSchema,
  // setRestQuery,
  // deleteRestQuery,
  // setRestVariables,
  setRestVariables,
  setGraphHeader,
  deleteGraphHeader,
  // setRestBody,
  // setRestMethod,
  // handleRestBodyMode,
} = GraphqlSlice.actions;

export default GraphqlSlice;
