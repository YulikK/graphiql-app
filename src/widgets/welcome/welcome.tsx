'use client';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { Box, Button, Typography } from '@mui/material';

import { Loader } from '@/features/loader/loader';
import { useAuth } from '@/shared/contexts';

export default function Welcome({ locale }: { locale: string }) {
  const { isLoggedIn, loading, userName } = useAuth();

  const t = useTranslations('WelcomePage');

  if (loading) {
    return <Loader />;
  }

  return (
    <Box display={{ sm: 'flex' }} gap={2}>
      <Box
        flex={1}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={6}
        paddingBlock={14}
      >
        <Typography
          variant="h2"
          fontSize={'4rem'}
          textAlign={'center'}
          fontWeight={400}
        >
          {!isLoggedIn
            ? t('title-anonymous')
            : `${t('title-registered')} ${userName}`}
        </Typography>
        <Typography variant="body1" width="60%" textAlign={'center'}>
          {t('welcome-text')}
        </Typography>
        {!isLoggedIn ? (
          <Box display={'flex'} gap={2}>
            <Button
              data-testid="sign-in"
              variant="outlined"
              LinkComponent={Link}
              href={`/${locale}/login`}
              sx={{ padding: '10px 30px' }}
            >
              {t('sign-in')}
            </Button>
            <Button
              data-testid="sign-up"
              variant="contained"
              LinkComponent={Link}
              href={`/${locale}/registration`}
              sx={{ padding: '10px 30px' }}
            >
              {t('sign-up')}
            </Button>
          </Box>
        ) : (
          <Box display={'flex'} gap={2}>
            <Button
              data-testid="rest"
              variant="contained"
              LinkComponent={Link}
              href={`/${locale}/GET`}
              sx={{ padding: '10px 30px', textAlign: 'center' }}
            >
              {t('rest-client')}
            </Button>
            <Button
              data-testid="graphql"
              variant="contained"
              LinkComponent={Link}
              href={`/${locale}/graphql`}
              sx={{ padding: '10px 30px', textAlign: 'center' }}
            >
              {t('graphiql-client')}
            </Button>
            <Button
              data-testid="history"
              variant="outlined"
              LinkComponent={Link}
              href={`/${locale}/history`}
              sx={{ padding: '10px 30px', textAlign: 'center' }}
            >
              {t('history')}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
