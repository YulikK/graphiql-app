import { NextIntlClientProvider } from 'next-intl';

import { Container, Stack } from '@mui/material';
import { getMessages } from 'next-intl/server';

import Footer from '@/widgets/footer/footer.tsx';
import Header from '@/widgets/header/header.tsx';

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
      <Container sx={{ flexGrow: 1, width: '100%', display: 'flex' }}>
        <Stack sx={{ flexGrow: 1, width: '100%' }}>{children}</Stack>
      </Container>
      <Footer />
    </NextIntlClientProvider>
  );
}
