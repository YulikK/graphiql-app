'use client';

import { Roboto } from 'next/font/google';

import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const codeEditorStyles = {
  '&.read-only': {
    background: 'transparent',
    '& > .cm-theme > .cm-editor': {
      background: 'transparent',
      '& > .cm-scroller > .cm-gutters': {
        background: 'transparent',
      },
    },
  },
  '& > .cm-theme': {
    height: '100%',
    '& > .cm-editor': {
      height: '100%',
      '& > .cm-scroller > .cm-content > .cm-activeLine': {
        background: 'transparent',
      },
      '& > .cm-scroller > .cm-gutters': {
        borderColor: 'transparent',
        '& > .cm-gutter > .cm-activeLineGutter': {
          background: 'transparent',
        },
      },
    },
    '& > .cm-focused': {
      outline: 'none',
    },
  },
};

const resizeBarStyles = {
  '& > .split-view': {
    '& > .split-view-container > .split-view-view:not(:first-child)::before': {
      backgroundColor: 'transparent',
    },
    '& > .sash-container > .sash': {
      '&::before': {
        borderRadius: '5px',
        background: '#2c58f7',
        opacity: '50%',
        transition:
          'width 0.3s ease-in-out, height 0.3s ease-in-out, border-radius 0.3s ease-in-out',
        transformOrigin: 'center',
      },
      '&.sash-vertical': {
        '&::before': {
          width: '5px',
          height: '15px',
          top: '50%',
          transform: 'translate(0, -50%)',
        },
        '&.sash-hover::before': {
          height: '50px',
        },
      },
      '&.sash-horizontal': {
        '&::before': {
          width: '15px',
          height: '5px',
          right: '50%',
          transform: 'translate(50%, 0)',
        },
        '&.sash-hover::before': {
          width: '50px',
        },
      },
    },
  },
};

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
          backgroundColor: '#99aef3',
          borderColor: '#ffffff20',
          boxShadow:
            '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
          '&:hover': {
            backgroundColor: '#99aef360',
            borderColor: '#ffffff20',
          },
        },
        containedPrimary: {
          backgroundColor: '#4c67bd',
          '&:hover': {
            backgroundColor: '#9fb3f4',
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
          backgroundColor: '#d3dcfa',
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
          ...resizeBarStyles,
          '& > .accordion-info': {
            background: '#f0f0f0',
          },
          ...codeEditorStyles,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          color: '#545454',
          background: 'rgba(255, 255, 255, 0.4)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '& > .MuiBox-root': {
            background: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              transform: 'scale(1.01)',
              background: 'rgba(255, 255, 255, 0.4)',
              transition: 'all 0.3s ease-in-out',
            },
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        .footer {
          background-color: #c1cef7;
          box-shadow: 2px -1px 4px -1px rgba(0, 0, 0, 0.2);
        }
        .github-icon {
          fill: #000000;
        }
        .cm-editor {
          border-radius: 8px;
        }
        .cm-editor::first-of-type {
          border-top-right-radius: 0;
          border-top-left-radius: 0;
        }
        .cm-gutters {
          border-bottom-left-radius: 8px;
        }
        .cm-scroller {
          border-radius: 8px;
        }
        .tab-header {
          background: #edf1fc;
        }
      `,
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '&.item': {
            borderRadius: '10px',
            transition: 'all 0.3s ease-in-out',
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.5) 100%)',
          },
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          '& > .MuiBox-root ': {
            ...resizeBarStyles,
          },
        },
      },
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
      main: '#c1d4f6',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: {
          backgroundColor: '#9c89ad',
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
          backgroundColor: '#5b5575',
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
          ...resizeBarStyles,
          '& > .accordion-info': {
            background: '#8764e1',
          },
          '&.code-editor': {
            background: '#2d2f3f',
          },
          ...codeEditorStyles,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          color: '#cbcbf2',
          background: '#00000060',
          '& > img': {
            filter: 'invert(1)',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.2)',
          '&:hover': {
            transform: 'scale(1.01)',
            background: 'rgba(255, 255, 255, 0.4)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        .logo {
          filter: invert(1);
        }
        .footer {
          background-color: #ffffff20;
        }
        .developer-btn img {
          filter: invert(1);
        }
        .rs-icon {
          filter: invert(1);
        }
        .tab-header {
          background: #5b5575;
        }
      `,
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '&.item': {
            borderRadius: '10px',
            transition: 'all 0.3s ease-in-out',
            background: '#00000090',
          },
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          '& > .MuiBox-root ': {
            ...resizeBarStyles,
          },
        },
      },
    },
  },
});

export { darkTheme, lightTheme };
