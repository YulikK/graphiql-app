'use client';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const PLACEHOLDER_TEXT =
  'A description of our marvellous project, or a pretty picture? Or maybe, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?';

export default function WelcomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  //for demonstration purposes only, then delete, and delete 'use client'
  const [anonymous, setAnonymous] = useState(true);
  const t = useTranslations('WelcomePage');

  return (
    <>
      {/* for demonstration purposes only, then delete, and delete 'use client' */}
      <Button onClick={() => setAnonymous((prev) => !prev)}>
        {anonymous ? 'Anonymous' : 'Registered'} user (for test only)
      </Button>
      <Box display={{ sm: 'flex' }} gap={2}>
        <Box
          flex={1}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          gap={3}
          paddingBlock={10}
        >
          {anonymous ? (
            <>
              <Typography variant="h4" textAlign={'center'}>
                {t('title-anonymous')}!
              </Typography>
              <Box display={'flex'} gap={2}>
                <Button
                  variant="outlined"
                  LinkComponent={Link}
                  href={`${locale}/login`}
                >
                  {t('sign-in')}
                </Button>
                <Button
                  variant="contained"
                  LinkComponent={Link}
                  href={`${locale}/registration`}
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
                <Button LinkComponent={Link} href={`/${locale}/rest`}>
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
