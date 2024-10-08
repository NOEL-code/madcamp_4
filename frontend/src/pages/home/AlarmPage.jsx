import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PiBell } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CouponHeader from '../../components/CouponHeader';
import { getAlarms } from '../../services/alarm'; // 알람 가져오기 함수 import

const AlarmPage = () => {
  const [selectedOption, setSelectedOption] = useState('전체');
  const [alarms, setAlarms] = useState([]); // 알람 상태 추가
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  console.log(userInfo);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login'); // 로그인 페이지로 리디렉션
    } else {
      fetchAlarms(userInfo.id); // 사용자 정보가 있을 때 알람 가져오기
    }
  }, [userInfo, navigate]);

  const fetchAlarms = async (userId) => {
    try {
      const fetchedAlarms = await getAlarms(userId);
      // 최신순으로 정렬
      const sortedAlarms = fetchedAlarms.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      console.log(sortedAlarms);
      setAlarms(sortedAlarms);
    } catch (error) {
      console.error('Error fetching alarms:', error);
    }
  };

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
      <AlarmList>
        {alarms.map((alarm) => (
          <AlarmItem key={alarm._id}>
            <AlarmTitle>{alarm.title}</AlarmTitle>
            <AlarmContent>{alarm.content}</AlarmContent>
            <ItemDivider />
          </AlarmItem>
        ))}
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
  font-family: 'HSSummer', sans-serif;
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
