import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';

const SidebarWrapper = styled.aside`
  position: fixed;
  left: 0;
  top: 60px; // Height of navbar
  bottom: 0;
  width: 240px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.md};
  z-index: 900;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    transform: translateX(-100%);
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

interface NavItemProps {
  active: boolean;
}

const NavItem = styled(NavLink)<NavItemProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  ${({ active, theme }) => active && `
    background-color: ${theme.colors.lightGray};
  `}
`;

const NavSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  h3 {
    color: ${({ theme }) => theme.colors.secondaryGray};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    text-transform: uppercase;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarWrapper>
      <NavList>
        <NavSection>
          <h3>Race Information</h3>
          <NavItem to="/" active={isActive('/')}>
            Dashboard
          </NavItem>
          <NavItem to="/race-analytics" active={isActive('/race-analytics')}>
            Race Analytics
          </NavItem>
        </NavSection>

        <NavSection>
          <h3>Competitors</h3>
          <NavItem to="/driver-comparison" active={isActive('/driver-comparison')}>
            Driver Comparison
          </NavItem>
          <NavItem to="/team-analytics" active={isActive('/team-analytics')}>
            Team Analytics
          </NavItem>
        </NavSection>

        <NavSection>
          <h3>User</h3>
          <NavItem to="/profile" active={isActive('/profile')}>
            Profile
          </NavItem>
        </NavSection>
      </NavList>
    </SidebarWrapper>
  );
};

export default Sidebar; 