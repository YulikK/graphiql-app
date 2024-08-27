'use client';
import { Box, Stack, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

import {
  RestSubmit,
  RestQuery,
  RestHeaders,
  RestVariables,
  RestEndpoint,
  RestMethod,
  RestBody,
} from '@/features/rest';

export default function RestClient() {
  const [index, setIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setIndex(newValue);
  };
  return (
    <Box marginInline={'auto'} maxWidth={800} width={'100%'} flexGrow={1}>
      <Box display={'flex'}>
        <RestMethod />
        <RestEndpoint />
        <RestSubmit />
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tabs
          value={index}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Query" />
          <Tab label="Body" />
          <Tab label="Headers" />
          <Tab label="Variables" />
        </Tabs>
      </Box>
      <Stack>
        {index === 0 && <RestQuery />}
        {index === 1 && <RestBody />}
        {index === 2 && <RestHeaders />}
        {index === 3 && <RestVariables />}
      </Stack>
    </Box>
  );
}
