import { useState, useEffect } from 'react';
import Coin from './Coin';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CouponHeader from '../../components/CouponHeader';

const GamePage = () => {
  const navigate = useNavigate();
  const handleCloseClick = () => {
    navigate(-1);
  };

  const [moles, setMoles] = useState(
    Array.from({ length: 3 * 3 }, () => false),
  );

  const [isGameRunning, setIsGameRunning] = useState(false);

  //두더지 클릭시 점수
  const [score, setScore] = useState(0);
  const moleClickScore = () => {
    setScore(score + 10);
  };

  const [time, setTime] = useState(10);

  useEffect(() => {
    let moleInterval;

    if (isGameRunning) {
      // 게임시작, 랜덤 두더지 나오기
      moleInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * moles.length);
        const newMoles = [...moles];
        newMoles[randomIndex] = true;
        setMoles(newMoles);

        // 0.5초 후에 두더지 다시 숨김
        setTimeout(() => {
          newMoles[randomIndex] = false;
          setMoles(newMoles);
        }, 1000);

        setTime((prevTime) => {
          if (prevTime === 1) {
            alert(`짝짝짝! 점수는 ${score} 입니다.`);
            setIsGameRunning(false);
            setScore(0);
            return 10;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(moleInterval);
    };
  }, [isGameRunning, moles, score]);

  const startGame = () => {
    setIsGameRunning(true);
  };

  const stopGame = () => {
    setIsGameRunning(false);
  };

  return (
    <Box>
      <CouponHeader />
      <LogoContainer>
        <Logo>AUCTION</Logo>
        <CloseIcon onClick={handleCloseClick} />
      </LogoContainer>
      <Text>상품명</Text>
      <Wrap>
        <div className="moleTit">
          <ButtonContainer>
            <Button onClick={startGame} type="button" disabled={isGameRunning}>
              <StartIcon />
              <ButtonText>시작하기</ButtonText>
            </Button>
            <Button onClick={stopGame} type="button" disabled={isGameRunning}>
              <PauseIcon />
              <ButtonText>일시 정지</ButtonText>
            </Button>
          </ButtonContainer>
        </div>
        <MoleList>
          <MoleListOl>
            {moles.map((show, index) => (
              <MoleListLi key={index} onClick={() => show && moleClickScore()}>
                <Coin show={show} />
              </MoleListLi>
            ))}
          </MoleListOl>
        </MoleList>
        <Button2Container>
          <Button2 type="button">SCORE {score}</Button2>
          <Button2 type="button">{time} SECONDS LEFT</Button2>
        </Button2Container>
      </Wrap>
    </Box>
  );
};

export default GamePage;

const Box = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: #000;
`;

const LogoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Logo = styled.h1`
  color: #a0153e;
  font-family: 'Freesentation-9Black', sans-serif;
  font-size: 24px;
`;

const CloseIcon = styled(IoClose)`
  font-size: 24px;
  cursor: pointer;
  color: #fff;
`;

const Text = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 18px;
  margin-left: 20px;
  color: #fff;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button2Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 10px;
`;

const Button = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 3px 5px;
  width: fit-content;
  margin-bottom: 15px;
`;

const Button2 = styled.div`
  cursor: pointer;
  width: fit-content;
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 20px;
  color: #fff;
`;

const StartIcon = styled(FaPlay)`
  font-size: 20px;
  margin-right: 5px;
  color: #fff;
`;

const PauseIcon = styled(FaPause)`
  font-size: 20px;
  margin-right: 10px;
  color: #fff;
`;

const ButtonText = styled.h1`
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 20px;
  color: #fff;
`;

const Wrap = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MoleList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 350px;
  height: 350px;
  border: 4px solid #eee;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const MoleListOl = styled.ol`
  display: contents;
  list-style: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;

const MoleListLi = styled.li`
  width: 114px;
  height: 114px;
  border: 4px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;
