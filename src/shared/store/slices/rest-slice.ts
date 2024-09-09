import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import ChangeVariableItem from '@/shared/models/change-variable-item';
import { HttpMethod, HttpMethodType } from '@/shared/models/http-methods';
import checkLastTuple from '@/shared/utils/check-last-tuple';
import updateUlrAndQuery from '@/shared/utils/update-url-and-query';

const initialState: {
  url: string;
  query: string[][];
  body: string;
  method: HttpMethodType;
  headers: string[][];
  variables: string[][];
  textMode: boolean;
} = {
  url: '',
  query: [['', '']],
  body: '',
  method: HttpMethod.GET,
  headers: [
    ['Content-type', 'application/json'],
    ['', ''],
  ],
  variables: [['', '']],
  textMode: false,
};

const RestSlice = createSlice({
  name: 'rest-slice',
  initialState,
  reducers: {
    setRestUrl(state, { payload }: PayloadAction<string>) {
      state.url = payload;

      const index = payload.indexOf('?');

      if (index >= 0) {
        const params = payload.slice(index + 1).split('&');

        if (!params) return;

        let newParams =
          params.reduce((acc, item) => {
            const result = item.split('=');

            if (result[0] || result[1]) {
              return [...acc, result];
            }

            return acc;
          }, [] as string[][]) || [];

        newParams = checkLastTuple(newParams);

        const result = newParams.length ? [...newParams] : [['', '']];

        state.query = result;

        return;
      }

      state.query = initialState.query;
    },

    setRestQuery(
      state,
      {
        payload: { index, keyOrValue, newValue },
      }: PayloadAction<ChangeVariableItem>
    ) {
      const temp = [...state.query];

      temp[index][keyOrValue] = newValue;
      [state.url, state.query] = updateUlrAndQuery(state.url, temp);
    },
    deleteRestQuery(state, { payload }: PayloadAction<number>) {
      const newParams = state.query;

      newParams.splice(payload, 1);
      [state.url, state.query] = updateUlrAndQuery(state.url, newParams);
    },
    setRestMethod(state, { payload }: PayloadAction<HttpMethodType>) {
      state.method = payload;
    },
    setRestBody(state, { payload }: PayloadAction<string>) {
      state.body = payload;
    },
    setRestHeader(
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
    deleteRestHeader(state, { payload }: PayloadAction<number>) {
      const newHeaders = state.headers;

      newHeaders.splice(payload, 1);
      state.headers = checkLastTuple(newHeaders);
    },
    setRestVariables(
      state,
      {
        payload: { index, keyOrValue, newValue },
      }: PayloadAction<ChangeVariableItem>
    ) {
      const temp = state.variables;

      temp[index][keyOrValue] = newValue;

      const filtered = temp.filter(([key, value]) => key || value);

      state.variables = checkLastTuple(filtered);
    },
    deleteRestVariables(state, { payload }: PayloadAction<number>) {
      const newVariables = state.variables;

      newVariables.splice(payload, 1);
      state.variables = checkLastTuple(newVariables);
    },
    handleRestBodyMode(state, { payload }: PayloadAction<boolean>) {
      state.textMode = payload;
    },
  },
});

export const {
  setRestUrl,
  setRestQuery,
  deleteRestQuery,
  setRestVariables,
  deleteRestVariables,
  setRestHeader,
  deleteRestHeader,
  setRestBody,
  setRestMethod,
  handleRestBodyMode,
} = RestSlice.actions;

export default RestSlice;
