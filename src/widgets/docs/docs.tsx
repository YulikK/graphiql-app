import { useTranslations } from 'next-intl';

import {
  DocExplorer,
  GraphiQLProvider,
  useTheme as useDocTheme,
} from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import {
  Alert,
  Box,
  Drawer,
  IconButton,
  Snackbar,
  Tooltip,
} from '@mui/material';
import 'graphiql/graphiql.min.css';
import { useEffect, useState } from 'react';

import { useTheme as useAppTheme } from '@/shared/contexts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import { setGraphSchema } from '@/shared/store/slices/grahpql-client';
import { fetchGraphSchema } from '@/shared/utils/get-graph-schem';

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

  const handleDocOpen = async () => {
    if (!urlDoc) {
      setError(t('error-no-doc-url'));
      return;
    }

    try {
      if (!fetcher) {
        setLoading(true);
        setError(null);
        const introspectionJSON = await fetchGraphSchema(urlDoc);
        dispatch(setGraphSchema(JSON.stringify(introspectionJSON, null, 2)));
      }
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
            <AutoStoriesIcon />
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
