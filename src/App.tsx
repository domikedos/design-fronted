import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TonConnectUIProvider, THEME } from '@tonconnect/ui-react';
import { theme } from './theme/theme';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import Problems from './pages/Problems';
import Ratings from './pages/Ratings';
import UserProfile from './pages/UserProfile';
import Submission from './pages/Submission';
import Problem from './pages/Problem';
import { useWalletConnection } from './hooks/useWalletConnection';

// Add Telegram auth handler
declare global {
  interface Window {
    onTelegramAuth: (user: any) => void;
  }
}

function AppContent() {
  useWalletConnection();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/problems" element={
            <Layout>
              <Problems />
            </Layout>
          } />
          <Route path="/problems/:id" element={
            <Layout>
              <Problem />
            </Layout>
          } />
          <Route path="/ratings" element={
            <Layout>
              <Ratings />
            </Layout>
          } />
          <Route path="/users/:id" element={
            <Layout>
              <UserProfile />
            </Layout>
          } />
          <Route path="/submissions/:id" element={
            <Layout>
              <Submission />
            </Layout>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <TonConnectUIProvider 
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
      uiPreferences={{
        theme: THEME.DARK,
        borderRadius: 's',
      }}
    >
      <AppContent />
    </TonConnectUIProvider>
  );
}

export default App; 