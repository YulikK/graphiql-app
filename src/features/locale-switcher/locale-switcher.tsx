'use client';
import { Button } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const params = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  const switchLocale = () =>
    router.replace(
      `${path.replace(locale, locale === 'ru' ? 'en' : 'ru')}?${params.toString()}`
    );

  return (
    <Button variant="text" onClick={switchLocale} style={{ color: 'white' }}>
      {locale}
    </Button>
  );
}
