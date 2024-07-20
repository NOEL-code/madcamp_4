import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Outlet } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import { RiMenuSearchLine } from 'react-icons/ri';
import { IoMdAddCircle } from 'react-icons/io';
import { BiUserCircle } from 'react-icons/bi';

const NavigationBar = () => {
  const navigate = useNavigate();
  const [activeIcon, setActiveIcon] = useState('/');

  const handleNavigation = (path) => {
    setActiveIcon(path);
    navigate(path);
  };

  return (
    <>
      <main>
        <Outlet />
      </main>
      <NavigationContainer>
        <IconContainer onClick={() => handleNavigation('/')}>
          <HomeIcon active={activeIcon === '/'} />
          <Text active={activeIcon === '/'}>HOME</Text>
        </IconContainer>
        <IconContainer onClick={() => handleNavigation('/shop')}>
          <ShopIcon active={activeIcon === '/shop'} />
          <Text active={activeIcon === '/shop'}>SHOP</Text>
        </IconContainer>
        <IconContainer onClick={() => handleNavigation('/add')}>
          <AddIcon active={activeIcon === '/add'} />
          <Text active={activeIcon === '/add'}>ADD</Text>
        </IconContainer>
        <IconContainer onClick={() => handleNavigation('/my')}>
          <MyIcon active={activeIcon === '/my'} />
          <Text active={activeIcon === '/my'}>MY</Text>
        </IconContainer>
      </NavigationContainer>
    </>
  );
};

export default NavigationBar;

const NavigationContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  border-top: 0.5px solid #ccc;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px;
  background-color: white;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.h1`
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 8px;
  color: #ccc;
  color: ${({ active }) => (active ? '#000' : '#ccc')};
`;

const HomeIcon = styled(IoMdHome)`
  font-size: 28px;
  margin-bottom: 1px;
  color: ${({ active }) => (active ? '#A0153E' : '#000')};
`;

const ShopIcon = styled(RiMenuSearchLine)`
  font-size: 28px;
  margin-bottom: 1px;
  color: ${({ active }) => (active ? '#A0153E' : '#000')};
`;

const AddIcon = styled(IoMdAddCircle)`
  font-size: 28px;
  margin-bottom: 1px;
  color: ${({ active }) => (active ? '#A0153E' : '#000')};
`;

const MyIcon = styled(BiUserCircle)`
  font-size: 28px;
  margin-bottom: 1px;
  color: ${({ active }) => (active ? '#A0153E' : '#000')};
`;
