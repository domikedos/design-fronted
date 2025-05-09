import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0098EA', // TON brand primary color
    },
    secondary: {
      main: '#1AC9FF', // TON brand secondary color
    },
    background: {
      default: '#0A0D14', // Darker background color
      paper: '#0A0D14', // Darker background color for paper components
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 400,
      fontSize: '1.5rem',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1.125rem',
      fontWeight: 400,
    },
    button: {
      fontSize: '1.125rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 400,
          padding: '4px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderRadius: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
        contained: {
          background: 'linear-gradient(90deg, #2D83EC 0%, #1AC9FF 100%)', // TON brand gradient
          '&:hover': {
            background: 'linear-gradient(90deg, #1AC9FF 0%, #2D83EC 100%)', // Reversed gradient on hover
            borderRadius: 12,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 8,
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#141824', // Middle tone between #0A0D14 and #1E2337
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 0,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          letterSpacing: '-0.5px',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        },
        html: {
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        },
        '#ton-connect-button': {
          width: {xs: '100% !important', sm: 'auto !important'},
        },
        'tc-root div button': {
          borderRadius: '6px !important',
          transition: 'all 0.2s ease-in-out !important',
          width: {xs: '100% !important', sm: 'auto !important'},
          '&:hover': {
            transform: 'none !important',
            transition: 'all 0.2s ease-in-out !important',
            borderRadius: '8px !important',
            background: 'rgba(0, 0, 0, 0.4) !important',
          }
        }
      },
    },
  },
}); 