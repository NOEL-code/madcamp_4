import { useState } from 'react';
import styled from 'styled-components';
import CouponHeader from '../../components/CouponHeader';
import ProductCard from '../../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const [selectedOption, setSelectedOption] = useState('나의 관심 상품');
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleProductCardClick = () => {
    navigate('/detail');
  };

  return (
    <Box>
      <CouponHeader />
      <LogoContainer>
        <Logo>AUCTION</Logo>
      </LogoContainer>
      <TopContainer>
        <Text>안지형님, 안녕하세요!</Text>
        <Logout>로그아웃</Logout>
      </TopContainer>
      <Divider />
      <Spacer />
      <Text>나의 잔고</Text>
      <AccountBox>
        <Account>10,000,000,000원</Account>
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
        <ProductCard onClick={handleProductCardClick} />
        <ProductCard onClick={handleProductCardClick} />
        <ProductCard onClick={handleProductCardClick} />
        <ProductCard onClick={handleProductCardClick} />
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
