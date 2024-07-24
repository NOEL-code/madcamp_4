import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLikedProduct,
  removeLikedProduct,
} from '../store/actions/likedProductsActions';

const ProductCard = ({ product, onClick }) => {
  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likedProducts.products);
  const isFavorite = likedProducts.some(
    (likedProduct) => likedProduct._id === product._id,
  );

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeLikedProduct(product));
    } else {
      dispatch(addLikedProduct(product));
    }
  };

  return (
    <Product onClick={onClick}>
      <ImageContainer>
        <img src={product.productPhotoUrl[0]} alt={product.productName} />
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
    likesCount: PropTypes.number.isRequired,
    winnerId: PropTypes.string,
  }).isRequired,
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

const FavoriteCount = styled.span`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 14px;
  color: #000;
  margin-left: 5px;
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

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 16px;
`;
