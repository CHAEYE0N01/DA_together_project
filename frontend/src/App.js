import React, { useState } from "react";
import TextInput from "../src/components/TextInput"; // TextInput 컴포넌트의 경로에 따라 수정
import Button from "../src/components/Button"; // Button 컴포넌트의 경로에 따라 수정
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
`;

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

const InitialText = styled.p`
    font-size: 16px;
    font-weight: 1;
    text-align: center;
    margin-left: 20px;
`;

function App() {
  const [textValue, setTextValue] = useState(""); // 텍스트 입력 값 상태 관리

  const handleChange = (event) => {
    setTextValue(event.target.value); // 텍스트 입력 값 업데이트
  };

  const handleButtonClick = () => {
    // 버튼 클릭 시 실행될 동작
    console.log("Button clicked!");
    // 여기에 추가적인 동작을 구현할 수 있습니다.
  };

  return (
    <Container>
      <MainTitleText>책추천해드립니다.</MainTitleText>
      <InitialText>안녕하세요? 당신을 도와줄 챗봇입니다.</InitialText>
      <InitialText>당신의 기분을 작성해주세요.</InitialText>
      {/* TextInput 컴포넌트와 Button 컴포넌트를 사용하여 화면 구성 */}
      <TextInput value={textValue} onChange={handleChange} height={100} />
      <Button title="분석해드려요" onClick={handleButtonClick} />
    </Container>
  );
}

export default App;
