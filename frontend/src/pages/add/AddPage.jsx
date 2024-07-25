import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CouponHeader from '../../components/CouponHeader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { FaCamera } from 'react-icons/fa';
import { saveProduct } from '../../services/product';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const categories = [
  { value: '의류', label: '의류' },
  { value: '가방', label: '가방' },
  { value: '시계', label: '시계' },
  { value: '주얼리', label: '주얼리' },
  { value: '테크', label: '테크' },
  { value: '가구/리빙', label: '가구/리빙' },
  { value: '미술품', label: '미술품' },
  { value: '푸드', label: '푸드' },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    fontFamily: 'Freesentation-6SemiBold, sans-serif',
    width: '90%',
    margin: '10px 20px 20px 20px',
    padding: '5px',
    backgroundColor: '#eeeeee',
    border: 'none',
    borderRadius: '10px',
    outline: 'none',
    boxShadow: 'none',
  }),
  placeholder: (provided) => ({
    ...provided,
    fontFamily: 'Freesentation-6SemiBold, sans-serif',
    fontSize: '14px',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontFamily: 'Freesentation-6SemiBold, sans-serif',
    fontSize: '14px',
  }),
  menu: (provided) => ({
    ...provided,
    fontFamily: 'Freesentation-6SemiBold, sans-serif',
    fontSize: '14px',
    width: '90%', // 드롭다운 메뉴의 가로 길이
    marginTop: '-10px',
    marginLeft: '20px', // 위치를 위로 올림
    zIndex: 10, // 드롭다운 메뉴가 다른 요소 위에 표시되도록 설정
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999, // 포털을 사용하여 드롭다운 메뉴가 다른 요소 위에 표시되도록 설정
  }),
  option: (provided) => ({
    ...provided,
    fontFamily: 'Freesentation-6SemiBold, sans-serif',
    fontSize: '14px',
  }),
};

const AddPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState(null);
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login'); // 로그인 페이지로 리디렉션
    }
  }, [userInfo, navigate]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length > 4) {
      return;
    }
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    if (!isNaN(value)) {
      setPrice(Number(value).toLocaleString());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price.replace(/,/g, ''));
    formData.append('description', description);
    formData.append('dueDate', startDate);
    formData.append('userId', userInfo.id);
    formData.append('category', category.value);

    for (let i = 0; i < images.length; i++) {
      formData.append('productPhotos', images[i]);
    }

    try {
      await saveProduct(formData);
      Swal.fire({
        icon: 'success',
        title: '상품이 성공적으로 등록되었습니다!',
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title:
          '상품을 업로드하는 도중 오류가 발생하였습니다. 다시 시도해주세요.',
      });
    }
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
      <Text>경매 등록하기</Text>
      <Divider />
      <Spacer />
      <Form onSubmit={handleSubmit}>
        <Text>사진 업로드</Text>
        <ImageUploadContainer>
          <ImageInputContainer>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
              id="fileInput"
            />
            <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
              <CameraIcon />
            </label>
            <CameraCount>{images.length}/4</CameraCount>
          </ImageInputContainer>
          {images.map((image, index) => (
            <ImageWrapper key={index}>
              <img src={URL.createObjectURL(image)} alt={`uploaded ${index}`} />
            </ImageWrapper>
          ))}
        </ImageUploadContainer>
        <Text>상품명</Text>
        <NameInput
          type="text"
          placeholder="상품명을 입력하세요"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Text>카테고리</Text>
        <Select
          value={category}
          onChange={handleCategoryChange}
          options={categories}
          placeholder="카테고리를 선택하세요"
          styles={customStyles} // 커스텀 스타일 적용
        />
        <Text>기한</Text>
        <StyledDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy/MM/dd"
          placeholderText="기한을 선택하세요"
        />
        <Text>시작가</Text>
        <NameInput
          type="text"
          placeholder="시작가를 입력하세요"
          value={price}
          onChange={handlePriceChange}
        />
        <Text>상세 정보</Text>
        <DetailsTextArea
          placeholder="상세 정보를 입력하세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">등록하기</Button>
      </Form>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 10px 20px;
`;

const ImageInputContainer = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px; /* 이미지를 나란히 배치하기 위해 여백 추가 */
`;

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px; /* 이미지를 나란히 배치하기 위해 여백 추가 */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 7px;
  }
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

const Button = styled.button`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  width: 90%;
  margin: 10px 100px 70px 20px;
  padding: 10px 15px;
  border: none;
  font-size: 14px;
  background-color: #a0153e;
  color: white;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #d21d5a;
  }
`;
