import { Button } from '@mui/material';

interface TelegramConnectButtonProps {
  onClick: () => void;
  header?: boolean;
}

export const TelegramConnectButton = ({ onClick, header = false }: TelegramConnectButtonProps) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        borderRadius: '6px !important',
        background: '#0088CC !important',
        color: '#FFFFFF !important',
        fontSize: '15px !important',
        fontWeight: 590,
        lineHeight: '18px',
        padding: header ? '9px 16px !important' : '12px 18px !important',
        transition: 'all 0.2s ease-in-out !important',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        letterSpacing: '-0.5px',
        width: {xs: '100%', sm: 'auto'},
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
  );
}; 