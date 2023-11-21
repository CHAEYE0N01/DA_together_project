import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
    width: calc(100% - 70px);
    ${(props) =>
        props.height &&
        `
        height: ${props.height}px;
    `}
    padding: 10px;      // 박스 외곽 넓이
    font-size: 16px;    // 글씨 크기
    line-height: 20px;  // 줄간격
`;

function TextInput(props) {
    const { height, value, onChange } = props;

    return <StyledTextarea height={height} value={value} onChange={onChange} />;
}

export default TextInput;