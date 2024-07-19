import PropTypes from "prop-types";
import styled from "styled-components";

const ProductCard = ({ product }) => {
  return (
    <Product>
      <img src="./assets/images/react.svg" />
      <ProductInfo>
        <ProductInfoTextContainer>
          <ProductInfoCategory>{product.category}</ProductInfoCategory>
          <ProductInfoName>{product.name}</ProductInfoName>
        </ProductInfoTextContainer>
        <Likes>❤️ {product.likes}</Likes>
      </ProductInfo>
      <PriceText>{product.price}</PriceText>
      <InfoText>실시간 최고 응찰가</InfoText>
    </Product>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;

const Product = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
`;

const ProductInfo = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between; /* 하트를 오른쪽으로 정렬 */
`;

const ProductInfoCategory = styled.span`
  font-size: 12px;
`;

const ProductInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductInfoName = styled.h1`
  font-size: 10px;
  text-align: left;
`;

const Likes = styled.span`
  text-align: right;
  color: red;
  font-size: 10px;
`;

const PriceText = styled.p`
  font-size: 12px;
`;

const InfoText = styled.p`
  font-size: 6px;
`;
