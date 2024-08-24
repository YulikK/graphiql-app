import { Container, Stack } from '@mui/material';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import Footer from '@/widgets/footer/Footer';
import Header from '@/widgets/header/Header';

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
      <Container sx={{ flexGrow: 1 }}>
        <Stack>{children}</Stack>
      </Container>
      <Footer />
    </NextIntlClientProvider>
  );
}
