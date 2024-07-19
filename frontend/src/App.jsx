import styled from "styled-components";
import CouponHeader from "./components/CouponHeader";
import ProductCard from "./components/ProductCard";
import Ranking from "./components/RankingList";

const categories = [
  "의류",
  "가방",
  "시계",
  "주얼리",
  "테크",
  "가구/리빙",
  "미술품",
  "푸드",
];

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
];

const HomePage = () => {
  return (
    <>
      <Container>
        <CouponHeader />
        <main>
          <Title>AUCTION</Title>
          <SearchContainer>
            <SearchInput type="text" placeholder="검색" />
          </SearchContainer>
          <Categories>
            {categories.map((category, index) => (
              <CategoryContainer key={index}>
                <Category>
                  <img src="./assets/images/react.svg" alt={category} />
                </Category>
                <CategoryText>{category}</CategoryText>
              </CategoryContainer>
            ))}
          </Categories>
          <Divider />
          <FilterContainer>
            <FilterSelect>
              <option>카테고리</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </FilterSelect>
            <Sort>인기순</Sort>
          </FilterContainer>
          <Products>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Products>
          <Ranking />
        </main>
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.div`
  max-width: 100%;
  margin: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #a0153e;
  text-align: start;
  margin-left: 24px;
`;

const SearchContainer = styled.div`
  margin-left: 25px;
`;

const SearchInput = styled.input`
  width: 85%;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #d9d9d9;
  border-radius: 5px;
`;

const Categories = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  justify-items: center;
  margin: 10px;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Category = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 5px;
`;

const CategoryText = styled.div`
  margin-top: 5px;
  font-size: 12px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 10px;
`;

const FilterSelect = styled.select`
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
`;

const Sort = styled.span`
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
`;

const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 0 10px;
  margin-top: 20px;
`;
