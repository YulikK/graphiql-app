'use client';
import { Box, Stack, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

import ClientEndpoint from '@/features/client-endpoint/client-endpoint';
import ClientHeaders from '@/features/client-headers/client-headers';
import ClientVariables from '@/features/client-variables/client-variables';
import { RestSubmit, RestQuery, RestMethod, RestBody } from '@/features/rest';
import {
  deleteRestHeader,
  deleteRestVariables,
  setRestHeader,
  setRestUrl,
  setRestVariables,
} from '@/shared/store/slices/rest-slice';

export default function RestClient() {
  const [index, setIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setIndex(newValue);
  };
  return (
    <Box flexGrow={1}>
      <Box display={'flex'}>
        <RestMethod />
        <ClientEndpoint sliceKey="rest-slice" setUrl={setRestUrl} />
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
        {index === 2 && (
          <ClientHeaders
            sliceKey="rest-slice"
            deleteHeader={deleteRestHeader}
            setHeader={setRestHeader}
          />
        )}
        {index === 3 && (
          <ClientVariables
            sliceKey="rest-slice"
            deleteVariable={deleteRestVariables}
            setVariable={setRestVariables}
          />
        )}
      </Stack>
    </Box>
  );
}
