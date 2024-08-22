'use client';

import LoginIcon from '@mui/icons-material/Login';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  TextFieldElement,
  PasswordElement,
  CheckboxElement,
} from 'react-hook-form-mui';

import { useRegistrationForm } from '@/src/hooks/useRegistrationForm';

export function RegistrationFormComponent({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations('RegistrationPage');

  const {
    isLoggedIn,
    loading,
    handleSubmit,
    onSubmit,
    control,
    isValid,
    errors,
  } = useRegistrationForm();

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    isLoggedIn === false && (
      <Container
        maxWidth="sm"
        sx={{
          padding: '20px',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="h4" gutterBottom align="center">
              {t('title')}
            </Typography>
            <TextFieldElement
              control={control}
              fullWidth
              name="name"
              label={t('nameInput')}
              required
              helperText={errors.name?.message || ' '}
            />
            <TextFieldElement
              control={control}
              fullWidth
              name="email"
              label={t('emailInput')}
              required
              helperText={errors.email?.message || ' '}
            />
            <PasswordElement
              fullWidth
              control={control}
              name="password"
              label={t('passwordInput')}
              required
              helperText={errors.password?.message || ' '}
              margin="dense"
            />
            <PasswordElement
              fullWidth
              control={control}
              name="confirmPassword"
              label={t('confirmInput')}
              required
              helperText={errors.confirmPassword?.message || ' '}
              margin="dense"
            />
            <Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
              <CheckboxElement
                control={control}
                name="acceptTerms"
                label={t('acceptTermInput')}
                required
                helperText={errors.acceptTerms?.message || ' '}
              />
            </Stack>
            <LoadingButton
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
              {t('signUpButton')}
            </LoadingButton>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              sx={{ padding: '10px' }}
            >
              <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                {t('loginText')}
              </Typography>
              <Link href={`/${locale}/login`} passHref>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ fontSize: '1rem', cursor: 'pointer' }}
                >
                  {t('loginLink')}
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </form>
      </Container>
    )
  );
}

export default RegistrationFormComponent;
