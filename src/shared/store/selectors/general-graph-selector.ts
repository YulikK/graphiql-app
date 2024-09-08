import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/shared/models/redux-types';

const selectGraphqlState = (state: RootState) => state['graphql-slice'];

export const selectGraphqlData = createSelector(
  [selectGraphqlState],
  graphqlState => ({
    query: graphqlState.query,
    schema: graphqlState.schema,
    url: graphqlState.url,
    urlDoc: graphqlState.urlDoc,
    isTrySchemaDownload: graphqlState.isTrySchemaDownload,
  })
);
