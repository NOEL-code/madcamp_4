import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { likeProduct, cancelLikeProduct } from '../services/like';

const ProductCard = ({ product, onClick, isFavorite, onToggleFavorite }) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  const toggleFavorite = async (e) => {
    e.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파되지 않도록 합니다.
    try {
      if (!isFavoriteState) {
        await likeProduct(product._id);
      } else {
        await cancelLikeProduct(product._id);
      }
      setIsFavoriteState(!isFavoriteState);
      onToggleFavorite(); // MyPage 컴포넌트에 좋아요 상태 변경 알림
    } catch (error) {
      console.error('Failed to update favorite status:', error);
    }
  };

  return (
    <Product onClick={onClick}>
      <ImageContainer>
        <img src={product.productPhotoUrl[0]} alt={product.productName} />
      </ImageContainer>
      <TopContainer>
        <Category>{product.category}</Category>
        <FavoriteContainer onClick={toggleFavorite}>
          {isFavoriteState ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </FavoriteContainer>
      </TopContainer>
      <Name>{product.productName}</Name>
      <Price>{product.price.toLocaleString()}원</Price>
      <InfoText>실시간 최고 응찰가</InfoText>
    </Product>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productPhotoUrl: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default ProductCard;

const Product = styled.div`
  width: 170px;
  height: 260px;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  width: 170px;
  height: 170px;
  background-color: #ccc;
  border-radius: 7px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 5px 0 5px;
`;

const Category = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 16px;
`;

const FavoriteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FavoriteIcon = styled(MdOutlineFavorite)`
  font-size: 14px;
  color: #a0153e;
`;

const FavoriteBorderIcon = styled(MdOutlineFavoriteBorder)`
  font-size: 14px;
  color: #a0153e;
`;

const Name = styled.h1`
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 14px;
  padding: 0 5px;
  margin-top: 1px;
`;

const Price = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 16px;
  padding: 0 5px;
  margin-top: 15px;
`;

const InfoText = styled.h1`
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 9px;
  padding: 0 5px;
  margin-top: 1px;
  margin-left: 3px;
  color: #454545;
`;
