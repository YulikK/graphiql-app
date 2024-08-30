'use client';

import { Container } from '@mui/material';

import bgDark from '@/assets/bg-dark.png';
import bgLight from '@/assets/bg-light.png';
import { useTheme } from '@/shared/contexts';

export default function BgContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { darkMode } = useTheme();

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundImage: darkMode
          ? `url(${bgDark.src})`
          : `url(${bgLight.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
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
      {children}
    </Container>
  );
}
