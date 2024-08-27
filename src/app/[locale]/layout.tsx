import { NextIntlClientProvider } from 'next-intl';

import { Container, Stack } from '@mui/material';
import { getMessages } from 'next-intl/server';

import Image from 'next/image';

import bg from '@/assets/bg-light.png';
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
      <Container
        maxWidth={false}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
          padding: 0,
          '@media (min-width: 600px)': {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
      >
        <Image fill src={bg} alt="Image alt" style={{ objectFit: 'cover' }} />
        <Header />
        <Container sx={{ flexGrow: 1 }}>
          <Stack>{children}</Stack>
        </Container>
        <Footer />
      </Container>
    </NextIntlClientProvider>
  );
}
