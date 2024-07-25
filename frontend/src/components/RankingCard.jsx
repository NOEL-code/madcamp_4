import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLikedProduct,
  removeLikedProduct,
} from '../store/actions/likedProductsActions';

const RankingCard = ({ rank, product, onClick }) => {
  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likedProducts.products);
  const isFavorite = likedProducts.some(
    (likedProduct) => likedProduct._id === product._id,
  );

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeLikedProduct(product));
    } else {
      dispatch(addLikedProduct(product));
    }
  };

  return (
    <CardContainer onClick={onClick}>
      <ImageContainer>
        <RankContainer>{rank}</RankContainer>
        <StyledImage
          src={product.productPhotoUrl[0]}
          alt={product.productName}
        />
        {product.winnerId && <Overlay>낙찰 완료</Overlay>}
      </ImageContainer>
      <TopContainer>
        <Category>{product.category}</Category>
        <FavoriteContainer onClick={toggleFavorite}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          <FavoriteCount>{product.likesCount}</FavoriteCount>
        </FavoriteContainer>
      </TopContainer>
      <Name>{product.productName}</Name>
      <Price>{product.price.toLocaleString()}원</Price>
      <InfoText>실시간 최고 응찰가</InfoText>
    </CardContainer>
  );
};

RankingCard.propTypes = {
  rank: PropTypes.number.isRequired,
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productPhotoUrl: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    likesCount: PropTypes.number.isRequired,
    winnerId: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
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
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  object-position: center;
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
  color: #000;
  margin-left: 3px;
  margin-bottom: 1px;
`;

const Name = styled.h1`
  font-family: 'Freesentation-3Light', sans-serif;
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
  color: #454545;
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

const Overlay = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 12px;
  white-space: nowrap;
`;
