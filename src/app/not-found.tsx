'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.push('/en/notFound');
  }, [router]);

  return null;
}
