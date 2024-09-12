import { useLocale } from 'next-intl';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { useAuth } from '../contexts';

export const usePrivateRedirect = () => {
  const { isLoggedIn, loading } = useAuth();

  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push(`/${locale}`);
    }
  }, [isLoggedIn, router, loading, locale]);

  return { isLoggedIn, loading };
};
