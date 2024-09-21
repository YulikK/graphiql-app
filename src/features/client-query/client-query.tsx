import { useTranslations } from 'next-intl';

import { debounce } from '@mui/material';
import { useEffect, useRef } from 'react';

import { useAlertBar } from '@/shared/contexts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import useGraphRequest from '@/shared/hooks/use-graph-request';
import { selectGraphqlData } from '@/shared/store/selectors/general-graph-selector';
import {
  setGraphQuery,
  setGraphSchema,
} from '@/shared/store/slices/grahpql-client';
import {
  getGraphSchema,
  getGraphSchemaOnServer,
} from '@/shared/utils/get-graph-schem';

import { CodeEditor } from '../code-editor/code-editor';

export const GraphQuery = () => {
  const makeRequest = useGraphRequest();

  const dispatch = useAppDispatch();

  const { setError } = useAlertBar();

  const { query, schema, urlDoc, isTrySchemaDownload } =
    useAppSelector(selectGraphqlData);

  const t = useTranslations('GraphqlPage');

  function makeGraphSchema() {
    try {
      if (!schema) return null;

      return getGraphSchema(schema);
    } catch (error) {
      setError(`${t('error-parse-schema')}: ${error}`);

      return null;
    }
  }

  const graphqlSchema = makeGraphSchema();

  const fetchSchemaRef = useRef(
    debounce((urlDoc: string, schema, isTrySchemaDownload) => {
      if (!schema && urlDoc !== '' && !isTrySchemaDownload) {
        getGraphSchemaOnServer(urlDoc)
          .then(introspectionJSON => {
            dispatch(setGraphSchema(introspectionJSON));
          })
          .catch(err => {
            setError((err as Error).message);
          });
      }
    }, 1000)
  );

  useEffect(() => {
    const fetchSchema = fetchSchemaRef.current;

    fetchSchema(urlDoc, schema, isTrySchemaDownload);
  }, [urlDoc, schema, isTrySchemaDownload, dispatch]);

  const handleGraphqlChange = (value: string) => {
    dispatch(setGraphQuery(value));
  };

  return (
    <CodeEditor
      isGraphQl={true}
      schema={graphqlSchema}
      value={query}
      onChange={handleGraphqlChange}
      onSubmit={makeRequest}
      onBlur={makeRequest}
    />
  );
};
