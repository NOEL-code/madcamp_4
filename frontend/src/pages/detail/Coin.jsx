import PropTypes from 'prop-types';
import coinImage from '../../assets/images/coin.png';
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledCoin = styled.img`
  width: 60px; /* 원하는 너비로 조정 */
  height: 60px; /* 원하는 높이로 조정 */
  display: ${(props) => (props.show ? 'block' : 'none')};
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
  ${(props) =>
    props.show &&
    css`
      animation: ${fadeIn} 0.5s ease-in-out;
    `}
`;

export default function Coin({ show }) {
  return <StyledCoin src={coinImage} alt="mole" show={show} />;
}

Coin.propTypes = {
  show: PropTypes.bool.isRequired,
};
