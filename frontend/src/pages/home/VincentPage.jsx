import CouponHeader from '../../components/CouponHeader';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import Moma from '../../assets/images/moma.png';
import Vincent1 from '../../assets/images/vincent_picture1.jpeg';
import Vincent2 from '../../assets/images/vincent_picture2.jpg';
import StarryNight from '../../assets/images/starry_night.webp';
import Portrait from '../../assets/images/portrait.jpg';

const VincentPage = () => {
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
      <MomaImageContainer>
        <MomaImage src={Moma} />
        <GradientOverlay />
      </MomaImageContainer>
      <Title1>MoMA</Title1>
      <Title2>[ 빈센트 반 고흐 경매전 ]</Title2>
      <Spacer />
      <Info>뉴욕 모마미술관의 첫 경매에 도전해보세요</Info>
      <Info>2024년 8월 3일, 오직 이곳에서만.</Info>
      <Pictures>
        <VincentImage src={Vincent1} />
        <VincentImage src={Vincent2} />
      </Pictures>
      <HighLightBox>
        <HighLightTitle>HIGHLIGHT 1 | 별이 빛나는 밤에</HighLightTitle>
        <HighLightTitle2>The Starry Night</HighLightTitle2>
        <HighLightContainer>
          <VincentImage2 src={StarryNight} />
          <DetailInfoContainer>
            <DetailInfo>1889</DetailInfo>
            <DetailInfo>빈센트 반 고흐</DetailInfo>
          </DetailInfoContainer>
        </HighLightContainer>
      </HighLightBox>
      <HighLightBox>
        <HighLightTitle>HIGHLIGHT 2 | 반 고흐 자화상</HighLightTitle>
        <HighLightTitle2>Autoportrait</HighLightTitle2>
        <HighLightContainer>
          <DetailInfoContainer2>
            <DetailInfo2>1889</DetailInfo2>
            <DetailInfo2>빈센트 반 고흐</DetailInfo2>
          </DetailInfoContainer2>
          <VincentImage2 src={Portrait} />
        </HighLightContainer>
      </HighLightBox>
      <Bottom />
    </Box>
  );
};

export default VincentPage;

const Box = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200vh;
  overflow-x: hidden;
  background-color: #aaa;
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
  background-color: #fff;
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

const MomaImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const MomaImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to bottom, #aaaaaa00 0%, #aaa 100%);
  pointer-events: none;
`;

const Title1 = styled.div`
  position: absolute;
  top: 320px;
  right: 130px;
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 48px;
  color: #fff;
`;

const Title2 = styled.div`
  position: absolute;
  top: 370px;
  right: 125px;
  font-family: 'Freesentation-9Black', sans-serif;
  font-size: 18px;
  color: #535c91;
`;

const Spacer = styled.div`
  width: 100%;
  height: 80px;
`;

const Info = styled.h1`
  text-align: center;
  font-family: 'Freesentation-1Thin', sans-serif;
  font-size: 16px;
  color: white;
`;

const Pictures = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 50px;
`;

const VincentImage = styled.img`
  width: 195px;
  height: auto;
  display: block;
`;

const HighLightBox = styled.div`
  background-color: #ddd;
`;

const HighLightTitle = styled.h1`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 16px;
  color: #535c91;
  margin-left: 20px;
  padding-top: 20px;
`;

const HighLightTitle2 = styled.h1`
  font-family: 'Freesentation-1Thin', sans-serif;
  font-size: 12px;
  color: #535c91;
  margin-left: 20px;
  margin-top: 5px;
`;

const HighLightContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const VincentImage2 = styled.img`
  width: 300px;
  height: auto;
`;

const DetailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 150px 0 0 10px;
`;

const DetailInfoContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  margin: 320px 10px 0 23px;
`;

const DetailInfo = styled.h1`
  font-family: 'Freesentation-1Thin', sans-serif;
  font-size: 12px;
  color: #535c91;
`;

const DetailInfo2 = styled.h1`
  font-family: 'Freesentation-1Thin', sans-serif;
  font-size: 12px;
  color: #535c91;
`;

const Bottom = styled.div`
  width: 100%;
  height: 50px;
  background-color: #535c91;
`;
