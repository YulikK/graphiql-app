'use client';

import { createTheme } from '@mui/material/styles';

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const lightTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff60',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: {
          backgroundColor: '#ffffff60',
          borderColor: '#ffffff20',
          '&:hover': {
            backgroundColor: '#ffffff40',
            borderColor: '#ffffff20',
          },
        },
        containedPrimary: {
          backgroundColor: '#8a88e2',
          '&:hover': {
            backgroundColor: '#abaaea',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#d6dffa',
          borderRadius: '8px',
          padding: '0',
        },
        list: {
          padding: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#00000020',
          color: '#3e3d98',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3e3d98',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3e3d98',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#3e3d98',
          '&.Mui-focused': {
            color: '#3e3d98',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        .footer {
          background-color: #00000030;
        }
      `,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff;',
    },
    secondary: {
      main: '#8f8ee4',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: {
          backgroundColor: '#ffffff60',
          borderColor: '#ffffff20',
          '&:hover': {
            backgroundColor: '#ffffff40',
            borderColor: '#ffffff20',
          },
        },
        containedPrimary: {
          backgroundColor: '#cbcbf2',
          '&:hover': {
            backgroundColor: '#8f8ee4',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#231c37',
          borderRadius: '8px',
          padding: '0',
        },
        list: {
          padding: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff30',
          color: '#cbcbf2',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#cbcbf2',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#cbcbf2',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#cbcbf2',
          '&.Mui-focused': {
            color: '#cbcbf2',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        .footer {
          background-color: #ffffff20;
        }
      `,
    },
  },
});

export { darkTheme, lightTheme };
