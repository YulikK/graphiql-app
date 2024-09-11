'use client';

import { useTranslations } from 'next-intl';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import LoginIcon from '@mui/icons-material/Login';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { PasswordElement, TextFieldElement } from 'react-hook-form-mui';

import GoogleIcon from '@/assets/google.svg';
import { Loader } from '@/features/loader/loader';
import { useAuth } from '@/shared/contexts';
import { useLoginForm } from '@/shared/hooks/use-login-form';

export default function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations('LoginPage');

  const router = useRouter();

  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push(`/${locale}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, router]);

  const { handleSubmit, onSubmit, onGoogleSubmit, control, isValid, errors } =
    useLoginForm();

  if (loading) {
    return <Loader />;
  }

  return (
    isLoggedIn === false && (
      <Container
        maxWidth="sm"
        sx={{
          padding: '20px',
        }}
      >
        <Button
          variant="outlined"
          startIcon={
            <Image src={GoogleIcon} alt="Google" width={20} height={20} />
          }
          onClick={onGoogleSubmit}
          sx={{
            width: '100%',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textTransform: 'none',
            margin: '10px 0',
          }}
        >
          <Typography variant="button">{t('google-text')}</Typography>
        </Button>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="h4" gutterBottom align="center">
              {t('title')}
            </Typography>
            <TextFieldElement
              data-testid="email"
              control={control}
              fullWidth
              name="email"
              label={t('email-input')}
              required
              helperText={errors.email?.message || ' '}
            />
            <PasswordElement
              data-testid="password"
              fullWidth
              control={control}
              name="password"
              label={t('password-input')}
              required
              helperText={errors.password?.message || ' '}
              margin="dense"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: '100%',
                maxWidth: '240px',
                padding: '12px 24px',
                fontSize: '1.2rem',
                textTransform: 'none',
                align: 'center',
              }}
              startIcon={<LoginIcon />}
              disabled={!isValid}
            >
              {t('sign-up-button')}
            </Button>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              sx={{ padding: '10px' }}
            >
              <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                {t('registration-text')}
              </Typography>
              <Link
                href={`/${locale}/registration`}
                passHref
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={{
                    fontSize: '1rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    '&:hover': {
                      textDecoration: 'none',
                    },
                  }}
                >
                  {t('registration-link')}
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </form>
      </Container>
    )
  );
}
