import { Box, Container, Typography, Paper, Avatar, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_USERS } from '../constants/mockData';

interface Submission {
  id: number;
  problemName: string;
  status: 'success' | 'failed';
  date: string;
  language: string;
}

const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 1,
    problemName: "Simple Storage",
    status: "success",
    date: "2024-03-20",
    language: "FunC"
  },
  {
    id: 2,
    problemName: "Counter Contract",
    status: "failed",
    date: "2024-03-19",
    language: "FunC"
  },
  {
    id: 3,
    problemName: "Token Transfer",
    status: "success",
    date: "2024-03-18",
    language: "FunC"
  }
];

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = MOCK_USERS.find(u => u.id === Number(id));
  const totalProblems = 100; // This should come from your backend
  const solvedProblems = user?.solved || 0;
  const progress = (solvedProblems / totalProblems) * 100;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    console.log(date);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
        <Typography variant="h4">User not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* User Info Block */}
          <Paper
            sx={{
              flex: 1,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.035)',
              borderRadius: '8px',
              boxShadow: 'none',
              border: 'none'
            }}
          >
            <Avatar
              src={user.avatar}
              alt={user.firstName}
              sx={{
                width: 120,
                height: 120,
                border: '4px solid rgba(255, 255, 255, 0.1)',
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              @{user.firstName.toLowerCase().replace(/\s+/g, '')}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 500,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {user.address}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Member since {formatDate(user.createdAt)}
            </Typography>
          </Paper>

          {/* Progress Circle Block */}
          <Paper
            sx={{
              flex: 1,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.035)',
              borderRadius: '8px',
              boxShadow: 'none',
              border: 'none'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Solved Problems
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                value={progress}
                size={200}
                thickness={4}
                sx={{
                  color: '#0098EA',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  },
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h3" component="div" sx={{ fontWeight: 600 }}>
                  {solvedProblems}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  of {totalProblems}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Last Submissions Block */}
        <Paper
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.035)',
            borderRadius: '8px',
            boxShadow: 'none',
            border: 'none'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Last Submissions
          </Typography>
          {MOCK_SUBMISSIONS.map((submission) => (
            <Paper
              key={submission.id}
              onClick={() => navigate(`/submissions/${submission.id}`)}
              sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                borderRadius: '4px',
                transition: 'all 0.2s ease-in-out',
                boxShadow: 'none',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  transform: 'translateX(4px)'
                },
              }}
            >
              <Box>
                <Typography variant="body1">{submission.problemName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {submission.language} • {submission.date}
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: submission.status === 'success' ? '#4CAF50' : '#F44336',
                  fontWeight: 500,
                }}
              >
                {submission.status === 'success' ? 'Accepted' : 'Failed'}
              </Typography>
            </Paper>
          ))}
        </Paper>
      </Box>
    </Container>
  );
} 