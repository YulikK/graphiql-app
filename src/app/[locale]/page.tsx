'use client';

import { useTranslations } from 'next-intl';

import { Box, Button, ButtonGroup, Typography } from '@mui/material';

import Link from 'next/link';

import { useAuth } from '@/shared/contexts';

export default function WelcomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { isLoggedIn, loading, userName } = useAuth();
  const t = useTranslations('WelcomePage');

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Box display={{ sm: 'flex' }} gap={2}>
        <Box
          flex={1}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          gap={3}
          paddingBlock={10}
        >
          {!isLoggedIn ? (
            <>
              <Typography variant="h4" textAlign={'center'} fontWeight={600}>
                {t('title-anonymous')}!
              </Typography>
              <Typography variant="body1" width="80%" textAlign={'center'}>
                {t('welcome-text')}
              </Typography>
              <Box display={'flex'} gap={2}>
                <Button
                  variant="outlined"
                  LinkComponent={Link}
                  href={`/${locale}/login`}
                >
                  {t('sign-in')}
                </Button>
                <Button
                  variant="contained"
                  LinkComponent={Link}
                  href={`/${locale}/registration`}
                >
                  {t('sign-up')}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h4" textAlign={'center'}>
                {t('title-registered')} {userName}
              </Typography>
              <ButtonGroup orientation="vertical">
                <Button LinkComponent={Link} href={`/${locale}`}>
                  REST Client
                </Button>
                <Button LinkComponent={Link} href={`/${locale}`}>
                  GraphiQL Client
                </Button>
                <Button LinkComponent={Link} href={`/${locale}`}>
                  History
                </Button>
              </ButtonGroup>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
