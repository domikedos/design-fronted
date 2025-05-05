import { Box, Container, Typography, Paper, Avatar } from '@mui/material';
import { UserList } from '../components/UserList/UserList';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { useSearch } from '../hooks/useSearch';
import { MOCK_USERS } from '../constants/mockData';
import Lottie from "lottie-react";
import utyaWinAnimation from "../assets/utya_win.json";
import { useNavigate } from 'react-router-dom';

export default function Ratings() {
  const { handleSearch, filteredItems } = useSearch(MOCK_USERS);
  const navigate = useNavigate();

  const handleUserClick = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 5,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 },
        width: '100%'
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, width: { xs: '100%', sm: 'auto' } }}>
          Top Users
        </Typography>
        <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <SearchBar onSearch={handleSearch} placeholder="Search users..." />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: { xs: 'none', md: 10 }, width: '100%' }}>
          <UserList users={filteredItems} />
        </Box>
        <Box sx={{ 
          flex: { xs: 'none', md: 8 },
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 's',
          borderRadius: '8px',
          pl: { xs: 0, md: 4 },
          width: '100%'
        }}>
          <Box sx={{ 
            width: '100%', 
            mb: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.035)',
            borderRadius: '8px',
            pt: 4,
            pl: 4,
            pr: 4,
          }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>You</Typography>
            <Paper
              onClick={() => handleUserClick(1)}
              sx={{
                pl: { xs: 1, md: 3 },
                pt: 1,
                pb: 1,
                pr: { xs: 1, md: 3 },
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                transition: 'all 0.2s ease-in-out',
                border: 'none !important',
                borderRadius: '0 !important',
                boxShadow: 'none !important',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                width: '100%',
                mb: 4,
                mt: 2,
                cursor: 'pointer',
                '&:hover': {
                  transition: 'all 0.2s ease-in-out',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                },
              }}
            >
              <Typography sx={{ minWidth: '40px', textAlign: 'center' }}>&gt;100</Typography>
              <Avatar 
                src="https://t.me/i/userpic/320/ayvCF33t3nG4DURTily_uvWOmu3mdDYfZlT5Quw-Gk07Hu_vO3Zbu-LcK-J3SsUx.jpg"
                alt="Domikedos"
                sx={{ 
                  width: 32, 
                  height: 32,
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                }}
              />
              <Typography sx={{ flexGrow: 1 }}>Domikedos</Typography>
              <Typography sx={{ minWidth: '50px', mr: 2, textAlign: 'center' }}>42</Typography>
            </Paper>
          </Box>
          <Box sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.035)', 
            width: '100%', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            pt: 4,
            pl: 4,
            pr: 4,
          }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, textAlign: 'center' }}>Solve problems and get on top</Typography>
            <Lottie animationData={utyaWinAnimation} style={{ maxWidth: 300, maxHeight: 300, width: '100%', height: '100%' }} />
          </Box>
          
        </Box>
      </Box>
    </Container>
  );
} 