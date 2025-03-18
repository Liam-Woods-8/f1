import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { store } from './store';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const RaceAnalytics = React.lazy(() => import('./pages/RaceAnalytics'));
const DriverComparison = React.lazy(() => import('./pages/DriverComparison'));
const TeamAnalytics = React.lazy(() => import('./pages/TeamAnalytics'));
const Profile = React.lazy(() => import('./pages/Profile'));

import Layout from './components/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import React from 'react';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Layout>
            <React.Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/race-analytics" element={<RaceAnalytics />} />
                <Route path="/driver-comparison" element={<DriverComparison />} />
                <Route path="/team-analytics" element={<TeamAnalytics />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </React.Suspense>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 