import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import CouponHeader from '../../components/CouponHeader';
import { FaCrown } from 'react-icons/fa';
import {
  getProductById,
  biddingProduct,
  deleteProductById,
  closeBid,
  updateProductGameActive, // 서버에서 gameActive 상태를 업데이트하는 함수
} from '../../services/product';
import { useSelector } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from './Modal';
import BidModal from './BidModal';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

const DetailPage = () => {
  const [selectedOption, setSelectedOption] = useState('현황');
  const [product, setProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { productId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(productId);
        setProduct(productData);

        // 동점자 또는 판매자가 접속했을 때 바로 game 페이지로 리디렉션
        const highestBids = productData.bidHistory.filter(
          (bid) => bid.bidAmount === productData.bidHistory[0].bidAmount,
        );
        const tiedBidders = highestBids.map((bid) => bid.bidderId);

        if (
          productData.isClose == 2 &&
          (tiedBidders.includes(userInfo.id) ||
            productData.userId === userInfo.id)
        ) {
          navigate('/game', {
            state: {
              productId: productData._id,
              sellerId: productData.userId,
              tiedBidders,
            },
          });
        } else if (productData.isClose == 2) {
          navigate('/loading', {
            state: {
              productId: productData._id,
            },
          });
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [productId, refresh, navigate, userInfo]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleCloseClick = () => {
    navigate(-1);
  };

  const handleImageClick = (imageSrc) => {
    setModalImageSrc(imageSrc);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleBidModalClose = () => {
    setIsBidModalOpen(false);
  };

  const handleBidClick = async () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    setIsBidModalOpen(true);
  };

  const handleBidSubmit = async (bidAmount) => {
    if (!bidAmount) return;

    try {
      const bidData = { bidAmount, bidderId: userInfo.id };
      await biddingProduct(productId, bidData);
      setIsBidModalOpen(false);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Failed to bid:', error);
    }
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleCloseBidClick = async () => {
    if (!userInfo) {
      navigate('/login'); // 로그인 페이지로 리디렉션
      return;
    }

    if (!product.bidHistory || product.bidHistory.length === 0) {
      return;
    }

    const highestBids = product.bidHistory.filter(
      (bid) => bid.bidAmount === product.bidHistory[0].bidAmount,
    );

    if (highestBids.length > 1) {
      const tiedBidders = highestBids.map((bid) => bid.bidderId);
      try {
        await updateProductGameActive(product._id); // 서버에서 gameActive 상태 업데이트
        if (
          tiedBidders.includes(userInfo.id) ||
          product.userId === userInfo.id
        ) {
          navigate('/game', {
            state: {
              productId: product._id,
              sellerId: product.userId,
              tiedBidders,
            },
          });
        } else {
          navigate('/loading');
        }
      } catch (error) {
        console.error('Failed to update game active state:', error);
      }
    } else {
      try {
        await closeBid(productId);
        setProduct((prevProduct) => ({
          ...prevProduct,
          winnerId: highestBids[0].bidderId,
        }));
        setRefresh(!refresh);
      } catch (error) {
        console.error('Failed to close bid:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  const formatPrice = (price) => {
    return `${formatNumberWithCommas(price)}원`;
  };

  const handleDeleteClick = async () => {
    try {
      await deleteProductById(product._id);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete product:', error);
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
      <TextContainer>
        <Text>{product.productName}</Text>
        {product.userId === userInfo?.id ? (
          <IconContainer>
            <EditIcon />
            <DeleteIcon onClick={handleDeleteClick} />
          </IconContainer>
        ) : (
          <></>
        )}
      </TextContainer>
      <SliderContainer>
        <StyledSlider {...sliderSettings}>
          {product.productPhotoUrl.map((image, index) => (
            <ImageWrapper key={index}>
              <img
                src={image}
                alt={`Product ${index + 1}`}
                onClick={() => handleImageClick(image)}
              />
            </ImageWrapper>
          ))}
        </StyledSlider>
      </SliderContainer>
      {product.winnerId === undefined ? (
        <>
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
            {product.userId === userInfo?.id ? (
              <Option2 onClick={handleCloseBidClick}>낙찰하기</Option2>
            ) : (
              <Option2 onClick={handleBidClick}>응찰하기</Option2>
            )}
          </TopContainer>
          {selectedOption === '상세 정보' && (
            <DetailBox>
              <DetailContainer>
                <DetailOption>카테고리</DetailOption>
                <DetailText>{product.category}</DetailText>
              </DetailContainer>
              <DetailContainer>
                <DetailOption>마감기한</DetailOption>
                <DetailText>{formatDate(product.dueDate)}</DetailText>
              </DetailContainer>
              <DetailContainer>
                <DetailOption>현재 최고가</DetailOption>
                <DetailText>{formatPrice(product.price)}</DetailText>
              </DetailContainer>
              <DetailContainer>
                <DetailOption>상세 정보</DetailOption>
              </DetailContainer>
              <DetailText>{product.description}</DetailText>
            </DetailBox>
          )}
          {selectedOption === '현황' && (
            <HistoryBox>
              {product.bidHistory
                .sort((a, b) => b.bidAmount - a.bidAmount)
                .map((bid, index, array) => (
                  <BidContainer
                    key={bid._id}
                    isHighest={bid.bidAmount === array[0].bidAmount}
                  >
                    <BidderInfo>
                      <BidderName>{bid.bidderName}</BidderName>
                      {bid.bidAmount === array[0].bidAmount && (
                        <FaCrown
                          style={{
                            marginLeft: '5px',
                            marginBottom: '7px',
                          }}
                        />
                      )}
                    </BidderInfo>
                    <BidAmount>
                      {formatNumberWithCommas(bid.bidAmount)}원
                    </BidAmount>
                  </BidContainer>
                ))}
            </HistoryBox>
          )}
        </>
      ) : (
        <>
          <Text2>낙찰완료!</Text2>
          <FinishedInfo>
            {formatPrice(product.price)}에 낙찰이 완료되었습니다
          </FinishedInfo>
        </>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        imageSrc={modalImageSrc}
      />
      <BidModal
        isOpen={isBidModalOpen}
        onRequestClose={handleBidModalClose}
        onSubmit={handleBidSubmit}
        currentPrice={product.price}
        currentBalance={userInfo.balance}
      />
    </Box>
  );
};

export default DetailPage;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
`;

const EditIcon = styled(MdEdit)`
  font-size: 24px;
  margin-right: 20px;
  color: #aaa;
`;

const DeleteIcon = styled(MdDelete)`
  font-size: 24px;
  color: #aaa;
`;

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

const Text2 = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 18px;
  margin-left: 20px;
  margin-top: 10px;
`;

const SliderContainer = styled.div`
  width: 100%;
  padding-bottom: 30px;
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
  :focus {
    outline: none; /* 추가된 부분 */
    border: none; /* 추가된 부분 */
  }
  :active {
    outline: none; /* 추가된 부분 */
    border: none; /* 추가된 부분 */
  }
`;

const ImageWrapper = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
  img {
    width: 390px;
    height: 390px;
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

const DetailBox = styled.div`
  padding: 15px 20px;
  margin: 10px 20px;
  background-color: #eeeeee;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DetailOption = styled.div`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 16px;
`;

const DetailText = styled.h1`
  font-family: 'Freesentation-1Thin', sans-serif;
  font-size: 16px;
`;

const HistoryBox = styled.div`
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
`;

const BidContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${({ isHighest }) => (isHighest ? '#ddd' : '#eeeeee')};
`;

const BidderInfo = styled.div`
  display: flex;
  align-items: center;
`;

const BidderName = styled.div`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 16px;
  margin-bottom: 5px;
`;

const BidAmount = styled.div`
  font-family: 'Freesentation-1Thin', sans-serif;
  font-size: 16px;
`;

const FinishedInfo = styled.h1`
  font-family: 'Freesentation-1Thin', sans-serif;
  font-size: 16px;
  margin: 10px 0 0 20px;
`;
