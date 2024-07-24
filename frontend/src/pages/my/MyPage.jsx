import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CouponHeader from '../../components/CouponHeader';
import ProductCard from '../../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { getAccountBalance } from '../../services/user';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSuccessBidUserProducts,
  getUserProducts,
} from '../../services/product';
import { getLikedProductListByUserId } from '../../services/like';
import { logout } from '../../services/user';
import { logoutSuccess } from '../../store/actions/userActions';
import { useDispatch } from 'react-redux'; // useDispatch 임포트

import {
  addLikedProduct,
  removeLikedProduct,
} from '../../store/actions/likedProductsActions';


const MyPage = () => {
  const [selectedOption, setSelectedOption] = useState('나의 관심 상품');
  const [balance, setBalance] = useState(0);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const likedProducts = useSelector((state) => state.likedProducts.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchLikedProductList = useCallback(async () => {
    if (!userInfo) return;
    try {
      const likedProductLists = await getLikedProductListByUserId(userInfo.id);
      const likedProductId = likedProductLists.map((product) =>
        product._id.toString(),
      );
      setLikedProductIds(likedProductId);
      console.log(likedProductId);
    } catch (err) {
      console.error('Failed to fetch likedProductList', err);
    }
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchBalance = async () => {
      try {
        const userBalance = await getAccountBalance(userInfo.id);
        setBalance(userBalance);
      } catch (error) {
        console.error('Failed to fetch account balance:', error);
      }
    };

    fetchBalance();
    fetchLikedProductList();
  }, [userInfo, navigate, fetchLikedProductList]);


  useEffect(() => {
    if (userInfo) {
      fetchProducts('나의 관심 상품');
    }
  }, [userInfo]);

  const handleLogoutClick = async () => {
    try {
      await logout(); // 로그아웃 함수 호출
      dispatch(logoutSuccess()); // 로그아웃 액션 디스패치
      navigate('/login'); // 로그아웃 후 로그인 페이지로 리디렉션
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const fetchProducts = async (option) => {
    if (!userInfo) return;
    try {
      let products;
      switch (option) {
        case '판매내역':
          products = await getUserProducts(userInfo.id);
          break;
        case '구매내역':
          products = await getSuccessBidUserProducts(userInfo.id);
          break;
        case '나의 관심 상품':
        default:
          products = likedProducts;
          break;
      }
      setProducts(uniqueProducts(products));
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleOptionClick = (option) => {
    setProducts([]);
    setSelectedOption(option);
    fetchProducts(option);
  };

  const handleProductCardClick = (productId) => {
    navigate(`/detail/${productId}`);
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

  // 중복된 상품 제거를 위한 유틸리티 함수
  const uniqueProducts = (products) => {
    const seen = new Set();
    return products.filter((product) => {
      const duplicate = seen.has(product._id.toString());
      seen.add(product._id.toString());
      return !duplicate;
    });
  };

  if (!userInfo) {
    return null; // userInfo가 없으면 컴포넌트 렌더링을 중단
  }

  return (
    <Box>
      <CouponHeader />
      <LogoContainer>
        <Logo>AUCTION</Logo>
      </LogoContainer>
      <TopContainer>
        <Text>{userInfo?.name}님, 안녕하세요!</Text>
        <Logout onClick={handleLogoutClick}>로그아웃</Logout>
      </TopContainer>
      <Divider />
      <Spacer />
      <Text>나의 잔고</Text>
      <AccountBox>
        <Account>{balance.toLocaleString()}원</Account>
      </AccountBox>
      <Divider />
      <OptionContainer>
        <Option
          selected={selectedOption === '나의 관심 상품'}
          onClick={() => handleOptionClick('나의 관심 상품')}
        >
          나의 관심 상품
        </Option>
        <Option
          selected={selectedOption === '판매내역'}
          onClick={() => handleOptionClick('판매내역')}
        >
          판매내역
        </Option>
        <Option
          selected={selectedOption === '구매내역'}
          onClick={() => handleOptionClick('구매내역')}
        >
          구매내역
        </Option>
      </OptionContainer>
      <Products>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onClick={() => handleProductCardClick(product._id)}
            isFavorite={likedProducts.some(
              (likedProduct) => likedProduct._id === product._id,
            )}
            onToggleFavorite={() => handleToggleFavorite(product)}
          />
        ))}
      </Products>
    </Box>
  );
};

export default MyPage;

const Box = styled.div`
  position: relative;
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
  padding: 10px 20px 0 20px;
`;

const Logo = styled.h1`
  color: #a0153e;
  font-family: 'Freesentation-9Black', sans-serif;
  font-size: 24px;
`;

const Text = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 18px;
  margin-left: 20px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Logout = styled.h1`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px 10px;
  margin-right: 20px;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
`;

const Spacer = styled.div`
  width: 100%;
  height: 10px;
`;

const AccountBox = styled.div`
  width: 90%;
  height: 50px;
  margin: 10px 20px 15px 20px;
  background-color: #eeeeee;
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
`;

const Account = styled.h1`
  font-family: 'Freesentation-9Black', sans-serif;
  font-size: 20px;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 20px;
  margin-top: 10px;
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

const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 0 20px;
  margin-top: 10px;
  margin-bottom: 80px;
`;
