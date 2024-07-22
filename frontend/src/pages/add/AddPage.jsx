import { useState } from 'react';
import styled from 'styled-components';
import CouponHeader from '../../components/CouponHeader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { FaCamera } from 'react-icons/fa';

const AddPage = () => {
  const [startDate, setStartDate] = useState(null);

  return (
    <Box>
      <CouponHeader />
      <LogoContainer>
        <Logo>AUCTION</Logo>
      </LogoContainer>
      <Text>경매 등록하기</Text>
      <Divider />
      <Spacer />
      <Text>사진 업로드</Text>
      <ImageContainer>
        <CameraIcon />
        <CameraCount>0/5</CameraCount>
      </ImageContainer>
      <Text>상품명</Text>
      <NameInput type="text" placeholder="상품명을 입력하세요" />
      <Text>기한</Text>
      <StyledDatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy/MM/dd"
        placeholderText="기한을 선택하세요"
      />
      <Text>시작가</Text>
      <NameInput type="text" placeholder="시작가를 입력하세요" />
      <Text>상세 정보</Text>
      <DetailsTextArea placeholder="상세 정보를 입력하세요" />
    </Box>
  );
};

export default AddPage;

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

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 10px;
`;

const Spacer = styled.div`
  width: 100%;
  height: 10px;
`;

const ImageContainer = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 7px;
  margin: 10px 0 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CameraIcon = styled(FaCamera)`
  font-size: 24px;
  color: #7f8487;
`;

const CameraCount = styled.h1`
  font-size: 10px;
  color: #7f8487;
`;

const NameInput = styled.input`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  width: 90%;
  margin: 10px 20px 20px 20px;
  padding: 10px 15px;
  border: none;
  font-size: 14px;
  background-color: #eeeeee;
  border-radius: 10px;
  outline: none;

  &:focus {
    border: none;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  width: 90%;
  margin: 10px 20px 20px 20px;
  padding: 10px 15px;
  border: none;
  font-size: 14px;
  background-color: #eeeeee;
  border-radius: 10px;
  outline: none;

  &:focus {
    border: none;
  }
`;

const DetailsTextArea = styled.textarea`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  width: 90%;
  min-height: 200px;
  margin: 10px 20px 20px 20px;
  padding: 10px 15px;
  border: none;
  font-size: 14px;
  background-color: #eeeeee;
  border-radius: 10px;
  outline: none;

  &:focus {
    border: none;
  }
`;
