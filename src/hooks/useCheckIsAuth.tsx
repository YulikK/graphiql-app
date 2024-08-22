'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/src/contexts';

export const useCheckIsAuth = () => {
  const router = useRouter();
  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return {
    isLoggedIn,
    loading,
  };
};
