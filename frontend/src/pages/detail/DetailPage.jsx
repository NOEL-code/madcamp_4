import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import Swal from 'sweetalert2';
import CouponHeader from '../../components/CouponHeader';
import {
  getProductById,
  biddingProduct,
  closeBid,
} from '../../services/product';
import { useSelector } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import withReactContent from 'sweetalert2-react-content';

const DetailPage = () => {
  const [selectedOption, setSelectedOption] = useState('현황');
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams();
  const userInfo = useSelector((state) => state.user.userInfo);
  const SwalWithReact = withReactContent(Swal);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleCloseClick = () => {
    navigate(-1);
  };

  const handleBidClick = async () => {
    try {
      const bidData = { bidAmount: 10000, bidderId: userInfo.id }; // 예시 데이터
      await biddingProduct(productId, bidData);
      SwalWithReact.fire({
        icon: 'success',
        title: '응찰에 성공하였습니다.',
      });
    } catch (error) {
      console.error('Failed to bid:', error);
      SwalWithReact.fire({
        icon: 'error',
        title: '응찰에 실패하였습니다.',
      });
    }
  };

  const handleCloseBidClick = async () => {
    if (!product.bidHistory || product.bidHistory.length === 0) {
      SwalWithReact.fire({
        icon: 'warning',
        title: '입찰 내역이 없어서 낙찰할 수 없습니다.',
      });
      return;
    }
    try {
      await closeBid(productId);
      SwalWithReact.fire({
        icon: 'success',
        title: '낙찰이 완료되었습니다.',
      });
    } catch (error) {
      console.error('Failed to close bid:', error);
      SwalWithReact.fire({
        icon: 'error',
        title: '낙찰에 실패하였습니다.',
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box>
      <CouponHeader />
      <LogoContainer>
        <Logo>AUCTION</Logo>
        <CloseIcon onClick={handleCloseClick} />
      </LogoContainer>
      <Text>{product.productName}</Text>
      <SliderContainer>
        <StyledSlider {...sliderSettings}>
          {product.productPhotoUrl.map((image, index) => (
            <ImageWrapper key={index}>
              <img src={image} alt={`Product ${index + 1}`} />
            </ImageWrapper>
          ))}
        </StyledSlider>
      </SliderContainer>
      <TopContainer>
        <OptionContainer>
          <Option
            selected={selectedOption === '현황'}
            onClick={() => handleOptionClick('현황')}
          >
            현황
          </Option>
          <Option
            selected={selectedOption === '상세 정보'}
            onClick={() => handleOptionClick('상세 정보')}
          >
            상세 정보
          </Option>
        </OptionContainer>
        {userInfo.id === product.userId ? (
          <Option2 onClick={handleCloseBidClick}>낙찰하기</Option2>
        ) : (
          <Option2 onClick={handleBidClick}>응찰하기</Option2>
        )}
      </TopContainer>
      {selectedOption === '상세 정보' && (
        <Description>{product.description}</Description>
      )}
    </Box>
  );
};

export default DetailPage;

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

const Text = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 18px;
  margin-left: 20px;
`;

const SliderContainer = styled.div`
  width: 100%;
  padding-bottom: 30px; /* dots가 항상 보이도록 하단에 공간 추가 */
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    padding: 10px 0; /* 슬라이더 양쪽에 패딩 추가 */
  }
  .slick-slide {
    outline: none; /* 선택되었을 때 주황색 테두리 제거 */
  }
  .slick-dots {
    bottom: -20px; /* dots와 이미지 사이의 간격 줄이기 */
  }
  .slick-dots li {
    margin: 0 2px; /* dots 사이의 간격 줄이기 */
  }
  .slick-dots li button:before {
    font-size: 10px;
  }
  .slick-dots li.slick-active button:before {
    color: #a0153e; /* active dot 색상 변경 */
  }
`;

const ImageWrapper = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: auto;
    max-width: 600px;
    max-height: 600px;
    object-fit: cover;
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Option = styled.h1`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px 10px;
  margin-right: 10px;
  background-color: ${(props) => (props.selected ? '#eeeeee' : 'transparent')};
`;

const Option2 = styled.h1`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 12px;
  border-radius: 15px;
  padding: 5px 10px;
  background-color: #a0153e;
  color: white;
  cursor: pointer;
`;

const Description = styled.div`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #eeeeee;
  border-radius: 10px;
  color: #454545;
`;
