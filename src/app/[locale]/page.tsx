'use client';

import { Typography } from '@mui/material';
import { FirebaseError } from 'firebase/app';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import locales from '../../constants/locales';

import { useCheckIsAuth } from '@/src/hooks/useCheckIsAuth';
import { logout } from '@/src/services/firebase/auth';
import {
  AuthenticationLoading,
  SuccessLogoutMessage,
  UnexpectedError,
} from '@/src/utils/consts';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { isLoggedIn, loading } = useCheckIsAuth();
  const t = useTranslations('HomePage');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    router.replace(e.target.value);

  const handleLogout = async () => {
    toast.promise(logout, {
      pending: AuthenticationLoading,
      success: SuccessLogoutMessage,
      error: {
        render({ data }) {
          return data instanceof FirebaseError ? data.message : UnexpectedError;
        },
      },
    });
  };

  return (
    !loading && (
      <>
        <h1>{t('title')}</h1>
        <select name="locales" defaultValue={locale} onChange={handleChange}>
          {locales.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        {isLoggedIn ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link href={`/${locale}/login`} passHref>
              <Typography
                variant="body2"
                color="primary"
                sx={{ fontSize: '1rem', cursor: 'pointer' }}
              >
                Login
              </Typography>
            </Link>
            <Link href={`/${locale}/registration`} passHref>
              <Typography
                variant="body2"
                color="primary"
                sx={{ fontSize: '1rem', cursor: 'pointer' }}
              >
                Registration
              </Typography>
            </Link>
          </>
        )}
      </>
    )
  );
}
