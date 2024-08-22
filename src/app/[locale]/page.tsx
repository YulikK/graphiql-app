'use client';

import { Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import locales from '../../constants/locales';

import { useCheckIsAuth } from '@/src/hooks/useCheckIsAuth';
import { logout } from '@/src/services/firebase/auth';

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
          <button type="button" onClick={() => logout()}>
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
