'use client';

import { useTranslations } from 'next-intl';

import Image from 'next/image';
import Link from 'next/link';

import { Button, Container, Typography } from '@mui/material';

import errorImg from '@/assets/error.png';

export default function ErrorComponent() {
  const t = useTranslations('ErrorPage');

  return (
    <Container
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image src={errorImg} alt="error" className="error-img" />
      <Typography variant="h5" textAlign={'center'}>
        {t('text')}
      </Typography>
      <Button
        variant="contained"
        LinkComponent={Link}
        href={`/`}
        sx={{ padding: '10px 30px', marginTop: '15px' }}
      >
        {t('button')}
      </Button>
    </Container>
  );
}
