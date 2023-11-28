import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { darken, lighten } from 'polished';

// Define your theme
const theme = {
  palette: {
    primary: '#211C39',
    // ... other color definitions
  },
  // ... other theme properties
};

// Common color styles
const colorStyles = css`
  ${({ theme, color }) => {
    const selected = theme.palette[color] || color;
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      ${props =>
        props.outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
          &:hover {
            background: ${selected};
            color: white;
          }
        `}
    `;
  }}
`;

// Define sizes
const sizes = {
  large: {
    height: '3rem',
    fontSize: '1.25rem'
  },
  medium: {
    height: '2.25rem',
    fontSize: '1rem'
  },
  small: {
    height: '1.75rem',
    fontSize: '0.875rem'
  }
};

// Size styles
const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

// Full width style
const fullWidthStyle = css`
  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
      justify-content: center;
      & + & {
        margin-right: 2rem;
        margin-left: 2rem;
        margin-top: 1rem;
      }
    `}
`;

// StyledButton component
const StyledButton = styled.button`
  /* Common styles */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: 2rem;

  /* Size styles */
  ${sizeStyles}

  /* Color styles */
  ${colorStyles}

  /* Other styles */
  & + & {
    margin-left: 2rem;
  }

  ${fullWidthStyle}
`;

// Button component
function Button({ children, color, size, outline, fullWidth, ...rest }) {
  const validColor = theme.palette[color] || '#211C39';

  return (
    <ThemeProvider theme={theme}>
      <StyledButton
        color={validColor}
        size={size}
        outline={outline}
        fullWidth={fullWidth}
        {...rest}
      >
        {children}
      </StyledButton>
    </ThemeProvider>
  );
}

Button.defaultProps = {
  color: '#211C39', // You can use the color defined in your theme
  size: 'medium'
};

export default Button;