import React from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

const getVariantStyles = (variant: ButtonVariant = 'primary') => {
  const variants = {
    primary: css`
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
      
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.darkGray};
      }
    `,
    secondary: css`
      background-color: ${({ theme }) => theme.colors.secondaryGray};
      color: ${({ theme }) => theme.colors.white};
      
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.darkGray};
      }
    `,
    outline: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary};
      border: 2px solid ${({ theme }) => theme.colors.primary};
      
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
      }
    `,
    text: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary};
      
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.lightGray};
      }
    `,
  };

  return variants[variant];
};

const getSizeStyles = (size: ButtonSize = 'medium') => {
  const sizes = {
    small: css`
      padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
      font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    `,
    medium: css`
      padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
      font-size: ${({ theme }) => theme.typography.fontSizes.md};
    `,
    large: css`
      padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
      font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    `,
  };

  return sizes[size];
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  
  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${({ loading }) => loading && css`
    position: relative;
    color: transparent;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `}
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      loading={loading}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 