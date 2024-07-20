import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MdOutlineFavorite } from 'react-icons/md';
import { MdOutlineFavoriteBorder } from 'react-icons/md';

const RankingCard = ({ rank }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <CardContainer>
      <ImageContainer>
        <RankContainer>{rank}</RankContainer>
      </ImageContainer>
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
    </CardContainer>
  );
};

RankingCard.propTypes = {
  rank: PropTypes.number.isRequired,
};

export default RankingCard;

const CardContainer = styled.div`
  width: 90px;
  height: 150px;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  width: 90px;
  height: 90px;
  background-color: #ccc;
  border-radius: 7px;
  position: relative;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 3px 0 3px;
`;

const Category = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 12px;
`;

const FavoriteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FavoriteIcon = styled(MdOutlineFavorite)`
  font-size: 12px;
  color: #a0153e;
  margin-bottom: 2px;
`;

const FavoriteBorderIcon = styled(MdOutlineFavoriteBorder)`
  font-size: 12px;
  color: #a0153e;
  margin-bottom: 2px;
`;

const FavoriteCount = styled.h1`
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 12px;
`;

const Name = styled.h1`
  font-family: 'Freesentation-5Medium', sans-serif;
  font-size: 12px;
  padding: 0 3px;
  margin-top: 1px;
`;

const Price = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 12px;
  padding: 0 3px;
  margin-top: 10px;
`;

const InfoText = styled.h1`
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 6px;
  padding: 0 3px;
  margin-top: 1px;
`;

const RankContainer = styled.div`
  width: 20px;
  height: 20px;
  background-color: black;
  color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 10px;
  font-family: 'Freesentation-8ExtraBold', sans-serif;
`;
