import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MdOutlineFavorite } from 'react-icons/md';
import { MdOutlineFavoriteBorder } from 'react-icons/md';

const ProductCard = ({ onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Product onClick={onClick}>
      <ImageContainer />
      <TopContainer>
        <Category>카테고리</Category>
        <FavoriteContainer onClick={toggleFavorite}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          <FavoriteCount>12</FavoriteCount>
        </FavoriteContainer>
      </TopContainer>
      <Name>상품명</Name>
      <Price>20,00,000원</Price>
      <InfoText>실시간 최고 응찰가</InfoText>
    </Product>
  );
};

ProductCard.propTypes = {
  rank: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
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

const FavoriteCount = styled.h1`
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 14px;
  color: #ccc;
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
  color: #454545;
`;
