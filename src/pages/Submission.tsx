import { Box, Container, Typography, Paper, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Custom language definition for FunC
const customStyle = {
  ...vscDarkPlus,
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    color: '#d4d4d4',
  },
  '.token.comment': {
    color: '#6A9955',
  },
  '.token.keyword': {
    color: '#569CD6',
  },
  '.token.string': {
    color: '#CE9178',
  },
  '.token.function': {
    color: '#DCDCAA',
  },
  '.token.number': {
    color: '#B5CEA8',
  },
  '.token.operator': {
    color: '#D4D4D4',
  },
  '.token.punctuation': {
    color: '#D4D4D4',
  },
};

interface Submission {
  id: number;
  problemId: number;
  code: string;
  status: 'accepted' | 'failed' | 'testing';
  passedTests: number;
  totalTests: number;
  gasUsed: number;
  createdAt: string;
  language: string;
  userId: number;
  userName: string;
}

// Mock data - replace with actual API call
const MOCK_SUBMISSION: Submission = {
  id: 1,
  problemId: 1,
  code: `#pragma version >=0.2.0;

contract Counter {
    int counter;
    
    init() {
        counter = 0;
    }
    
    receive("increment") {
        counter += 1;
    }
    
    get fun counter() int {
        return counter;
    }
}`,
  status: 'failed',
  passedTests: 12,
  totalTests: 12,
  gasUsed: 12345,
  createdAt: '2024-03-20T15:30:00Z',
  language: 'FunC',
  userId: 1,
  userName: 'Domikedos'
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'accepted':
      return '#4CAF50';
    case 'failed':
      return '#F44336';
    case 'testing':
      return '#FFC107';
    default:
      return '#757575';
  }
};

export default function Submission() {
  // In real app, fetch submission data using id
  const submission = MOCK_SUBMISSION;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!submission) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
        <Typography variant="h4">Submission not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Code Section */}
        <Box sx={{ flex: { xs: 'none', md: 1 }, width: '100%' }}>
          <Paper
            sx={{
              p: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.035)',
              borderRadius: '8px',
              overflow: 'hidden',
              height: '100%',
              boxShadow: 'none',
              border: 'none'
            }}
          >
            <SyntaxHighlighter
              language="typescript"
              style={customStyle}
              customStyle={{
                margin: 0,
                borderRadius: '8px',
                padding: '24px',
                fontSize: '14px',
                lineHeight: '1.5',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0)'
              }}
            >
              {submission.code}
            </SyntaxHighlighter>
          </Paper>
        </Box>

        {/* Info Section */}
        <Box sx={{ 
          flex: { xs: 'none', md: 1 }, 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
          {/* Status and Tests */}
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.035)',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              boxShadow: 'none',
              border: 'none'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                label={submission.status.toUpperCase()}
                sx={{
                  backgroundColor: getStatusColor(submission.status),
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  height: '32px'
                }}
              />
              <Typography variant="body1" color="text.secondary">
                {submission.passedTests} / {submission.totalTests} tests passed
              </Typography>
            </Box>
          </Paper>

          {/* Additional Info */}
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.035)',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              boxShadow: 'none',
              border: 'none'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Submission Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Problem</Typography>
                <Link to={`/problems/${submission.problemId}`} style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: '#0098EA', '&:hover': { textDecoration: 'underline' } }}>
                    View Problem
                  </Typography>
                </Link>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">User</Typography>
                <Link to={`/users/${submission.userId}`} style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: '#0098EA', '&:hover': { textDecoration: 'underline' } }}>
                    {submission.userName}
                  </Typography>
                </Link>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Gas Used</Typography>
                <Typography>{submission.gasUsed.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Language</Typography>
                <Typography>{submission.language}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Submitted</Typography>
                <Typography>{formatDate(submission.createdAt)}</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
} 