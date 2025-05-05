import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Problems', path: '/problems' },
    { text: 'Rating', path: '/ratings' },
    { text: 'Contacts', path: 'https://t.me/domikedos', isExternal: true }
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {menuItems.map((item) => (
          item.isExternal ? (
            <ListItem 
              button 
              component="a"
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              key={item.text}
              onClick={handleDrawerToggle}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ) : (
            <ListItem 
              button 
              component={Link} 
              to={item.path} 
              key={item.text}
              onClick={handleDrawerToggle}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          )
        ))}
      </List>
    </Box>
  );

  return (
    <>
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

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
                {menuItems.map((item) => (
                  item.isExternal ? (
                    <Button
                      key={item.text}
                      color="inherit"
                      component="a"
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': {
                          color: '#FFFFFF',
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  ) : (
                    <Button
                      key={item.text}
                      color="inherit"
                      component={Link}
                      to={item.path}
                      sx={{
                        color: location.pathname === item.path ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                        '&:hover': {
                          color: '#FFFFFF',
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  )
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
                <div id="ton-connect-button"></div>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            backgroundColor: '#141824',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navigation; 