import { Stack } from '@mui/material';
import { Suspense } from 'react';

import { Loader } from '@/features/loader/loader';
import GraphqlClient from '@/widgets/graphql-client/graphql-client';

export default function GraphLayout({
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
        width: '100%',
        height: '100%',
        padding: '10px 0',
      }}
    >
      <GraphqlClient>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </GraphqlClient>
    </Stack>
  );
}
