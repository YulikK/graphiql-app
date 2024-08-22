import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import Header from '@/src/components/header/Header';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      {children}
    </NextIntlClientProvider>
  );
}
