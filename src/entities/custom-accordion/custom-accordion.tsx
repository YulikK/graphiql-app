'use client';

import { Box, Button } from '@mui/material';
import { useState } from 'react';

import Image from 'next/image';

import arrow from '@/assets/arrow.svg';

interface DeveloperProps {
  children: React.ReactNode;
}

export default function CustomAccordion(props: DeveloperProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      className="accordion-info"
      sx={{
        borderRadius: '10px',
        position: 'relative',
        padding: '10px 9px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        maxHeight: !isOpen ? '100px' : '100%',
        overflow: 'hidden',
        marginTop: 'auto',
        transition: 'all 0.3s ease-in-out',
        '@media (max-width: 900px)': {
          marginBottom: 'auto',
          marginTop: 'unset',
        },
      }}
    >
      <Button
        className="developer-btn"
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          padding: '0',
          minWidth: 'unset ',
          position: 'absolute',
          top: '15px',
          right: '15px',
        }}
      >
        <Image
          src={arrow}
          alt={'arrow'}
          width={20}
          height={20}
          style={{ transform: !isOpen ? 'rotate(180deg)' : 'none' }}
        />
      </Button>
      {props.children}
    </Box>
  );
}
