import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../ui/SimpleButton';
import TextInput from '../ui/TextInput';
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';

// 전체적인 레이아웃을 담당하는 코드
const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    //align-items: center;
    justify-content: center;
`;

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 70px;
`;

const InitialText = styled.p`
  font-size: 16px;
  font-weight: 1;
  text-align: left;
  padding: 10px 15px;
  color: black;
  max-width: 50%;
  word-wrap: break-word;
  background-color: lightgrey;
  border-radius: 10px;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -17px;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;
    margin-bottom: 20px;
`;

const TextInputWrapper = styled.p`
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-bottom: 0px; /* 아래 여백 추가 */
`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NanumNeo'; /* 원하는 폰트명으로 설정 */
    src: url('/NanumSquareNeoOTF-Rg.otf') format('truetype'); /* 폰트 파일 경로 설정 */
    /* 추가적으로 폰트 스타일 및 웨이트 설정 가능 */
  }

  body {
    font-family: 'NanumNeo', sans-serif; /* 사용할 폰트명 지정 */
    /* 나머지 스타일 설정 */
  }
`;

const ButtonWrapper = styled.p`
  display: flex;
  justify-content: flex-end;
`


function MainPage(props) {
    const navigate = useNavigate();
    const [textValue, setTextValue] = useState("");
  
    const handleChange = (event) => {
      setTextValue(event.target.value);
    };
  
    const handleButtonClick = () => {
      console.log("Button clicked!");
      navigate('/emotion-analysis');
    };


    // 서버 연결시 버전
    //const handleButtonClick = async() => {
    //  try {
        // Axios를 사용하여 입력된 값을 서버로 전송
    //    await axios.post('http://your-flask-server-url/submit', { userInput: textValue });

        // 페이지 이동
    //    navigate('/emotion-analysis');
    //  } catch (error) {
    //  console.error('Error sending data to server:', error);
    //  }
    //};

  
    return (
    <>
    <GlobalStyle/>
      <Wrapper>
        <Container>
          <MainTitleText>책 추천해 드려유..</MainTitleText>
          
          <ContentContainer>
            <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>당신을 도와줄 챗봇입니다.</InitialText>
          </ContentContainer>
          
          <ContentContainer>
            <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>당신의 기분을 작성해주세요.</InitialText>
          </ContentContainer>
        </Container>
        <TextInputWrapper> {/* TextInput을 담을 Wrapper 추가 */}
          <TextInput value={textValue} onChange={handleChange} height={100} />
        </TextInputWrapper>
        <ButtonWrapper>
          <Button
            title="분석"
            onClick={handleButtonClick} />
        </ButtonWrapper>
      </Wrapper>
    </>
    );
  }
  
  export default MainPage;