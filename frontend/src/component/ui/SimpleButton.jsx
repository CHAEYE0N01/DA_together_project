import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    padding: 8px 8px;
    font-size: 13px;
    border-width: 1px;
    border-radius: 8px;
    width: 60px; /* 너비 조절 */
    cursor: pointer;
    align-items: right;
`;

function SimpleButton(props) {
    const { title, onClick } = props;

    return <StyledButton onClick={onClick}>{title || "button"}</StyledButton>;
}

export default SimpleButton;
