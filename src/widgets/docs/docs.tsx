import { DocExplorer, GraphiQLProvider } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import ArticleIcon from '@mui/icons-material/Article';
import { Box, Drawer, IconButton, TextField } from '@mui/material';
import 'graphiql/graphiql.min.css';
import { useState } from 'react';

type DocsProps = {
  url: string;
};

export const Docs = ({ url }: DocsProps) => {
  const [showDoc, setShowDoc] = useState(false);
  const [urlDoc, setUrlDoc] = useState(url ? `${url}?sdl` : '');

  const handleToggleDoc = () => {
    setShowDoc(!showDoc);
  };

  const fetcher = createGraphiQLFetcher({
    url: urlDoc,
  });

  const handleUrlChange = (value: string) => {
    setUrlDoc(value);
  };

  return (
    <>
      <IconButton
        size="small"
        color="primary"
        sx={{ p: '10px', ml: 'auto' }}
        aria-label="directions"
        onClick={handleToggleDoc}
      >
        <ArticleIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={showDoc}
        onClose={handleToggleDoc}
        sx={{
          '& .MuiDrawer-paper': {
            width: 350,
          },
        }}
      >
        <Box width="100%" padding="20px">
          <TextField
            hiddenLabel
            placeholder="endpoint"
            value={urlDoc}
            variant="filled"
            size="small"
            fullWidth
            onChange={(e) => handleUrlChange(e.target.value)}
          />
        </Box>
        <Box
          component="section"
          margin="20px 0 0 0"
          padding="0 20px"
          width="100%"
          overflow="auto"
          className="graphiql-container"
        >
          <GraphiQLProvider fetcher={fetcher}>
            <DocExplorer />
          </GraphiQLProvider>
        </Box>
      </Drawer>
    </>
  );
};
