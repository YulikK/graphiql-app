import { Stack } from '@mui/material';

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
        width: '100%',
        height: '100%',
        padding: '10px 0',
      }}
    >
      <RestClient>{children}</RestClient>
    </Stack>
  );
}
