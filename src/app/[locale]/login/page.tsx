'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoginIcon from '@mui/icons-material/Login';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { TextFieldElement, PasswordElement } from 'react-hook-form-mui';

import { useValidationSchema } from '@/src/hooks/useValidationSchema';

export function LoginFormComponent({
  params: { locale },
}: {
  params: { locale: string };
}) {
  console.log(locale);
  const t = useTranslations('LoginPage');
  const validationSchema = useValidationSchema();

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  const onSubmit = () => {};

  return (
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
              {t('registrationText')}
            </Typography>
            <Link href={`/${locale}/registration`} passHref>
              <Typography
                variant="body2"
                color="primary"
                sx={{ fontSize: '1rem', cursor: 'pointer' }}
              >
                {t('registrationLink')}
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}

export default LoginFormComponent;
