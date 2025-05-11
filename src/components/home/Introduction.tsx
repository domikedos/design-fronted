import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTokenStore } from '../../store/authToken';

export const Introduction = () => {
  const navigate = useNavigate();
  const { accessToken } = useTokenStore();

  const handleSolveNowClick = () => {
    if (!accessToken) {
      const registerSection = document.getElementById('register-section');
      if (registerSection) {
        registerSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/problems');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        p: {xs: 1, md: 4},
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
          onClick={handleSolveNowClick}
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
  );
}; 