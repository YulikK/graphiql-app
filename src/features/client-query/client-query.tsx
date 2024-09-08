import { useTranslations } from 'next-intl';

import { Alert, Snackbar } from '@mui/material';
import { buildClientSchema } from 'graphql';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import useGraphRequest from '@/shared/hooks/use-graph-request';
import { selectGraphqlData } from '@/shared/store/selectors/general-graph-selector';
import {
  setGraphQuery,
  setGraphSchema,
} from '@/shared/store/slices/grahpql-client';
import { fetchGraphSchema } from '@/shared/utils/get-graph-schem';

import { CodeEditor } from '../code-editor/code-editor';

export const GraphQuery = () => {
  const makeRequest = useGraphRequest();

  const dispatch = useAppDispatch();

  const { query, schema, url, urlDoc, isTrySchemaDownload } =
    useAppSelector(selectGraphqlData);

  const [error, setError] = useState<string | null>(null);

  const t = useTranslations('GraphqlPage');

  function getGraphSchema() {
    if (schema === '') return null;

    try {
      return buildClientSchema(JSON.parse(schema));
    } catch (error) {
      setError(`${t('error-parse-schema')}: ${error}`);

      return null;
    }
  }

  const graphqlSchema = getGraphSchema();

  useEffect(() => {
    if (!schema && (url || urlDoc) && !isTrySchemaDownload) {
      fetchGraphSchema(url || urlDoc).then(data => {
        dispatch(setGraphSchema(data));
      });
    }
  }, [schema, url, urlDoc, isTrySchemaDownload, dispatch]);

  const handleGraphqlChange = (value: string) => {
    dispatch(setGraphQuery(value));
  };

  return (
    <>
      <CodeEditor
        isGraphQl={true}
        schema={graphqlSchema}
        value={query}
        onChange={handleGraphqlChange}
        onSubmit={makeRequest}
      />
      <Snackbar
        open={!!error}
        onClose={() => setError(null)}
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
