import { Container } from '@mui/material';
import { Introduction } from '../components/home/Introduction';
import { Features } from '../components/home/Features';
import { Register } from '../components/home/Register';

export const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, flexGrow: 1, px: { xs: 2, sm: 4, md: 6 } }}>
      <Introduction />
      <Features />
      <Register />
    </Container>
  );
}; 