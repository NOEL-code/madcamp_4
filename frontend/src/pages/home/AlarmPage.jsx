import { useState } from 'react';
import styled from 'styled-components';
import { PiBell } from 'react-icons/pi';

import CouponHeader from '../../components/CouponHeader';

const AlarmPage = () => {
  const [selectedOption, setSelectedOption] = useState('전체');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <Box>
      <CouponHeader />
      <LogoContainer>
        <Logo>AUCTION</Logo>
        <BellIcon />
      </LogoContainer>
      <Divider />
      <OptionContainer>
        <Option
          selected={selectedOption === '전체'}
          onClick={() => handleOptionClick('전체')}
        >
          전체
        </Option>
        <Option
          selected={selectedOption === '낙찰'}
          onClick={() => handleOptionClick('낙찰')}
        >
          낙찰
        </Option>
        <Option
          selected={selectedOption === '응찰'}
          onClick={() => handleOptionClick('응찰')}
        >
          응찰
        </Option>
      </OptionContainer>
    </Box>
  );
};

export default AlarmPage;

const Box = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
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

const BellIcon = styled(PiBell)`
  font-size: 24px;
  color: #ffde4d;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
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
