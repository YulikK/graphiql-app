'use client';

import { Typography, Box, Button, ButtonGroup } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useAuth } from '@/shared/contexts';

const PLACEHOLDER_TEXT =
  'A description of our marvelous project, or a pretty picture? Or maybe, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?';

export default function WelcomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { isLoggedIn, loading } = useAuth();
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
              <Typography variant="h4" textAlign={'center'}>
                {t('title-anonymous')}!
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
                {t('title-registered')} [User]!
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
        <Box
          display={'flex'}
          flex={1}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant="body1">{PLACEHOLDER_TEXT}</Typography>
        </Box>
      </Box>
    </>
  );
}
