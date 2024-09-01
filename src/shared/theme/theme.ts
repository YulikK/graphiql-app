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
          backgroundColor: '#e8def8',
          borderColor: '#ffffff20',
          boxShadow:
            '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
          '&:hover': {
            backgroundColor: '#e8def860',
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
    MuiGrid2: {
      styleOverrides: {
        root: {
          '& > .item': {
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            transition: 'all 0.3s ease-in-out',
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.5) 100%)',
          },
          '& > .item:hover': {
            transform: 'translateY(-5px) scale(1.01)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            background: '#f0f0f0',
            zIndex: '2',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          '& > .developer-info': {
            background: '#f0f0f0',
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
          backgroundColor: '#00000060',
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
    MuiGrid2: {
      styleOverrides: {
        root: {
          '& > .item': {
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            padding: '25px',
            transition: 'all 0.3s ease-in-out',
            background: '#00000020',
          },
          '& > .item:hover': {
            transform: 'translateY(-5px) scale(1.01)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.3) 100%)',
            zIndex: '2',
          },
          '& > .item img': {
            filter: 'invert(1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          '& > .developer-info': {
            background: '#8764e1',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        .footer {
          background-color: #ffffff20;
        }
        .developer-btn img {
          filter: invert(1);
        }
      `,
    },
  },
});

export { darkTheme, lightTheme };
