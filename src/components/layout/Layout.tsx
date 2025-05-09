import { Box } from '@mui/material';
import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <MobileMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      {children}
      <Footer />
    </Box>
  );
}; 