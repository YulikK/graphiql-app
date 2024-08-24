'use client';
import { AppBar, Button, Toolbar, Box, Container } from '@mui/material';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Logo } from '@/entities/logo/logo.tsx';
import LocaleSwitcher from '@/features/locale-switcher/locale-switcher.tsx';

export default function Header() {
  const [isShrunk, setShrunk] = useState(false);
  const locale = useLocale();
  const t = useTranslations('Header');
  const isLogined = false;

  useEffect(() => {
    const handler = () => {
      setShrunk((isShrunk) => {
        if (!isShrunk && document.body.scrollTop > 20) {
          return true;
        }

        if (isShrunk && document.body.scrollTop < 10) {
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
          <Box sx={{ flexGrow: 1 }}>
            <Logo />
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <LocaleSwitcher />
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
