import { Stack } from '@mui/material';
import { Suspense } from 'react';

import { Loader } from '@/features/loader/loader';
import RestClient from '@/widgets/rest-client/rest-client';

export default function RestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginInline: 'auto',
        maxWidth: 800,
        width: '100%',
        height: '100%',
        padding: '10px 0',
      }}
    >
      <RestClient>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </RestClient>
    </Stack>
  );
}
