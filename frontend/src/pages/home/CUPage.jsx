import CouponHeader from '../../components/CouponHeader';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const CUPage = () => {
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate(-1);
  };
  return (
    <Box>
      <CouponHeader />
      <LogoContainer>
        <Logo>AUCTION</Logo>
        <CloseIcon onClick={handleCloseClick} />
      </LogoContainer>
    </Box>
  );
};

export default CUPage;

const Box = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
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
`;
