'use client';

import { Button, Container, Typography } from '@mui/material';

import Image from 'next/image';
import Link from 'next/link';

import errorImg from '@/assets/error.png';

export default function ErrorComponent() {
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
        We searched high and low but couldn`t find what are you looking for.
        <br /> Lets find a better place for you to go.
      </Typography>
      <Button
        variant="contained"
        LinkComponent={Link}
        href={`/`}
        sx={{ padding: '10px 30px', marginTop: '15px' }}
      >
        Go back to Home
      </Button>
    </Container>
  );
}
