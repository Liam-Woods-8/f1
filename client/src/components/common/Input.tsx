import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

type InputBaseProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

interface InputProps extends InputBaseProps {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
}

const InputWrapper = styled.div<Pick<InputProps, 'fullWidth'>>`
  display: inline-flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const getInputSize = (size: InputProps['size'] = 'medium') => {
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

const getInputVariant = (variant: InputProps['variant'] = 'outlined') => {
  const variants = {
    outlined: css`
      border: 2px solid ${({ theme }) => theme.colors.lightGray};
      background-color: transparent;

      &:hover:not(:disabled) {
        border-color: ${({ theme }) => theme.colors.secondaryGray};
      }

      &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
      }
    `,
    filled: css`
      border: none;
      background-color: ${({ theme }) => theme.colors.lightGray};

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => `${theme.colors.lightGray}CC`};
      }

      &:focus {
        background-color: ${({ theme }) => `${theme.colors.lightGray}99`};
        box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
      }
    `,
  };

  return variants[variant];
};

interface StyledInputProps extends Pick<InputProps, 'size' | 'variant'> {
  hasStartIcon?: boolean;
  hasEndIcon?: boolean;
  hasError?: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.fast};
  outline: none;
  ${({ size }) => getInputSize(size)}
  ${({ variant }) => getInputVariant(variant)}
  
  padding-left: ${({ hasStartIcon, theme }) => hasStartIcon && theme.spacing.xl};
  padding-right: ${({ hasEndIcon, theme }) => hasEndIcon && theme.spacing.xl};
  
  ${({ hasError, theme }) =>
    hasError &&
    css`
      border-color: ${theme.colors.error} !important;
      
      &:focus {
        box-shadow: 0 0 0 3px ${theme.colors.error}20;
      }
    `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.div<{ position: 'start' | 'end' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => position === 'start' ? 'left' : 'right'}: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.secondaryGray};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const HelperText = styled.p<{ isError?: boolean }>`
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme, isError }) => isError ? theme.colors.error : theme.colors.secondaryGray};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      fullWidth = false,
      variant = 'outlined',
      size = 'medium',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <InputWrapper fullWidth={fullWidth} className={className}>
        {label && <Label>{label}</Label>}
        <InputContainer>
          {startIcon && <IconWrapper position="start">{startIcon}</IconWrapper>}
          <StyledInput
            ref={ref}
            variant={variant}
            size={size}
            hasStartIcon={!!startIcon}
            hasEndIcon={!!endIcon}
            hasError={!!error}
            {...props}
          />
          {endIcon && <IconWrapper position="end">{endIcon}</IconWrapper>}
        </InputContainer>
        {(error || helperText) && (
          <HelperText isError={!!error}>{error || helperText}</HelperText>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export default Input; 