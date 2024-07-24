import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CouponHeader from '../../components/CouponHeader';
import ProductCard from '../../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BiSortAlt2 } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa6';
import clothImage from '../../assets/images/cloth.png';
import bagImage from '../../assets/images/bag.png';
import watchImage from '../../assets/images/watch.png';
import jewelryImage from '../../assets/images/jewelry.png';
import techImage from '../../assets/images/tech.png';
import livingImage from '../../assets/images/living.png';
import artImage from '../../assets/images/art.png';
import foodImage from '../../assets/images/food.png';
import { getProducts } from '../../services/product';
import {
  addLikedProduct,
  removeLikedProduct,
} from '../../store/actions/likedProductsActions';

const categories = [
  { name: '의류', image: clothImage },
  { name: '가방', image: bagImage },
  { name: '시계', image: watchImage },
  { name: '주얼리', image: jewelryImage },
  { name: '테크', image: techImage },
  { name: '가구/리빙', image: livingImage },
  { name: '미술품', image: artImage },
  { name: '푸드', image: foodImage },
];

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState(null); // null: no sort, 'asc': ascending, 'desc': descending
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likedProducts.products);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProductCardClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  const handleSortClick = () => {
    if (sortOrder === null || sortOrder === 'desc') {
      setSortOrder('asc');
    } else {
      setSortOrder('desc');
    }
  };

  const handleToggleFavorite = (product) => {
    if (
      likedProducts.some((likedProduct) => likedProduct._id === product._id)
    ) {
      dispatch(removeLikedProduct(product._id));
    } else {
      dispatch(addLikedProduct(product));
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const sortProducts = (products) => {
    if (sortOrder === 'asc') {
      return products.sort((a, b) => b.likesCount - a.likesCount);
    } else if (sortOrder === 'desc') {
      return products.sort((a, b) => a.likesCount - b.likesCount);
    }
    return products;
  };

  const filteredProducts = sortProducts(
    products.filter((product) => {
      const matchesCategory =
        selectedCategory === '카테고리' ||
        product.category === selectedCategory;
      const matchesSearchTerm = product.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    }),
  );

  return (
    <>
      <Container>
        <CouponHeader />
        <main>
          <LogoContainer>
            <Logo>AUCTION</Logo>
          </LogoContainer>
          <SearchInput
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Categories>
            {categories.map((category, index) => (
              <CategoryContainer
                key={index}
                onClick={() => handleOptionClick(category.name)}
              >
                <Category isSelected={selectedOption === category.name}>
                onClick={() => handleCategoryClick(category.name)}
              >
                <Category>
                  <CategoryImage
                    src={category.image}
                    category={category.name}
                  />
                </Category>
                <CategoryText>{category.name}</CategoryText>
              </CategoryContainer>
            ))}
          </Categories>
          <Divider />
          <FilterContainer>
            <CategoryOptionContainer onClick={toggleDropdown}>
              <CategoryOption>{selectedCategory}</CategoryOption>
              {isDropdownOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
              {isDropdownOpen && (
                <DropdownMenu>
                  <DropdownItem onClick={() => handleCategoryClick('카테고리')}>
                    전체보기
                    {selectedCategory === '카테고리' && <CheckIcon />}
                  </DropdownItem>
                  <DropdownDivider />
                  {categories.map((category, index) => (
                    <div key={index}>
                      <DropdownItem
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {category.name}
                        {selectedCategory === category.name && <CheckIcon />}
                      </DropdownItem>
                      {index < categories.length - 1 && <DropdownDivider />}
                    </div>
                  ))}
                </DropdownMenu>
              )}
            </CategoryOptionContainer>
            <SortContainer onClick={handleSortClick}>
              <SortOption>인기순</SortOption>
              <SortIcon />
            </SortContainer>
          </FilterContainer>
          <Products>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onClick={() => handleProductCardClick(product._id)}
                isFavorite={likedProducts.some(
                  (likedProduct) => likedProduct._id === product._id,
                )}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </Products>
        </main>
      </Container>
      <Divider />
      <Footer>Copyright @madcamp</Footer>
    </>
  );
};
export default ShopPage;

const Container = styled.div`
  max-width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
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

const CategoryImage = styled.img`
  width: ${(props) => {
    switch (props.category) {
      case '의류':
        return '100%';
      case '가방':
        return '90%';
      case '테크':
        return '80%';
      case '가구/리빙':
        return '55%';
      case '미술품':
        return '60%';
      case '푸드':
        return '85%';
      case '시계':
        return '80%';
      default:
        return '80%';
    }
  }};
  height: ${(props) => {
    switch (props.category) {
      case '의류':
        return '100%';
      case '가방':
        return '90%';
      case '테크':
        return '80%';
      case '가구/리빙':
        return '70%';
      case '미술품':
        return '80%';
      case '푸드':
        return '85%';
      case '시계':
        return '80%';
      default:
        return '80%';
    }
  }};
  object-fit: cover;
  margin-bottom: ${(props) => {
    switch (props.category) {
      case '의류':
        return '0';
      case '가방':
        return '23px';
      case '테크':
        return '0';
      case '가구/리빙':
        return '0';
      case '미술품':
        return '0';
      case '푸드':
        return '0';
      case '시계':
        return '0';
      default:
        return '0';
    }
  }};
  padding: ${(props) => {
    switch (props.category) {
      case '의류':
        return '5px';
      case '가방':
        return '3px';
      case '테크':
        return '2px';
      case '가구/리빙':
        return '1px';
      case '미술품':
        return '4px';
      case '푸드':
        return '6px';
      case '시계':
        return '2px';
      default:
        return '0';
    }
  }};
`;

const SearchInput = styled.input`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  width: 90%;
  margin: 0 20px;
  padding: 10px 15px;
  border: none;
  font-size: 14px;
  background-color: #eeeeee;
  border-radius: 10px;
  outline: none;

  &:focus {
    border: none; /* Add black border on focus */
  }
`;

const Categories = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  justify-items: center;
  margin: 15px 20px 10px 20px;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Category = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 5px;
  background-color: ${(props) => (props.isSelected ? '#ccc' : '#eeeeee')};
  border: ${(props) => (props.isSelected ? '1px solid #000' : 'none')};
`;

const CategoryText = styled.div`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  margin-top: 2px;
  font-size: 12px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  width: 73px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  padding: 5px 7px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownDivider = styled.div`
  height: 0.5px;
  background-color: #ccc;
`;

const CheckIcon = styled(FaCheck)`
  font-size: 12px;
  color: #373a40;
  margin-left: 5px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 10px;
`;

const CategoryOptionContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const CategoryOption = styled.h1`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 12px;
  margin-right: 5px;
`;

const ArrowDownIcon = styled(IoIosArrowDown)`
  font-size: 12px;
  margin-top: 1px;
  color: #373a40;
`;

const ArrowUpIcon = styled(IoIosArrowUp)`
  font-size: 12px;
  margin-top: 1px;
  color: #373a40;
`;

const SortContainer = styled.div`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 12px;
  display: flex;
  flex-direction: row;
`;

const SortOption = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 12px;
  margin-right: 3px;
`;

const SortIcon = styled(BiSortAlt2)`
  font-size: 14px;
  color: #373a40;
`;

const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 0 20px;
  margin-top: 10px;
  margin-bottom: 80px;
`;

const Footer = styled.h1`
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 10px;
  color: #ccc;
  width: 100%;
  margin: 60px 0;
  text-align: center;
`;
