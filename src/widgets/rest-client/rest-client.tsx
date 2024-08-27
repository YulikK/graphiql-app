'use client';
import { Box, Stack, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

import ClientEndpoint from '@/features/client-endpoint/client-endpoint';
import ClientMethod from '@/features/client-method/client-method';
import RestSubmit from '@/features/rest-submit/rest-submit';

export default function RestClient() {
  const [index, setIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setIndex(newValue);
  };
  return (
    <Box marginInline={'auto'} maxWidth={800} width={'100%'}>
      <Box display={'flex'}>
        <ClientMethod />
        <ClientEndpoint />
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
      <Stack></Stack>
    </Box>
  );
}
