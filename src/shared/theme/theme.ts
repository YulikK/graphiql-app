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
    mode: 'light', // Светлая тема (по умолчанию)
    primary: {
      main: '#ffffff60',
      // light: '#cfcfcf', // Светлый серый цвет
      // dark: '#707070', // Темный серый цвет
      // contrastText: '#ffffff', // Белый текст на сером фоне
    },
    // info: {
    //   main: '#9e9e9e', // Темно-серый цвет для info
    // },
  },
  components: {
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       '&:hover .MuiOutlinedInput-notchedOutline': {
    //         borderColor: '#00cece',
    //       },
    //       '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    //         borderColor: '#00cece',
    //       },
    //     },
    //   },
    // },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff60',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#000000',
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
    MuiCssBaseline: {
      styleOverrides: `
        .footer {
          background-color: #0288d1;
        }
      `,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      light: '#003c3c',
      dark: '#006464',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#9e9e9e', // Темно-серый фон для темной темы для хедера
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff',
          },
        },
        input: {
          backgroundColor: '#404040', // Светло-серый фон для внутреннего input в темной теме
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiOutlinedInput-root': {
            backgroundColor: '#404040', // Темно-серый фон для всех инпутов в темной теме
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        .footer {
          background-color: #9e9e9e;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#404040',
          borderColor: '#ffffff',
        },
        outlinedPrimary: {
          backgroundColor: '#404040',
          color: '#ffffff',
          borderColor: '#ffffff',
          '&:hover': {
            borderColor: '#009d9d',
            color: '#009d9d',
          },
        },
      },
    },
  },
});

export { darkTheme, lightTheme };
