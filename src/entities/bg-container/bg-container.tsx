'use client';

import { Container } from '@mui/material';

import Image from 'next/image';

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
      <Image
        src={darkMode ? bgDark : bgLight}
        alt="Image alt"
        style={{
          position: 'absolute',
          width: '100%',
          objectFit: 'cover',
          zIndex: '-1',
          height: 'auto',
        }}
      />
      {children}
    </Container>
  );
}
