import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    category: "카테고리",
    name: "제품명",
    price: "20,00000원",
    likes: 12,
  },
  {
    id: 2,
    category: "카테고리",
    name: "제품명",
    price: "20,00000원",
    likes: 12,
  },
  {
    id: 3,
    category: "카테고리",
    name: "제품명",
    price: "20,00000원",
    likes: 12,
  },
  {
    id: 4,
    category: "카테고리",
    name: "제품명",
    price: "20,00000원",
    likes: 12,
  },
  {
    id: 5,
    category: "카테고리",
    name: "제품명",
    price: "20,00000원",
    likes: 12,
  },
  {
    id: 6,
    category: "카테고리",
    name: "제품명",
    price: "20,00000원",
    likes: 12,
  },
];

const RankingList = () => {
  const handlers = useSwipeable({
    onSwipedLeft: () => console.log("Swiped left"),
    onSwipedRight: () => console.log("Swiped right"),
  });

  return (
    <RankingContainer>
      <RankingTitle>실시간 랭킹</RankingTitle>
      <RankingOptions>
        <RankingOption>최다 관심순</RankingOption>
        <RankingOption>높은 응찰가순</RankingOption>
      </RankingOptions>
      <ProductsContainer {...handlers}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </RankingContainer>
  );
};

export default RankingList;

const RankingContainer = styled.div`
  margin: 20px 0;
  margin-bottom: 100px;
`;

const RankingTitle = styled.h2`
  margin-left: 15px;
  font-size: 18px;
  font-weight: bold;
`;

const RankingOptions = styled.div`
  padding-left: 10px;
  display: flex;
  margin-top: 10px;
`;

const RankingOption = styled.button`
  border: 1px solid;
  background-color: #ffffff;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #d9d9d9;
  }
`;

const ProductsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px 0;
  gap: 10px;
`;
