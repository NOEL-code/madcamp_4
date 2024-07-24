import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';

const BidModal = ({
  isOpen,
  onRequestClose,
  onSubmit,
  currentPrice,
  currentBalance,
}) => {
  const [bidAmount, setBidAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setBidAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericValue = parseInt(bidAmount.replace(/,/g, ''), 10);
    if (!numericValue || isNaN(numericValue) || numericValue <= 0) {
      setErrorMessage('유효한 금액을 입력하세요!');
      return;
    }
    if (numericValue < currentPrice) {
      setErrorMessage(
        `입찰 금액은 현재 가격(${currentPrice.toLocaleString()}원)보다 낮을 수 없습니다!`,
      );
      return;
    }
    if (numericValue > currentBalance) {
      setErrorMessage(
        `계좌 잔액(${currentBalance.toLocaleString()}원) 초과입니다`,
      );
      return;
    }
    onSubmit(numericValue);
    setBidAmount('');
    setErrorMessage('');
    onRequestClose();
  };

  const handleClose = () => {
    setBidAmount('');
    setErrorMessage('');
    onRequestClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseIcon onClick={handleClose} />
        <Title>응찰 금액 입력</Title>
        <form onSubmit={handleSubmit}>
          <Label>
            응찰할 금액을 입력하세요
            <br />
            *응찰 후 수정 및 삭제 불가능합니다
            <Input
              type="text"
              value={bidAmount}
              onChange={handleInputChange}
              placeholder="금액 입력"
            />
          </Label>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Button type="submit">제출</Button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

BidModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  currentPrice: PropTypes.number.isRequired,
  currentBalance: PropTypes.number.isRequired,
};

export default BidModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const Title = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 18px;
  margin-bottom: 5px;
`;

const Label = styled.label`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 14px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  background-color: #a0153e;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
`;

const CloseIcon = styled(IoClose)`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
  color: black;
`;

const ErrorMessage = styled.div`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 14px;
  color: red;
  margin-bottom: 10px;
`;
