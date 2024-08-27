import { NextIntlClientProvider } from 'next-intl';

import { Container, Stack } from '@mui/material';
import { getMessages } from 'next-intl/server';

import BgContainer from '@/entities/bg-container/bg-container';
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
      <BgContainer>
        <Header />
        <Container sx={{ flexGrow: 1 }}>
          <Stack>{children}</Stack>
        </Container>
        <Footer />
      </BgContainer>
    </NextIntlClientProvider>
  );
}
