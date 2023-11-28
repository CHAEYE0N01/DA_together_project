import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import SimpleButton from '../ui/SimpleButton';
import TextInput from '../ui/TextInput';
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import Button from '../ui/Button';
import Dialog from '../ui/Dialog';

// 전체적인 레이아웃을 담당하는 코드
const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 50px);
    display: flex;
    background-color: #dedce8;
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
  line-height: 180%;
  padding: 10px 15px;
  color: white;
  max-width: 50%;
  word-wrap: break-word;
  background-color: #211C39;
  border-radius: 10px;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 70%;
  margin-right: 10px;
`;


const Banner = styled.img`
  width: 350px;
  align-items: center;
  margin: auto;
  display: block;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -17px;
`;

const Container = styled.div`
    width: 100%;
    max-width: 800px;
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
    const [emotionData, setEmotionData] = useState(null); 
    const [imageList, setImageList] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [emotionValue, setEmotionValue] = useState(null);
    const [selectedImageData, setSelectedImageData] = useState(null);
  
    const handleChange = (event) => {
      setTextValue(event.target.value);
    };
  
    const handleButtonClick = async () => {
      try {
        const response = await axios.post('http://localhost:5000/user_input', { user_input: textValue });
        setEmotionData(response.data); // 서버 응답으로 받은 데이터를 상태에 설정
        setEmotionValue(response.data.emotion)
        // 만약 서버 응답으로부터 topic_images_list를 받는다면,
        if (response.data && response.data.topic_images_list) {
          setImageList(response.data.topic_images_list); // 이미지 URL 목록 상태에 설정
        }
      } catch (error) {
        console.error('Error sending data to server:', error);
      }
    };

    const handleImageClick = (index) => {
      setSelectedImageData({ index: index }); // 클릭한 이미지의 인덱스를 상태에 저장
    };
    
    const GenreButtonClick = async (genre) => {
      try {
        if (!selectedImageData) {
          // 선택된 이미지가 없을 때 처리 (예: 사용자가 아무 이미지도 클릭하지 않음)
          console.log('이미지를 선택해주세요.');
          return;
        }
    
        const index = selectedImageData.index; // 이미지의 인덱스
        const selectedGenre = genre; // 선택된 장르 값
    
        // 이전에 클릭한 이미지의 인덱스와 선택된 장르 값을 포함하여 서버로 전송
        const response = await axios.post('http://localhost:5000/get_info', { emotion: emotionValue, index: index, genre: selectedGenre });
        setBookData(response.data);
        // 나머지 코드는 그대로 유지
      } catch (error) {
        console.error('Error sending data to server:', error);
      }
    };

    const [dialogs, setDialogs] = useState([]);

    // 도서 데이터가 변경될 때, 해당하는 개수만큼 다이얼로그 상태 초기화
    useEffect(() => {
      setDialogs(new Array(bookData.length).fill(false));
    }, [bookData]);

    // 다이얼로그를 열기 위한 함수
    const openDialog = (index) => {
      const updatedDialogs = [...dialogs];
      updatedDialogs[index] = true;
      setDialogs(updatedDialogs);
    };

    // 다이얼로그를 닫기 위한 함수
    const closeDialog = (index) => {
      const updatedDialogs = [...dialogs];
      updatedDialogs[index] = false;
      setDialogs(updatedDialogs);
    };

  
    return (
    <ThemeProvider
      theme={{
        palette: {
          blue: '#228be6',
          gray: '#495057',
          pink: '#f06595',
          blueblack: '#211C39',
          bluegray: '#424563',
          lavendergray: '#dedce8'
        }
      }}
    >
    <>
    <GlobalStyle/>
      <Wrapper>
      <Banner src={process.env.PUBLIC_URL + 'images/chackbot2.png'}  />

        <Container>

          <ContentContainer>
            <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>당신을 도와줄 책봇입니다- --🤖</InitialText>
          </ContentContainer>
          
          <ContentContainer>
            <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>당신의 기분은 어떤가요? 제가 들어드릴게요 🙌 </InitialText>
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
          {emotionData && emotionData.message} {/* 서버 응답의 메시지 표시 */}
          </InitialText>
          </ContentContainer>

        <ContentContainer>
          <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
          <InitialText>
              먼저 그런 감정을 느낄 때 읽어보면 좋은 책의 주제를 추천드릴게요🤖 <br></br> 어떤 주제의 책을 읽고 싶은지 골라주세요- --!
          </InitialText>
        </ContentContainer>

        <ContentContainer>
          <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
          <InitialText>
            {imageList.length > 0 && (
              <div>
                <ul style={{ listStyleType: 'none', textAlign: 'center' }}>
                  {imageList.map((encodedImage, index) => (
                    <li key={index} onClick={() => handleImageClick(index)}> {/* 이미지 클릭 이벤트 핸들러 */}
                      <img
                        src={`data:image/png;base64,${encodedImage}`}
                        alt={`Image ${index}`}
                        style={{ width: '400px', height: '200px' }}
                      />
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
              좋은 선택이네요. ..🤔 <br></br> 마지막으로, 원하는 책의 장르를 골라주시면 당신에게 가장 도움이 되는 책을 추천드릴게요- --!
          </InitialText>
          </ContentContainer>


          <ContentContainer>
            <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>
              <SimpleButton color="white" title="소설📜" onClick={() => GenreButtonClick('소설')} />
              <SimpleButton color="white" title="시/에세이🖋️" onClick={() => GenreButtonClick('시/에세이')} />
              <SimpleButton color="white" title="자기계발💪" onClick={() => GenreButtonClick('자기계발')} />
              <SimpleButton color="white" title="인문📓" onClick={() => GenreButtonClick('인문')} />
            </InitialText>
          </ContentContainer>

          <ContentContainer>
            <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>
              어떤 책인지 궁금하시죠? <br></br> 아래 책 사진을 클릭하면, 책의 상세 정보를 확인할 수 있어요 📖
            </InitialText>
          </ContentContainer>


          {bookData.map((book, index) => (
          <ContentContainer key={index}>
            <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
            <InitialText>
              <Button onClick={() => openDialog(index)}>
                <img src={`data:image/png;base64,${book.book_img}`} alt={`Book ${index}`} />
              </Button>
              <Dialog
                title={book.book_name}
                confirmText="확인"
                onConfirm={() => closeDialog(index)}
                onCancel={() => closeDialog(index)}
                visible={dialogs[index]}>
                <p>책 소개: {book.book_explain}</p>
                <p>저자: {book.author}</p>
                <p>출판사: {book.publisher}</p>
                <p>평점: {book.rate}</p>
                <p>가격: {book.price}</p>
                {/* 기타 책 정보들 */}
              </Dialog>
            </InitialText>
          </ContentContainer>
        ))}
      </Wrapper>
      </>
    </ThemeProvider>
    );
  }
  
  export default MainPage;