import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PiBell } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CouponHeader from '../../components/CouponHeader';

const AlarmPage = () => {
  const [selectedOption, setSelectedOption] = useState('전체');
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login'); // 로그인 페이지로 리디렉션
    }
  }, [userInfo, navigate]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  if (!userInfo) {
    return null; // userInfo가 없으면 컴포넌트 렌더링을 중단
  }

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
        {/* <Option
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
        </Option> */}
      </OptionContainer>
      <AlarmList>
        <AlarmItem>
          <AlarmTitle>낙찰 성공</AlarmTitle>
          <AlarmContent>
            고객님이 제시한 금액 50,000원에 <br />[ 모나리자 ] 가
            낙찰되었습니다! 축하드립니다
          </AlarmContent>
        </AlarmItem>
        <ItemDivider />
        <AlarmItem>
          <AlarmTitle>낙찰 실패</AlarmTitle>
          <AlarmContent>
            넘족이님이 제시한 금액 100,000원에 <br />[ 고려청자 ] 가
            낙찰되었습니다.. 아쉽군요!
          </AlarmContent>
        </AlarmItem>
        <ItemDivider />
        <AlarmItem>
          <AlarmTitle>쫄?</AlarmTitle>
          <AlarmContent>
            넘족이님이 [ 샤넬백 ]에 <br />
            고객님이 제시한 금액보다 높은 금액을 제시했습니다!
          </AlarmContent>
        </AlarmItem>
        <ItemDivider />
      </AlarmList>
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

const AlarmList = styled.div`
  padding: 20px;
`;

const AlarmItem = styled.div`
  margin-bottom: 20px;
`;

const AlarmTitle = styled.h2`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 16px;
  color: #a0153e;
`;

const AlarmContent = styled.p`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 14px;
  color: #373a40;
  margin-top: 5px;
`;

const ItemDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
`;
