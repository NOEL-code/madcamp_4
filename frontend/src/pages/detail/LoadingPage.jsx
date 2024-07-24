import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import CouponHeader from '../../components/CouponHeader';

const LoadingPage = () => {
  const navigate = useNavigate();
  const handleCloseClick = () => {
    navigate('/');
  };

  return (
    <Box>
      <CouponHeader />
      <LogoContainer>
        <Logo>AUCTION</Logo>
        <CloseIcon onClick={handleCloseClick} />
      </LogoContainer>
      <Text>상품명</Text>
      <Progress>낙찰이 진행중입니다</Progress>
    </Box>
  );
};

export default LoadingPage;

const Box = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: black;
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

const Progress = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 24px;
  margin-top: 300px;
  margin-left: 100px;
  color: #fff;
`;
