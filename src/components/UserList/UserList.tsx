import { Box, Grid, Paper, Typography, Avatar } from '@mui/material';
import { UserListProps } from '../../types/user';
import { useNavigate } from 'react-router-dom';

export const UserList = ({ users }: UserListProps) => {
  const navigate = useNavigate();

  const handleUserClick = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper
            sx={{
              pl: 3,
              pt: 2,
              pb: 2,
              pr: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              border: 'none !important',
              borderRadius: '0 !important',
              boxShadow: 'none !important',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <Typography sx={{ minWidth: '40px', textAlign: 'center', color: 'text.secondary' }}>#</Typography>
            <Typography sx={{ flexGrow: 1, color: 'text.secondary' }}>User</Typography>
            <Typography sx={{ mr: 2, color: 'text.secondary' }}>Solved</Typography>
          </Paper>
        </Grid>
        {users.map((user) => (
          <Grid item xs={12} key={user.id}>
            <Paper
              onClick={() => handleUserClick(user.id)}
              sx={{
                pl: 3,
                pt: 1,
                pb: 1,
                pr: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                transition: 'all 0.2s ease-in-out',
                border: 'none !important',
                borderRadius: '0 !important',
                boxShadow: 'none !important',
                backgroundColor: user.id % 2 === 0 ? 'rgba(255, 255, 255, 0.015)' : 'transparent',
                cursor: 'pointer',
                '&:hover': {
                  transition: 'all 0.2s ease-in-out',
                  backgroundColor: user.id % 2 === 0 ? 'rgba(255, 255, 255, 0.035)' : 'rgba(255, 255, 255, 0.02)',
                  transform: 'translateX(4px)'
                },
              }}
            >
              <Typography sx={{ minWidth: '40px', textAlign: 'center' }}>{user.place}</Typography>
              <Avatar 
                src={user.avatar} 
                alt={user.firstName}
                sx={{ 
                  width: 32, 
                  height: 32,
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                }}
              />
              <Typography sx={{ flexGrow: 1 }}>{user.firstName}</Typography>
              <Typography sx={{ minWidth: '50px', mr: 2, textAlign: 'center' }}>{user.solved}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 