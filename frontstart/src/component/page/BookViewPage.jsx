import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Button from '../ui/Button';
import Dialog from '../ui/Dialog';
import Dialog1 from '../ui/Dialog1';
import Dialog2 from '../ui/Dialog2';
import Dialog3 from '../ui/Dialog3';
import Dialog4 from '../ui/Dialog4';



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

const Icon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const ButtonGroup = styled.div`
  & + & {
    font-size: 16px;
    font-weight: 1;
    text-align: left;
    padding: 10px 15px;
    color: black;
    max-width: 50%;
    word-wrap: break-word;
    background-color: lightgrey;
    border-radius: 10px;
    margin-top: 1rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -17px;
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


function BookViewPage(props) {
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
        <Wrapper>
          <Container>
            <MainTitleText>책 추천해 드려유..</MainTitleText>
            
            <ContentContainer>
              <Icon src={process.env.PUBLIC_URL + 'images/robot.png'} />
              <InitialText>아래 책 이미지를 클릭하시면 상세한 정보를 보실 수 있습니다.</InitialText>
            </ContentContainer>
          
              <ButtonGroup>
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
              </ButtonGroup>

          </Container>
        </Wrapper>
      </>
    </ThemeProvider>
  );
}

export default BookViewPage;