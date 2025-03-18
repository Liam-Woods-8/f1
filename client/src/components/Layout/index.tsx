import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  margin-left: 240px; // Width of sidebar
  margin-top: 60px; // Height of navbar
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 0;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navbar />
      <Sidebar />
      <MainContent>
        {children}
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout; 