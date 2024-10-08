import { NextIntlClientProvider } from 'next-intl';

import { Container } from '@mui/material';
import { getMessages } from 'next-intl/server';

import BgContainer from '@/entities/bg-container/bg-container';
import Footer from '@/widgets/footer/footer.tsx';
import Header from '@/widgets/header/header.tsx';

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <BgContainer>
        <Header />
        <Container maxWidth={false} sx={{ flexGrow: 1 }}>
          {children}
        </Container>
        <Footer />
      </BgContainer>
    </NextIntlClientProvider>
  );
}
