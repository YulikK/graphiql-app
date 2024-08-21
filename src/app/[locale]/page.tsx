'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import locales from '../../constants/locales';

import { logout } from '@/src/services/firebase/auth';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations('HomePage');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    router.replace(e.target.value);
  return (
    <>
      <h1>{t('title')}</h1>
      <select name="locales" defaultValue={locale} onChange={handleChange}>
        {locales.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
      <button type="button" onClick={() => logout()}>
        Logout
      </button>
    </>
  );
}
