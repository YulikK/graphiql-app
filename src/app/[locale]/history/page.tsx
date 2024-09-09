'use client';

import { Stack, Typography } from '@mui/material';

import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

export default function History() {
  const { getStorage } = useLocalStorage();

  const obj = getStorage();
  console.log(obj);
  return (
    <Stack
      display={'flex'}
      flexDirection={'column'}
      marginInline={'auto'}
      maxWidth={800}
      width={'100%'}
      height={'100%'}
      padding={'10px 0'}
    >
      <Typography variant="h1">History</Typography>
    </Stack>
  );
}
