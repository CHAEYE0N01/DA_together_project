import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SimpleButton from '../ui/SimpleButton';
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

const Container = styled.div`
    width: 100%;
    max-width: 720px;
    margin-bottom: 20px;
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



function EmotionAnalysis(props) {
    const navigate = useNavigate();
    const [textValue, setTextValue] = useState("");

    const [emotionData, setEmotionData] = useState('');
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://your-server-url/getData'); // 서버에서 데이터 가져오는 API 엔드포인트
          const data = response.data.processedData; // 서버에서 받은 데이터
          setEmotionData(data);
          console.log('Received data from server:', data);
        } catch (error) {
          console.error('Error fetching data from server:', error);
        }
      };

      fetchData();
    }, []);

  
    const handleChange = (event) => {
      setTextValue(event.target.value);
    };
  
    const handleButtonClick = () => {
      console.log("Button clicked!");
      navigate('/book-view');
    };
  
    return (
    <>
    <GlobalStyle/>
      <Wrapper>
        <Container>
          <MainTitleText>책 추천해 드려유..</MainTitleText>
          
          <ContentContainer>
            <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>
              입력하신 문장에서 불안의 감정이 느껴집니다.
            </InitialText>
          </ContentContainer>
          
          <ContentContainer>
            <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>
              다음은 불안의 감정을 느낄 때 읽을 수 있는 책의 'n'개 카테고리입니다. 원하는 카테고리를 클릭해주세요.
            </InitialText>
          </ContentContainer>

          <ContentContainer>
            <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>
              <SimpleButton
                title="카테고리 0"
                onClick={handleButtonClick} />
              <SimpleButton
                title="카테고리 1"
                onClick={handleButtonClick} />
              <SimpleButton
                title="카테고리 2"
                onClick={handleButtonClick} />
              <SimpleButton
                title="카테고리 3"
                onClick={handleButtonClick} />
            </InitialText>
          </ContentContainer>
          
        </Container>
      </Wrapper>
    </>
    );
  }
  
  export default EmotionAnalysis;


  // return (
  //  <>
  //  <GlobalStyle/>
  //    <Wrapper>
  //      <Container>
  //        <MainTitleText>책 추천해 드려유..</MainTitleText>
  //        
  //        <ContentContainer>
  //          <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
  //          <InitialText>
  //            {emotionData && emotionData.emotion && `입력하신 문장에서 ${emotionData.emotion}'의 감정이 느껴집니다.`}
  //          </InitialText>
  //        </ContentContainer>
          
  //        <ContentContainer>
  //          <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
  //          <InitialText>
  //            {emotionData && emotionData.emotion && `다음은 ${emotionData.emotion}의 감정을 느낄 때 읽을 수 있는 책의 'n'개 카테고리입니다. 원하는 카테고리를 클릭해주세요.`}
  //          </InitialText>
  //        </ContentContainer>

  //        <Button
  //          title="책 추천받기"
  //          onClick={handleButtonClick} />
          
  //      </Container>
  //    </Wrapper>
  //  </>
  //  );
  // 