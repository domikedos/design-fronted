import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, AppBar, Toolbar, Typography, Button, Paper, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { TonConnectUIProvider, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useEffect, useRef, useState } from 'react';
import Problems from './pages/Problems';
import Ratings from './pages/Ratings';
import UserProfile from './pages/UserProfile';
import Submission from './pages/Submission';
import Problem from './pages/Problem';
// Add Telegram auth handler
declare global {
  interface Window {
    onTelegramAuth: (user: any) => void;
  }
}

const theme = createTheme({
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
        },
      },
    },
  },
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const botId = '7630411210';
  const origin = window.location.origin;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const openTelegramAuthWindow = () => {
    const url = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${encodeURIComponent(origin)}&embed=0&request_access=write&return_to=some-url`;
    const width = 550;
    const height = 450;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
    window.open(url, 'TelegramAuthWindow', windowFeatures);
    setDrawerOpen(false);
  };

  const handleWalletConnect = () => {
    tonConnectUI.openModal();
    setDrawerOpen(false);
  };

  const navigationItems = [
    { text: 'Problems', path: '/problems' },
    { text: 'Rating', path: '/ratings' },
    { text: 'Contacts', path: 'https://t.me/domikedos', isExternal: true }
  ];

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <img 
                src="https://ton.org/download/ton_symbol.svg"
                alt="TON"
                style={{ width: '36px', height: '36px' }}
              />
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                TON Code
              </Typography>
            </Box>
          </Link>
          
          {!isMobile && (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
                {navigationItems.map((item) => (
                  <Button key={item.text} color="inherit" component={Link} to={item.path}>
                    {item.text}
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button
                  onClick={openTelegramAuthWindow}
                  sx={{
                    borderRadius: '6px !important',
                    background: '#0088CC !important',
                    color: '#FFFFFF !important',
                    fontSize: '15px !important',
                    fontWeight: 590,
                    lineHeight: '18px',
                    padding: '11px 16px !important',
                    transition: 'all 0.2s ease-in-out !important',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    letterSpacing: '-0.5px',
                    '&:hover': {
                      borderRadius: '8px !important',
                      background: '#006699 !important',
                    }
                  }}
                >
                  <img 
                    src="data:image/svg+xml,%3Csvg%20height%3D%2218%22%20viewBox%3D%220%200%2017%2018%22%20width%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m.32%208.22c4.81-2.07%208.02-3.43%209.62-4.08%203.48-1.43%204.87-1.96%205.61-2.13.23-.06%201.45.29%201.45%201.18%200%202.58-1.32%208.8-1.87%2011.67-.23%201.22-1.88%201.6-3.74.45-1.47-.91-2.27-1.52-3.68-2.44-1.63-1.05-.58-1.63.35-2.58.25-.25%204.47-4.03%204.55-4.37.01-.04.02-.2-.08-.29-.09-.08-.24-.05-.34-.03-.14.03-2.46%201.54-6.96%204.53-.66.44-1.25.66-1.79.65-.59-.02-1.15-.05-2.56-.6-.94-.37-1.13-1.02-.56-1.96z%22%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E"
                    alt="Telegram"
                    style={{ width: '18px', height: '18px' }}
                  />
                  Connect Telegram
                </Button>
                <Button
                  onClick={handleWalletConnect}
                  sx={{
                    borderRadius: '6px !important',
                    background: wallet ? '#006699 !important' : '#0088CC !important',
                    color: '#FFFFFF !important',
                    fontSize: '15px !important',
                    fontWeight: 590,
                    lineHeight: '18px',
                    padding: '8px 16px !important',
                    transition: 'all 0.2s ease-in-out !important',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    letterSpacing: '-0.5px',
                    '&:hover': {
                      borderRadius: '8px !important',
                      background: wallet ? '#005580 !important' : 'rgba(0, 136, 204, 0.8) !important',
                    }
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.1839 17.7069C13.6405 18.6507 13.3688 19.1226 13.0591 19.348C12.4278 19.8074 11.5723 19.8074 10.941 19.348C10.6312 19.1226 10.3595 18.6507 9.81613 17.7069L5.52066 10.2464C4.76864 8.94024 4.39263 8.28717 4.33762 7.75894C4.2255 6.68236 4.81894 5.65591 5.80788 5.21589C6.29309 5 7.04667 5 8.55383 5H15.4462C16.9534 5 17.7069 5 18.1922 5.21589C19.1811 5.65591 19.7745 6.68236 19.6624 7.75894C19.6074 8.28717 19.2314 8.94024 18.4794 10.2464L14.1839 17.7069ZM11.1 16.3412L6.56139 8.48002C6.31995 8.06185 6.19924 7.85276 6.18146 7.68365C6.14523 7.33896 6.33507 7.01015 6.65169 6.86919C6.80703 6.80002 7.04847 6.80002 7.53133 6.80002H7.53134L11.1 6.80002V16.3412ZM12.9 16.3412L17.4387 8.48002C17.6801 8.06185 17.8008 7.85276 17.8186 7.68365C17.8548 7.33896 17.665 7.01015 17.3484 6.86919C17.193 6.80002 16.9516 6.80002 16.4687 6.80002L12.9 6.80002V16.3412Z" fill="#FFFFFF"/>
                  </svg>
                  {wallet ? 'Connected' : 'Connect Wallet'}
                </Button>
              </Box>
            </>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={() => setDrawerOpen(true)}
              sx={{ ml: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#141824',
            width: '100%',
            maxWidth: '300px',
          }
        }}
      >
        <List sx={{ pt: 2 }}>
          {navigationItems.map((item) => (
            <ListItem 
              key={item.text} 
              component={Link} 
              to={item.path}
              onClick={() => setDrawerOpen(false)}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem 
            onClick={openTelegramAuthWindow}
            sx={{ 
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <ListItemText 
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <img 
                    src="data:image/svg+xml,%3Csvg%20height%3D%2218%22%20viewBox%3D%220%200%2017%2018%22%20width%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m.32%208.22c4.81-2.07%208.02-3.43%209.62-4.08%203.48-1.43%204.87-1.96%205.61-2.13.23-.06%201.45.29%201.45%201.18%200%202.58-1.32%208.8-1.87%2011.67-.23%201.22-1.88%201.6-3.74.45-1.47-.91-2.27-1.52-3.68-2.44-1.63-1.05-.58-1.63.35-2.58.25-.25%204.47-4.03%204.55-4.37.01-.04.02-.2-.08-.29-.09-.08-.24-.05-.34-.03-.14.03-2.46%201.54-6.96%204.53-.66.44-1.25.66-1.79.65-.59-.02-1.15-.05-2.56-.6-.94-.37-1.13-1.02-.56-1.96z%22%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E"
                    alt="Telegram"
                    style={{ width: '18px', height: '18px' }}
                  />
                  Connect Telegram
                </Box>
              } 
            />
          </ListItem>
          <ListItem 
            onClick={handleWalletConnect}
            sx={{ 
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <ListItemText 
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.1839 17.7069C13.6405 18.6507 13.3688 19.1226 13.0591 19.348C12.4278 19.8074 11.5723 19.8074 10.941 19.348C10.6312 19.1226 10.3595 18.6507 9.81613 17.7069L5.52066 10.2464C4.76864 8.94024 4.39263 8.28717 4.33762 7.75894C4.2255 6.68236 4.81894 5.65591 5.80788 5.21589C6.29309 5 7.04667 5 8.55383 5H15.4462C16.9534 5 17.7069 5 18.1922 5.21589C19.1811 5.65591 19.7745 6.68236 19.6624 7.75894C19.6074 8.28717 19.2314 8.94024 18.4794 10.2464L14.1839 17.7069ZM11.1 16.3412L6.56139 8.48002C6.31995 8.06185 6.19924 7.85276 6.18146 7.68365C6.14523 7.33896 6.33507 7.01015 6.65169 6.86919C6.80703 6.80002 7.04847 6.80002 7.53133 6.80002H7.53134L11.1 6.80002V16.3412ZM12.9 16.3412L17.4387 8.48002C17.6801 8.06185 17.8008 7.85276 17.8186 7.68365C17.8548 7.33896 17.665 7.01015 17.3484 6.86919C17.193 6.80002 16.9516 6.80002 16.4687 6.80002L12.9 6.80002V16.3412Z" fill="#FFFFFF"/>
                  </svg>
                  Connect Wallet
                </Box>
              } 
            />
          </ListItem>
        </List>
      </Drawer>

      {children}

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                mb: 2,
              }}
            >
              <Link to="/problems" style={{ textDecoration: 'none' }}>
                <Typography 
                  color="text.secondary"
                  sx={{
                    transition: 'color 0.2s ease-in-out',
                    '&:hover, &:focus, &:active': {
                      color: '#FFFFFF',
                    }
                  }}
                >
                  Problems
                </Typography>
              </Link>
              <Link to="/ratings" style={{ textDecoration: 'none' }}>
                <Typography 
                  color="text.secondary"
                  sx={{
                    transition: 'color 0.2s ease-in-out',
                    '&:hover, &:focus, &:active': {
                      color: '#FFFFFF',
                    }
                  }}
                >
                  Rating
                </Typography>
              </Link>
              <a href="https://t.me/domikedos" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Typography 
                  color="text.secondary"
                  sx={{
                    transition: 'color 0.2s ease-in-out',
                    '&:hover, &:focus, &:active': {
                      color: '#FFFFFF',
                    }
                  }}
                >
                  Contacts
                </Typography>
              </a>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Made with 🖤 by Itanarchy
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

function App() {
  const botId = '7630411210';
  const origin = window.location.origin;

  const openTelegramAuthWindow = () => {
    const url = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${encodeURIComponent(origin)}&embed=0&request_access=write&return_to=some-url`;
    const width = 550;
    const height = 450;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
    window.open(url, 'TelegramAuthWindow', windowFeatures);
  };

  return (
    <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={
              <Layout>
                <Container maxWidth="lg" sx={{ mt: 4, flexGrow: 1, px: { xs: 2, sm: 4, md: 6 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      p: 3,
                      mb: 4,
                      borderRadius: 3,
                    }}
                  >
                    <Box sx={{ flex: 1, textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 600, mb: 3 }}>
                        Solve smart contract problems
                      </Typography>
                      <Typography variant="body1" sx={{ maxWidth: '600px', mx: 'auto' }}>
                        Level up your smart contract's development skills, enhance your critical thinking, and tackle real-world challenges.
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          background: ' #2D83EC',
                          color: '#FFFFFF',
                          fontSize: '1.125rem',
                          fontWeight: 590,
                          padding: '12px 32px',
                          borderRadius: '6px',
                          textTransform: 'none',
                          transition: 'all 0.2s ease-in-out',
                          mt: 4,
                          '&:hover': {
                            transition: 'all 0.2s ease-in-out',
                            background: '#006699',
                            borderRadius: '8px',
                          }
                        }}
                      >
                        Solve now
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 3,
                      p: 3,
                      mb: 4,
                      borderRadius: 3,
                      flexDirection: { xs: 'column', md: 'row' }
                    }}
                  >
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', p: 4, backgroundColor: 'rgba(255, 255, 255, 0.035)', borderRadius: 2 }}>
                      <Box>
                        <svg viewBox="0 0 16 16" fill="#0098EA" style={{ width: 48, height: 48 }}>
                          <path d="M8.01005 0.858582L6.01005 14.8586L7.98995 15.1414L9.98995 1.14142L8.01005 0.858582Z" />
                          <path d="M12.5 11.5L11.0858 10.0858L13.1716 8L11.0858 5.91422L12.5 4.5L16 8L12.5 11.5Z" />
                          <path d="M2.82843 8L4.91421 10.0858L3.5 11.5L0 8L3.5 4.5L4.91421 5.91422L2.82843 8Z" />
                        </svg>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'left' }}>
                          Solve
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                          Solve problems and gain your skills in writing smart contracts
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', p: 4, backgroundColor: 'rgba(255, 255, 255, 0.035)', borderRadius: 2 }}>
                      <Box>
                        <svg fill="#0098EA" viewBox="0 0 511.999 511.999" style={{ width: 48, height: 48 }}>
                          <path d="M280.068,0C175.516,0,90.293,84.355,88.886,188.58L40.731,327.056h48.138V430.24h93.414v81.759h219.545V338.606 c20.245-16.76,37.064-37.757,48.903-61.125c13.627-26.9,20.538-55.929,20.538-86.28C471.268,85.772,385.496,0,280.068,0z M377.402,319.17l-5.991,4.565v157.847H212.7v-81.759h-93.414V296.638H83.513l35.773-102.87v-2.569 c0-88.655,72.127-160.782,160.782-160.782c88.656,0,160.783,72.127,160.783,160.783 C440.851,241.806,417.726,288.45,377.402,319.17z" />
                          <path d="M280.068,82.389c-56.801,0-103.014,46.212-103.014,103.015c0,27.2,10.504,52.856,29.578,72.242l1.39,1.412 c7.779,8.206,13.161,18.251,15.675,29.224v25.737c0,25.821,21.007,46.828,46.828,46.828h19.087 c25.821,0,46.828-21.007,46.828-46.828v-25.737c2.51-10.957,7.881-20.99,15.643-29.189l1.423-1.447 c19.074-19.387,29.578-45.043,29.578-72.242C383.083,128.601,336.87,82.389,280.068,82.389z M289.612,330.429h-19.087 c-9.049,0-16.411-7.362-16.411-16.411v-12.198h51.908v12.198h0.001C306.023,323.067,298.661,330.429,289.612,330.429z M269.872,185.403c0-5.622,4.574-10.197,10.196-10.197c5.622,0,10.197,4.574,10.197,10.197c0,5.622-4.575,10.196-10.197,10.196 C274.446,195.599,269.872,191.025,269.872,185.403z M332.258,235.868l-0.333,0.332c-10.042,10.005-17.596,22.01-22.229,35.203 h-14.42v-48.351c14.879-6.033,25.405-20.63,25.405-37.647c0-22.394-18.22-40.614-40.614-40.614 c-22.394,0-40.613,18.219-40.613,40.614c0,17.017,10.525,31.615,25.404,37.647v48.351h-14.419 c-4.631-13.194-12.187-25.198-22.229-35.203l-0.322-0.321c-13.172-13.609-20.418-31.508-20.418-50.474 c0-40.03,32.567-72.598,72.597-72.598c40.03,0,72.598,32.567,72.598,72.598C352.666,204.365,345.423,222.259,332.258,235.868z" />
                        </svg>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'left' }}>
                          Learn
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                          Learn from the community's solutions and share your own
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', p: 4, backgroundColor: 'rgba(255, 255, 255, 0.035)', borderRadius: 2 }}>
                      <Box>
                        <svg viewBox="-2 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ width: 48, height: 48 }}>
                          <g>
                            <g transform="translate(-4 -2)">
                              <circle fill="#29c3db" opacity="0" cx="7" cy="7" r="7" transform="translate(5 3)" />
                              <path d="M16.11,15.66,17,21l-5-1L7,21l.89-5.34" fill="none" stroke="#0098EA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                              <circle cx="7" cy="7" r="7" transform="translate(5 3)" fill="none" stroke="#0098EA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </g>
                          </g>
                        </svg>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'left' }}>
                          Earn
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                          Earn rewards for solving problems and contributing to the community
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {/* Register Box */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 3,
                      p: 4,
                      mt: 8,
                      mb: 4,
                      borderRadius: 3,
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 600, textAlign: 'center' }}>
                      Register Now
                    </Typography>
                    <Typography variant="body1" sx={{ maxWidth: '600px', textAlign: 'center', color: 'text.secondary' }}>
                      Join our community of developers and start solving smart contract challenges today. Connect your wallet and Telegram to get started.
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 2, 
                      alignItems: 'center', 
                      mt: 2,
                      flexDirection: { xs: 'column', sm: 'row' },
                      width: { xs: '100%', sm: 'auto' }
                    }}>
                      <Button
                        onClick={openTelegramAuthWindow}
                        sx={{
                          borderRadius: '6px !important',
                          background: '#0088CC !important',
                          color: '#FFFFFF !important',
                          fontSize: '15px !important',
                          fontWeight: 590,
                          lineHeight: '18px',
                          padding: '11px 16px !important',
                          transition: 'all 0.2s ease-in-out !important',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          letterSpacing: '-0.5px',
                          width: { xs: '100%', sm: 'auto' },
                          '&:hover': {
                            borderRadius: '8px !important',
                            background: '#006699 !important',
                          }
                        }}
                      >
                        <img 
                          src="data:image/svg+xml,%3Csvg%20height%3D%2218%22%20viewBox%3D%220%200%2017%2018%22%20width%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m.32%208.22c4.81-2.07%208.02-3.43%209.62-4.08%203.48-1.43%204.87-1.96%205.61-2.13.23-.06%201.45.29%201.45%201.18%200%202.58-1.32%208.8-1.87%2011.67-.23%201.22-1.88%201.6-3.74.45-1.47-.91-2.27-1.52-3.68-2.44-1.63-1.05-.58-1.63.35-2.58.25-.25%204.47-4.03%204.55-4.37.01-.04.02-.2-.08-.29-.09-.08-.24-.05-.34-.03-.14.03-2.46%201.54-6.96%204.53-.66.44-1.25.66-1.79.65-.59-.02-1.15-.05-2.56-.6-.94-.37-1.13-1.02-.56-1.96z%22%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E"
                          alt="Telegram"
                          style={{ width: '18px', height: '18px' }}
                        />
                        Connect Telegram
                      </Button>
                      <Button
                        onClick={() => tonConnectUI.current?.openModal()}
                        sx={{
                          borderRadius: '6px !important',
                          background: ' #0088CC !important',
                          color: '#FFFFFF !important',
                          fontSize: '15px !important',
                          fontWeight: 590,
                          lineHeight: '18px',
                          padding: '8px 16px !important',
                          transition: 'all 0.2s ease-in-out !important',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          letterSpacing: '-0.5px',
                          width: { xs: '100%', sm: 'auto' },
                          '&:hover': {
                            borderRadius: '8px !important',
                            background: 'rgba(0, 136, 204, 0.8) !important',
                          }
                        }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M14.1839 17.7069C13.6405 18.6507 13.3688 19.1226 13.0591 19.348C12.4278 19.8074 11.5723 19.8074 10.941 19.348C10.6312 19.1226 10.3595 18.6507 9.81613 17.7069L5.52066 10.2464C4.76864 8.94024 4.39263 8.28717 4.33762 7.75894C4.2255 6.68236 4.81894 5.65591 5.80788 5.21589C6.29309 5 7.04667 5 8.55383 5H15.4462C16.9534 5 17.7069 5 18.1922 5.21589C19.1811 5.65591 19.7745 6.68236 19.6624 7.75894C19.6074 8.28717 19.2314 8.94024 18.4794 10.2464L14.1839 17.7069ZM11.1 16.3412L6.56139 8.48002C6.31995 8.06185 6.19924 7.85276 6.18146 7.68365C6.14523 7.33896 6.33507 7.01015 6.65169 6.86919C6.80703 6.80002 7.04847 6.80002 7.53133 6.80002H7.53134L11.1 6.80002V16.3412ZM12.9 16.3412L17.4387 8.48002C17.6801 8.06185 17.8008 7.85276 17.8186 7.68365C17.8548 7.33896 17.665 7.01015 17.3484 6.86919C17.193 6.80002 16.9516 6.80002 16.4687 6.80002L12.9 6.80002V16.3412Z" fill="#FFFFFF"/>
                        </svg>
                        Connect Wallet
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </Layout>
            } />
            <Route path="/problems" element={
              <Layout>
                <Problems />
              </Layout>
            } />
            <Route path="/problems/:id" element={
              <Layout>
                <Problem />
              </Layout>
            } />
            <Route path="/ratings" element={
              <Layout>
                <Ratings />
              </Layout>
            } />
            <Route path="/users/:id" element={
              <Layout>
                <UserProfile />
              </Layout>
            } />
            <Route path="/submissions/:id" element={
              <Layout>
                <Submission />
              </Layout>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </TonConnectUIProvider>
  );
}

export default App; 