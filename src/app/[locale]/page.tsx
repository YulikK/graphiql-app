import { useTranslations } from 'next-intl';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations('HomePage');

  return (
    <>
      <h1>{t('title')}</h1>
    </>
  );
}
