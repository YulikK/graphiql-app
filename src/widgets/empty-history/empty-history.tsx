import { useTranslations } from 'next-intl';

import { Box, Button, Container, Typography } from '@mui/material';

import Link from 'next/link';

export default function EmptyHistory({ locale }: { locale: string }) {
  const t = useTranslations('HistoryPage');

  return (
    <Container
      sx={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" textAlign={'center'}>
        {t('empty-text')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          paddingBlock: 1,
        }}
      >
        <Button
          variant="contained"
          LinkComponent={Link}
          href={`/${locale}/GET`}
          sx={{ padding: '10px 20px', textAlign: 'center' }}
        >
          {t('rest-client')}
        </Button>
        <Button
          variant="contained"
          LinkComponent={Link}
          href={`/${locale}/graphql`}
          sx={{ padding: '10px 20px', textAlign: 'center' }}
        >
          {t('graphiql-client')}
        </Button>
      </Box>
    </Container>
  );
}
