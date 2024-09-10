import { useTranslations } from 'next-intl';

import {
  DocExplorer,
  GraphiQLProvider,
  useTheme as useDocTheme,
} from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  Tooltip,
} from '@mui/material';
import 'graphiql/graphiql.min.css';
import { useEffect, useState } from 'react';

import { useAlertBar, useTheme as useAppTheme } from '@/shared/contexts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import { setGraphSchema } from '@/shared/store/slices/grahpql-client';
import { getGraphSchema } from '@/shared/utils/get-graph-schem';

export const Docs = () => {
  const [showDoc, setShowDoc] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { setError } = useAlertBar();

  const dispatch = useAppDispatch();

  const t = useTranslations('GraphqlPage');

  const urlDoc = useAppSelector(state => state['graphql-slice'].urlDoc);

  const schema = useAppSelector(state => state['graphql-slice'].schema);

  function makeGraphSchema() {
    try {
      return getGraphSchema(schema);
    } catch (error) {
      setError(`${t('error-parse-schema')}: ${error}`);

      return null;
    }
  }

  const graphqlSchema = makeGraphSchema();

  const fetcher = urlDoc ? createGraphiQLFetcher({ url: urlDoc }) : null;

  const { setTheme } = useDocTheme();

  const { darkMode } = useAppTheme();

  useEffect(() => {
    setTheme(darkMode ? 'dark' : 'light');
  }, [darkMode, setTheme]);

  const handleDocOpen = async () => {
    if (!urlDoc) {
      setError(t('error-no-doc-url'));

      return;
    }

    try {
      if (!schema) {
        setError(null);

        setIsLoading(true);

        // const introspectionJSON = await fetchGraphSchema(urlDoc);
        const response = await fetch(
          `/api/graphql-schema?urlDoc=${encodeURIComponent(urlDoc)}`
        );

        const introspectionJSON = await response.json();

        // dispatch(setGraphSchema(JSON.stringify(introspectionJSON, null, 2)));
        dispatch(setGraphSchema(introspectionJSON));
        setIsLoading(false);
      }

      setShowDoc(true);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDocClose = () => {
    setShowDoc(false);
  };

  return (
    <>
      <Tooltip title={t(urlDoc ? 'show-doc' : 'need-doc-url')} arrow>
        <span>
          <IconButton
            size="small"
            color="primary"
            disabled={!urlDoc}
            sx={{ p: '10px', ml: 'auto' }}
            aria-label={t('show-doc')}
            onClick={handleDocOpen}
          >
            {isLoading ? <CircularProgress size={20} /> : <AutoStoriesIcon />}
          </IconButton>
        </span>
      </Tooltip>
      <Drawer
        anchor="right"
        open={showDoc}
        onClose={handleDocClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 350,
          },
        }}
      >
        <Box
          component="section"
          margin="20px 0 0 0"
          padding="0 20px"
          width="100%"
          overflow="auto"
          className="graphiql-container"
        >
          {graphqlSchema && fetcher && (
            <GraphiQLProvider fetcher={fetcher} schema={graphqlSchema}>
              <DocExplorer />
            </GraphiQLProvider>
          )}
        </Box>
      </Drawer>
    </>
  );
};
