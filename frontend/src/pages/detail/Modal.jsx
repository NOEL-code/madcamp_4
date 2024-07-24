import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <CloseIcon onClick={onClose} />
      <ModalContent>
        <img src={imageSrc} alt="Large view" />
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

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
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const CloseIcon = styled(IoClose)`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 32px;
  cursor: pointer;
  color: white;
`;
