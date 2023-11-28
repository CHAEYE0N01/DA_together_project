import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import SimpleButton from '../ui/SimpleButton';
import TextInput from '../ui/TextInput';
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';

import Button from '../ui/Button';
import Dialog from '../ui/Dialog';
import Dialog1 from '../ui/Dialog1';
import Dialog2 from '../ui/Dialog2';
import Dialog3 from '../ui/Dialog3';
import Dialog4 from '../ui/Dialog4';


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
    const [textValue, setTextValue] = useState("");   // 사용자 입력을 관리하는 상태 변수
    const [chatValue, setChatValue] = useState(null);  // 챗봇의 응답을 관리하는 상태 변수
    const [showAnalysis, setShowAnalysis] = useState(false); // 분석 결과를 보여줄지 결정하는 상태 변수

    const [emotionData, setEmotionData] = useState(null); 
    const [imageList, setImageList] = useState([]);
  
    // 사용자 입력 처리 함수
    const handleChange = (event) => {
      setTextValue(event.target.value);
    };
    
    // 서버 연결시 버전
    const handleButtonClick = async () => {
      try {
        const response = await axios.post('http://localhost:5000/chat', { user_input_1: chatValue });
        setChatValue(response.data.chat_ouput);
        setShowAnalysis(true);  // 분석 버튼을 눌러야 응답이 뜸
      } catch (error) {
        console.error('Error sending data to server:', error);
      }
    };

    // const handleButtonClick = async () => {
    //   try {
    //     const response = await axios.post('http://localhost:5000/user_input', { user_input: textValue });
    //     setEmotionData(response.data); // 서버 응답으로 받은 데이터를 상태에 설정
  
    //     // 만약 서버 응답으로부터 topic_images_list를 받는다면,
    //     if (response.data && response.data.topic_images_list) {
    //       setImageList(response.data.topic_images_list); // 이미지 URL 목록 상태에 설정
    //     }
    //   } catch (error) {
    //     console.error('Error sending data to server:', error);
    //   }
    // };

    const GenreButtonClick = async () => {
      try {
        const response = await axios.post('/user_input', { user_input: textValue });
        setEmotionData(response.data); // 서버 응답으로 받은 데이터를 상태에 설정
      } catch (error) {
        console.error('Error sending data to server:', error);
      }
    };

    const [dialog, setDialog] = useState(false);
    const onClick = () => {
      setDialog(true);
    };
    const onConfirm = () => {
      console.log('확인');
      setDialog(false);
    };
    const onCancel = () => {
      console.log('취소');
      setDialog(false);
    };
  
    const [dialog1, setDialog1] = useState(false);
    const onClick1 = () => {
      setDialog1(true);
    };
    const onConfirm1 = () => {
      console.log('확인');
      setDialog1(false);
    };
    const onCancel1 = () => {
      console.log('취소');
      setDialog1(false);
    };
  
    const [dialog2, setDialog2] = useState(false);
    const onClick2 = () => {
      setDialog2(true);
    };
    const onConfirm2 = () => {
      console.log('확인');
      setDialog2(false);
    };
    const onCancel2 = () => {
      console.log('취소');
      setDialog2(false);
    };
  
    const [dialog3, setDialog3] = useState(false);
    const onClick3 = () => {
      setDialog3(true);
    };
    const onConfirm3 = () => {
      console.log('확인');
      setDialog3(false);
    };
    const onCancel3 = () => {
      console.log('취소');
      setDialog3(false);
    };
  
    const [dialog4, setDialog4] = useState(false);
    const onClick4 = () => {
      setDialog4(true);
    };
    const onConfirm4 = () => {
      console.log('확인');
      setDialog4(false);
    };
    const onCancel4 = () => {
      console.log('취소');
      setDialog4(false);
    };
  
  
    return (
    <ThemeProvider
      theme={{
        palette: {
          blue: '#228be6',
          gray: '#495057',
          pink: '#f06595',
          blueblack: '#211C39',
          bluegray: '#424563'
        }
      }}
    >
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
          <SimpleButton
            title="분석"
            onClick={handleButtonClick}
          />
          )}
        </ButtonWrapper> 
        
          <ContentContainer>
            <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>
            {setShowAnalysis && (
                <div>
                  {/* <p>챗봇 응답:</p> */}
                  <p>{chatValue}</p>
                </div>
              )}
            </InitialText>
          </ContentContainer>

          <ContentContainer>
            <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>
            {emotionData && emotionData.message} {/* 서버 응답의 메시지 표시 */}
            </InitialText>
          </ContentContainer>

        <ContentContainer>
          <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
          <InitialText>
              다음은 위와 같은 감정을 느낄 때 읽을 수 있는 책의 주제입니다. 읽기를 원하시는 주제를 선택해주세요.
          </InitialText>
        </ContentContainer>

        <ContentContainer>
          <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
          <InitialText>
            {imageList.length > 0 && (
              <div>
                <ul>
                  {imageList.map((encodedImage, index) => (
                    <li key={index}>
                      {/* base64로 인코딩된 이미지를 이미지로 표시 */}
                      <img src={`data:image/png;base64, ${encodedImage}`} alt={`Image ${index}`} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </InitialText>
        </ContentContainer>


          <ContentContainer>
          <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
          <InitialText>
              다음은 책의 장르입니다. 아래 버튼을 클릭해주시면, 당신에게 도움이 되는 책 5권을 추천드릴게요!
          </InitialText>
          </ContentContainer>

          <ContentContainer>
            <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>
              <SimpleButton
                title="소설"
                onClick={GenreButtonClick} />
              <SimpleButton
                title="에세이"
                onClick={GenreButtonClick} />
              <SimpleButton
                title="자기계발"
                onClick={GenreButtonClick} />
              <SimpleButton
                title="Null"
                onClick={GenreButtonClick} />
            </InitialText>
          </ContentContainer>

          <ContentContainer>
            <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>
              아래 도서 이미지를 클릭하시면, 책의 상세 정보를 확인하실 수 있습니다.
            </InitialText>
          </ContentContainer>

          <ContentContainer>
          <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>
            <Button color="blueblack" onClick={onClick}>book1</Button>
            <Dialog
              title="뭐하고 있나요?"
              confirmText="확인"
              onConfirm={onConfirm}
              onCancel={onCancel}
              visible={dialog}
            >
              제목 : 컴퓨터 비전 수업 듣는 중<br/>
              감정 : 이 수업은 재미가 없습니다<br/>
              후기 : 맨날 딴짓함<br/>
              </Dialog>
            <Button color="bluegray" onClick={onClick1}>book2</Button>
            <Dialog1
              title="리액트 어떤가요?"
              confirmText="확인"
              onConfirm={onConfirm1}
              onCancel={onCancel1}
              visible={dialog1}
            >
              제목 : 진짜 오래걸렸어요<br/>
              감정 : 힘들고 어려워요 <br/>
              후기 : 다 신 안 해<br/>
              </Dialog1>
            <Button color="blueblack" onClick={onClick2}>book3</Button>
            <Dialog2
              title="노래추천 해드릴까요?"
              confirmText="확인"
              onConfirm={onConfirm2}
              onCancel={onCancel2}
              visible={dialog2}
            >
              제목 : 새소년의 난춘<br/>
              감정 : 위로받는 노래에요 <br/>
              후기 : 저의 추억이 담긴 노래, 11월엔 꼭 듣는답니다<br/>
              </Dialog2>
            <Button color="bluegray" onClick={onClick3}>book4</Button>
            <Dialog3
              title="저녁추천 해드릴까요?"
              confirmText="확인"
              onConfirm={onConfirm3}
              onCancel={onCancel3}
              visible={dialog3}
            >
              제목 : 미분당 추천해요<br/>
              감정 : 맛있어요 <br/>
              후기 : 1주일에 1번 이상 먹음, 고구마짜조 시켜드세요<br/>
              </Dialog3>
            <Button color="blueblack" onClick={onClick4}>book5</Button>
            <Dialog4
              title="어디서 만날까요?"
              confirmText="확인"
              onConfirm={onConfirm4}
              onCancel={onCancel4}
              visible={dialog4}
            >
              제목 : 대우관<br/>
              감정 : 좋아요(구라임) <br/>
              후기 : 나만 당할 수 없지<br/>
              </Dialog4>
            </InitialText>
          </ContentContainer>
      </Wrapper>
      </>
    </ThemeProvider>
    );
  }
  
  export default MainPage;