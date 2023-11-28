import React from "react";
import styled, { css } from 'styled-components';


const colorStyles = css`
  ${({ theme, color }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
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


const StyledButton = styled.button`
    padding: 10px 10px;
    font-size: 14px;
    outline: none;
    border: none;
    border-width: 1px;
    border-radius: 8px;
    color: '#211C39';
    font-weight: bold;
    width: 90px; /* 너비 조절 */
    cursor: pointer;
    align-items: right;
    margin: 5px;

    ${colorStyles}
`;

function SimpleButton(props) {
    const { title, color, onClick } = props;

    return <StyledButton color={color} onClick={onClick}>{title || "button"}</StyledButton>;
}

export default SimpleButton;
