import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: ${theme.typography.fontFamily};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.darkGray};
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
    border: none;
    background: none;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  ::selection {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.lightGray};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.secondaryGray};
    border-radius: ${theme.borderRadius.sm};
    
    &:hover {
      background: ${theme.colors.darkGray};
    }
  }
`; 