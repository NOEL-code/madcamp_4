import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import CouponHeader from '../../components/CouponHeader';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleCloseClick = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setPasswordMatch(password === checkPassword);
  }, [password, checkPassword]);

  return (
    <Box>
      <CouponHeader />
      <LogoContainer>
        <Logo>AUCTION</Logo>
        <CloseIcon onClick={handleCloseClick} />
      </LogoContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="id"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
        />
        {checkPassword && (
          <PasswordChecking match={passwordMatch}>
            {passwordMatch
              ? '비밀번호가 일치합니다!'
              : '비밀번호가 일치하지 않습니다!'}
          </PasswordChecking>
        )}
        <Input
          type="nickname"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Button type="submit">회원가입</Button>
      </Form>
    </Box>
  );
};

export default RegisterPage;

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
  margin-top: 150px;
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

const PasswordChecking = styled.div`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 16px;
  margin: 10px 0;
  color: ${(props) => (props.match ? 'green' : 'red')};
  text-align: center;
`;
