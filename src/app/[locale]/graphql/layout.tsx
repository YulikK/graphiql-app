import { Stack } from '@mui/material';

import GraphqlClient from '@/widgets/graphql-client/graphql-client';

export default function RestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack
      display={'flex'}
      flexDirection={'column'}
      marginInline={'auto'}
      width={'100%'}
      height={'100%'}
      padding={'10px 0'}
    >
      <GraphqlClient>{children}</GraphqlClient>
    </Stack>
  );
}
