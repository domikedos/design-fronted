import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
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
              gap: {xs: 2, md: 4},
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
  );
}; 