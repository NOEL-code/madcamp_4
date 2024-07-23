import styled from 'styled-components';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const CouponHeader = () => {
  const handleInstallClick = () => {
    Swal.fire({
      icon: 'info',
      title: '아직 준비 중입니다.',
    });
  };

  return (
    <Header>
      <Container>
        <LogoImageContainer />
        <Text>앱 설치하고 15% 할인쿠폰 받기</Text>
      </Container>
      <InstallButton onClick={handleInstallClick}>앱 설치</InstallButton>
    </Header>
  );
};

export default CouponHeader;

const Header = styled.header`
  height: 54px;
  background-color: black;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoImageContainer = styled.div`
  width: 30px;
  height: 30px;
  background-color: #ccc;
  border-radius: 5px;
  border: 1px solid white;
  margin-right: 10px;
`;

const Text = styled.h1`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 16px;
`;

const InstallButton = styled.button`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  background-color: white;
  color: black;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
