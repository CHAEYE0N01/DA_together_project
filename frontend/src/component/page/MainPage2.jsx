// from server import app;
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

// topic image container
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s ease-in-out;

  &.selected {
    border-color: blue;
  }
`;

function MainPage(props) {
    const navigate = useNavigate();
    const [textValue, setTextValue] = useState("");
    const [emotionData, setEmotionData] = useState(null); 
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(-1); //null? -1? 
    ;
    const handleChange = (event) => {
      setTextValue(event.target.value);
    };
  
    // 서버 연결시 버전
    const handleButtonClick = async () => {
      try {
        const response = await axios.post('http://localhost:5000/user_input', { user_input: textValue });
        const responseData = response.data;
        // setEmotionData(response.data); // 서버 응답으로 받은 데이터를 상태에 설정
        // 서버 응답으로부터 이미지 목록과 메시지를 설정

      setImageUrls(responseData.topic_images_list);
      setEmotionData(responseData.message);
      } catch (error) {
        console.error('Error sending data to server:', error);
      }
    };

    const handleImageClick = (index) => {
      // 이미지를 클릭했을 때 실행되는 함수
      setSelectedImageIndex(index);
    };

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
          {textValue && ( // textValue가 비어있지 않으면 버튼 렌더링
          <Button
            title="분석"
            onClick={handleButtonClick}
          />
          )}
        </ButtonWrapper>

        <ContentContainer>
          <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
          <InitialText>
          {emotionData && emotionData.message} {/* 서버 응답의 메시지 표시 */}
          </InitialText>
        </ContentContainer>

        {/* 이전 이미지 컨테이너 및 이미지 컴포넌트 */}
        <ImageContainer>
          {imageUrls.map((imageUrl, index) => (
            <StyledImage
              key={index}
              src={imageUrl}
              alt={`이미지 ${index}`}
              className={index === selectedImageIndex ? 'selected' : ''}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </ImageContainer>
      
      </Wrapper>
    </>
    );
  }
  
  export default MainPage;