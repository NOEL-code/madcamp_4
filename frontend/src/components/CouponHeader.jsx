import styled from "styled-components";

const CouponHeader = () => {
  return (
    <Header>
      <HeaderContent>
        <span>앱 설치하고 15% 할인쿠폰 받기</span>
        <Spacer />
        <InstallButton>앱 설치</InstallButton>
      </HeaderContent>
    </Header>
  );
};

export default CouponHeader;

const Header = styled.header`
  background-color: #000;
  color: #fff;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderContent = styled.div`
  text-align: center;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const InstallButton = styled.button`
  background-color: #fff;
  color: #000;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
  border-radius: 15px;
`;
