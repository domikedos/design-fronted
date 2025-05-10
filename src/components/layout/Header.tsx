import { AppBar, Toolbar, Typography, Button, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { ConnectWalletButton } from '../wallet/TonConnectButton';
import { TelegramConnectButton } from '../common/TelegramConnectButton';
import { useTelegramAuth } from '../../hooks/useTelegramAuth';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { openTelegramAuthWindow } = useTelegramAuth();

  const navigationItems = [
    { text: 'Problems', path: '/problems' },
    { text: 'Rating', path: '/ratings' },
    { text: 'Contacts', path: 'https://t.me/domikedos', isExternal: true }
  ];

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ 
        px: { xs: 2, sm: 4, md: 6 },
        minHeight: { xs: '72px', sm: '64px' }
      }}>
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
              <TelegramConnectButton onClick={openTelegramAuthWindow} header={true} />
              <ConnectWalletButton className='ton-connect-button' variant='header' />
            </Box>
          </>
        )}

        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={onMenuClick}
            sx={{ ml: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}; 