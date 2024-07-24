import { useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../services/user';
import CouponHeader from '../../components/CouponHeader';
import { getLikedProductListByUserId } from '../../services/like';
import { setLikedProducts } from '../../store/actions/likedProductsActions'; // Import the action

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState(null);

  const handleCloseClick = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(userEmail, userPassword);
      const likedProducts = await getLikedProductListByUserId();
      dispatch(setLikedProducts(likedProducts)); // Dispatch the action
      navigate('/'); // 로그인 후 메인 페이지로 이동
    } catch (err) {
      console.log(err);
      setError(err.toString());
    }
  };

  const handleRegisterClick = () => {
    navigate('/register'); // 회원가입 페이지로 이동
  };

  return (
    <Box>
      <CouponHeader />
      <LogoContainer>
        <Logo>AUCTION</Logo>
        <CloseIcon onClick={handleCloseClick} />
      </LogoContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="아이디"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <Button type="submit">로그인</Button>
      </Form>
      <RegisterText onClick={handleRegisterClick}>회원가입</RegisterText>
    </Box>
  );
};

export default LoginPage;

const Box = styled.div`
  position: absolute;
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
  justify-content: space-between;
  padding: 0 20px;
`;

const Logo = styled.h1`
  color: #a0153e;
  font-family: 'Freesentation-9Black', sans-serif;
  font-size: 24px;
`;

const CloseIcon = styled(IoClose)`
  font-size: 24px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 25px 40px;
  margin-top: 200px;
`;

const Input = styled.input`
  padding: 10px 20px;
  margin: 5px 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  font-family: 'Freesentation-6SemiBold', sans-serif;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  border: none;
  background-color: #a0153e;
  color: white;
  font-size: 20px;
  cursor: pointer;
  font-family: 'Freesentation-6SemiBold', sans-serif;
`;

const RegisterText = styled.h1`
  text-align: right;
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 16px;
  padding-right: 40px;
  margin-top: -10px;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
    color: #ff4c4c;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  font-family: 'Freesentation-6SemiBold', sans-serif;
`;
