'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.push('/en/notFound');
  }, [router]);

  return null;
}
