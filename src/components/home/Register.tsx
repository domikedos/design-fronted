import { Box, Typography } from '@mui/material';
import { ConnectWalletButton } from '../wallet/TonConnectButton';
import { TelegramConnectButton } from '../common/TelegramConnectButton';
import { useTelegramAuth } from '../../hooks/useTelegramAuth';

export const Register = () => {
  const { openTelegramAuthWindow } = useTelegramAuth();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        p: {xs: 1, md: 4},
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
        <TelegramConnectButton onClick={openTelegramAuthWindow} />
        <ConnectWalletButton className='ton-connect-button' variant='registration' />
      </Box>
    </Box>
  );
}; 