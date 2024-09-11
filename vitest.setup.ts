import '@testing-library/jest-dom';
import React from 'react';
global.React = React;

vi.mock('next/font/google', () => ({
  Roboto: () => ({
    style: {
      fontFamily: 'Roboto, sans-serif',
    },
  }),
}));

vi.mock('@/shared/services/firebase/firebase.ts', () => ({
  app: {},
  auth: {},
  db: {},
}));
