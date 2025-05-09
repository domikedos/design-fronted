import { Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ConnectWalletButton } from '../wallet/TonConnectButton';
import { TelegramConnectButton } from '../common/TelegramConnectButton';
import { useTelegramAuth } from '../../hooks/useTelegramAuth';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  const { openTelegramAuthWindow } = useTelegramAuth();

  const navigationItems = [
    { text: 'Problems', path: '/problems' },
    { text: 'Rating', path: '/ratings' },
    { text: 'Contacts', path: 'https://t.me/domikedos', isExternal: true }
  ];

  const handleTelegramClick = () => {
    openTelegramAuthWindow();
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#141824',
          width: '100%',
          maxWidth: '220px',
        }
      }}
    >
      <List sx={{ pt: 2 }}>
        {navigationItems.map((item) => (
          <ListItem 
            key={item.text} 
            component={Link} 
            to={item.path}
            onClick={onClose}
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
          onClick={onClose}
          sx={{ 
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          <ListItemText 
            primary={
              <TelegramConnectButton onClick={handleTelegramClick} header={true} />
            } 
          />
        </ListItem>
        <ListItem 
          onClick={onClose}
          sx={{ 
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          <ListItemText 
            primary={
              <ConnectWalletButton variant="header" />
            } 
          />
        </ListItem>
      </List>
    </Drawer>
  );
}; 