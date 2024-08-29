'use client';

import { useLocale, useTranslations } from 'next-intl';

import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { FirebaseError } from 'firebase/app';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Link from 'next/link';

import { Logo } from '@/entities/logo/logo.tsx';
import LocaleSwitcher from '@/features/locale-switcher/locale-switcher.tsx';
import { ThemeSwitcher } from '@/features/theme-switcher/theme-switcher';
import { useAuth } from '@/shared/contexts';
import { logout } from '@/shared/services/firebase/auth';

export default function Header() {
  const [isShrunk, setShrunk] = useState(false);
  const locale = useLocale();
  const t = useTranslations('Header');

  const { isLoggedIn, loading } = useAuth();

  const handleLogout = async () => {
    toast.promise(logout, {
      pending: t('authentication-loading'),
      success: t('success-logout-message'),
      error: {
        render({ data }) {
          return data instanceof FirebaseError
            ? data.message
            : t('unexpected-error');
        },
      },
    });
  };

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
    !loading && (
      <AppBar
        color="info"
        position="sticky"
        sx={{
          height: isShrunk ? 40 : 60,
          top: 0,
          transition: 'all linear 0.2s',
        }}
      >
        <Container disableGutters sx={{ height: 'inherit' }}>
          <Toolbar style={{ height: '100%', minHeight: '100%' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Logo />
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <ThemeSwitcher />
              <LocaleSwitcher />
              {isLoggedIn ? (
                <Button variant="text" onClick={handleLogout}>
                  {t('sign-out')}
                </Button>
              ) : (
                <Button
                  component={Link}
                  variant="text"
                  href={`/${locale}/login`}
                >
                  {t('sign-in')}
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  );
}
