'use client';

import { useLocale, useTranslations } from 'next-intl';

import Link from 'next/link';

import HistoryIcon from '@mui/icons-material/History';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { FirebaseError } from 'firebase/app';
import { useEffect, useState } from 'react';

import { Logo } from '@/entities/logo/logo.tsx';
import LocaleSwitcher from '@/features/locale-switcher/locale-switcher.tsx';
import { ThemeSwitcher } from '@/features/theme-switcher/theme-switcher';
import { useAlertBar, useAuth } from '@/shared/contexts';
import { useLocalStorage } from '@/shared/hooks/use-local-storage';
import { logout } from '@/shared/services/firebase/auth';

export default function Header() {
  const [isShrunk, setShrunk] = useState(false);

  const locale = useLocale();
  const t = useTranslations('Header');

  const { isLoggedIn, loading } = useAuth();
  const { setError, setSuccess, setPending } = useAlertBar();
  const { removeStorage } = useLocalStorage();

  const handleLogout = async () => {
    try {
      setPending(t('authentication-loading'));
      await logout();
      removeStorage();
      setSuccess(t('success-logout-message'));
    } catch (error) {
      setError((error as FirebaseError).message || t('unexpected-error'));
    }
  };

  useEffect(() => {
    const handler = () => {
      setShrunk(isShrunk => {
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
              <Tooltip title={t('history')}>
                <Button
                  className="history-button"
                  variant="contained"
                  component={Link}
                  href={`/${locale}/history`}
                  sx={{ minWidth: 'unset', padding: '5px 8px' }}
                >
                  <HistoryIcon />
                </Button>
              </Tooltip>
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
