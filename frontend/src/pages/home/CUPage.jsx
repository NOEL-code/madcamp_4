import CouponHeader from '../../components/CouponHeader';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import CULogo from '../../assets/images/cu_logo.png';
import Dubai from '../../assets/images/chocolate.png';
import HoneyButter from '../../assets/images/honeybutter.png';

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
      <CULogoImage src={CULogo} />
      <PopularText>인기 급상승!</PopularText>
      <DubaiImage src={Dubai} />
      <DubaiText>품절대란템</DubaiText>
      <DubaiText2>현지의 맛 그대로! 두바이 초콜릿</DubaiText2>
      <HoneyButterImage src={HoneyButter} />
      <HoneyButterText>품절대란의 원조</HoneyButterText>
      <HoneyButterText2>영원한 근본, 허니버터칩</HoneyButterText2>
    </Box>
  );
};

export default CUPage;

const Box = styled.div`
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 180vh;
  overflow-x: hidden;
  background-color: #9bcf53;
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
  background-color: white;
`;

const Logo = styled.h1`
  color: #a0153e;
  font-family: 'HSSummer', sans-serif;
  font-size: 24px;
  margin-top: 15px;
`;

const CloseIcon = styled(IoClose)`
  font-size: 24px;
  cursor: pointer;
`;

const CULogoImage = styled.img`
  margin-top: 30px;
`;

const PopularText = styled.h1`
  font-family: 'Freesentation-9Black', sans-serif;
  font-size: 32px;
  text-align: center;
  color: white;
  margin-top: -20px;
`;

const DubaiImage = styled.img`
  position: absolute;
  width: 300px;
  top: 400px;
  left: -10px;
  filter: drop-shadow(10px 10px 15px rgba(0, 0, 0, 0.3));
`;

const DubaiText = styled.h1`
  position: absolute;
  font-family: 'Freesentation-9Black', sans-serif;
  font-size: 24px;
  top: 630px;
  right: 40px;
  color: #4f1787;
`;

const DubaiText2 = styled.h1`
  position: absolute;
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 18px;
  top: 660px;
  right: 40px;
  color: #4f1787;
`;

const HoneyButterImage = styled.img`
  position: absolute;
  width: 500px;
  top: 720px;
  left: -10px;
  filter: drop-shadow(10px 10px 15px rgba(0, 0, 0, 0.3));
`;

const HoneyButterText = styled.h1`
  position: absolute;
  font-family: 'Freesentation-9Black', sans-serif;
  font-size: 24px;
  top: 1070px;
  left: 40px;
  color: #4f1787;
`;

const HoneyButterText2 = styled.h1`
  position: absolute;
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 18px;
  top: 1100px;
  left: 40px;
  color: #4f1787;
`;
