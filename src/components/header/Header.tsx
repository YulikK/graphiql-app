'use client';
import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  Box,
  Container,
} from '@mui/material';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isShrunk, setShrunk] = useState(false);
  const locale = useLocale();
  const t = useTranslations('Header');
  const isLogined = false;

  useEffect(() => {
    const handler = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20)
        ) {
          return true;
        }

        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }

        return isShrunk;
      });
    };
    document.body.addEventListener('scroll', handler);

    return () => document.body.removeEventListener('scroll', handler);
  }, []);

  return (
    <AppBar
      color="info"
      position="sticky"
      sx={{ height: isShrunk ? 40 : 60, top: 0, transition: 'all linear 0.2s' }}
    >
      <Container disableGutters sx={{ height: 'inherit' }}>
        <Toolbar style={{ height: '100%', minHeight: '100%' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              LinkComponent={Link}
              variant="text"
              href={`${locale === 'ru' ? 'en' : 'ru'}`}
              style={{ color: 'white' }}
            >
              {locale}
            </Button>
            {isLogined ? (
              <Button
                LinkComponent={Link}
                variant="text"
                href={'/'}
                style={{ color: 'white' }}
              >
                {t('sign-out')}
              </Button>
            ) : (
              <Button
                LinkComponent={Link}
                variant="text"
                href={`${locale}/login`}
                style={{ color: 'white' }}
              >
                {t('sign-in')}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
