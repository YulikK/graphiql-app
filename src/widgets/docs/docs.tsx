import { useTranslations } from 'next-intl';

import {
  DocExplorer,
  GraphiQLProvider,
  useTheme as useDocTheme,
} from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import ArticleIcon from '@mui/icons-material/Article';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Drawer, Snackbar } from '@mui/material';
import 'graphiql/graphiql.min.css';
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import { useEffect, useState } from 'react';

import { useTheme as useAppTheme } from '@/shared/contexts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import { setGraphSchema } from '@/shared/store/slices/grahpql-client';

export const Docs = () => {
  const [showDoc, setShowDoc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const t = useTranslations('GraphqlPage');

  const urlDoc = useAppSelector((state) => state['graphql-slice'].urlDoc);

  const fetcher = urlDoc ? createGraphiQLFetcher({ url: urlDoc }) : null;

  const { setTheme } = useDocTheme();
  const { darkMode } = useAppTheme();

  useEffect(() => {
    setTheme(darkMode ? 'dark' : 'light');
  }, [darkMode, setTheme]);

  const handleToggleDoc = async () => {
    if (!fetcher) {
      setError(t('error-no-doc-url'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetcher({
        query: getIntrospectionQuery(),
        operationName: 'IntrospectionQuery',
      });

      const introspectionJSON =
        'data' in data && (data.data as unknown as IntrospectionQuery);

      dispatch(setGraphSchema(JSON.stringify(introspectionJSON, null, 2)));
      setShowDoc(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDocClose = () => {
    setShowDoc(false);
  };

  return (
    <>
      <LoadingButton
        size="small"
        color="primary"
        loading={loading}
        disabled={!urlDoc}
        sx={{ p: '10px', ml: 'auto' }}
        aria-label={t('show-doc')}
        onClick={handleToggleDoc}
      >
        <ArticleIcon />
      </LoadingButton>
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
          {fetcher && (
            <GraphiQLProvider fetcher={fetcher}>
              <DocExplorer />
            </GraphiQLProvider>
          )}
        </Box>
      </Drawer>
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
