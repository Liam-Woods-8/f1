import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
  children: React.ReactNode;
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

interface CardFooterProps {
  children: React.ReactNode;
}

const getVariantStyles = (variant: CardProps['variant'] = 'default') => {
  const variants = {
    default: css`
      background-color: ${({ theme }) => theme.colors.white};
      box-shadow: ${({ theme }) => theme.shadows.sm};
    `,
    outlined: css`
      background-color: ${({ theme }) => theme.colors.white};
      border: 1px solid ${({ theme }) => theme.colors.lightGray};
    `,
    elevated: css`
      background-color: ${({ theme }) => theme.colors.white};
      box-shadow: ${({ theme }) => theme.shadows.lg};
    `,
  };

  return variants[variant];
};

const getPaddingStyles = (padding: CardProps['padding'] = 'medium') => {
  const paddings = {
    none: css`
      padding: 0;
    `,
    small: css`
      padding: ${({ theme }) => theme.spacing.sm};
    `,
    medium: css`
      padding: ${({ theme }) => theme.spacing.md};
    `,
    large: css`
      padding: ${({ theme }) => theme.spacing.lg};
    `,
  };

  return paddings[padding];
};

const CardContainer = styled.div<CardProps>`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  ${({ variant }) => getVariantStyles(variant)}
  ${({ padding }) => getPaddingStyles(padding)}
`;

const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const HeaderTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
`;

const HeaderSubtitle = styled.p`
  margin: ${({ theme }) => `${theme.spacing.xs} 0 0`};
  color: ${({ theme }) => theme.colors.secondaryGray};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const HeaderAction = styled.div`
  margin-left: ${({ theme }) => theme.spacing.md};
`;

const StyledCardFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
  background-color: ${({ theme }) => `${theme.colors.lightGray}10`};
`;

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <StyledCardHeader>
      <HeaderContent>
        <HeaderTitle>{title}</HeaderTitle>
        {subtitle && <HeaderSubtitle>{subtitle}</HeaderSubtitle>}
      </HeaderContent>
      {action && <HeaderAction>{action}</HeaderAction>}
    </StyledCardHeader>
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({ children }) => {
  return <StyledCardFooter>{children}</StyledCardFooter>;
};

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'medium',
  className,
  children,
}) => {
  return (
    <CardContainer variant={variant} padding={padding} className={className}>
      {children}
    </CardContainer>
  );
};

export default Card; 