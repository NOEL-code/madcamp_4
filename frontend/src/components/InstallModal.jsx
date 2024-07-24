import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import PropTypes from 'prop-types';

const InstallModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseIcon onClick={onClose} />
        <ModalTitle>아직 준비 중입니다</ModalTitle>
        <CloseButton onClick={onClose}>확인</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

InstallModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['info', 'warning', 'error', 'success']),
};

export default InstallModal;

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
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

const CloseIcon = styled(IoClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 20px;
  margin-bottom: 20px;
  color: black;
`;

const CloseButton = styled.button`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  background-color: #a0153e;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #d21d5a;
  }
`;
