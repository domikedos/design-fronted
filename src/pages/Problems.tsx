import { Box, Container, Typography, Paper, Grid, Chip, TextField, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const problems: Problem[] = [
  {
    id: 1,
    title: 'Simple Counter',
    difficulty: 'Easy',
  },
  {
    id: 2,
    title: 'Token Transfer',
    difficulty: 'Medium',
  },
  {
    id: 3,
    title: 'NFT Marketplace',
    difficulty: 'Hard',
  },
  {
    id: 4,
    title: 'Simple Counter',
    difficulty: 'Easy',
  },
  {
    id: 5,
    title: 'Token Transfer',
    difficulty: 'Medium',
  },
  {
    id: 6,
    title: 'NFT Marketplace',
    difficulty: 'Hard',
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return '#00C853';
    case 'Medium':
      return '#FFC107';
    case 'Hard':
      return '#FF1744';
    default:
      return '#757575';
  }
};

export default function Problems() {
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
          Problems
        </Typography>
        <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            size="small"
            placeholder="Search problems..."
            sx={{
              width: { xs: '100%', sm: '300px' },
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <Grid container spacing={0}>
        {problems.map((problem) => (
          <Grid item xs={12} key={problem.id}>
            <Link to={`/problems/${problem.id}`} style={{ textDecoration: 'none' }}>
              <Paper
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
                  backgroundColor: problem.id % 2 === 0 ? 'rgba(255, 255, 255, 0.015)' : 'transparent',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: problem.id % 2 === 0 ? 'rgba(255, 255, 255, 0.035)' : 'rgba(255, 255, 255, 0.02)',
                    transform: 'translateX(8px)',
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1) !important',
                    '& .MuiChip-root': {
                      transform: 'scale(1.05)',
                    }
                  },
                }}
              >
                <Typography sx={{ minWidth: '40px' }}>{problem.id}.</Typography>
                <Typography sx={{ flexGrow: 1 }}>{problem.title}</Typography>
                <Chip
                  label={problem.difficulty}
                  sx={{
                    backgroundColor: getDifficultyColor(problem.difficulty),
                    color: 'white',
                    fontWeight: 600,
                    transition: 'transform 0.2s ease-in-out',
                  }}
                />
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 