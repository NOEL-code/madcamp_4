import { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PiBell } from 'react-icons/pi';
import { FaRankingStar } from 'react-icons/fa6';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useDispatch, useSelector } from 'react-redux';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CouponHeader from '../../components/CouponHeader';
import RankingCard from '../../components/RankingCard';
import Rolex from '../../assets/models/Rolex';
import Vincent from '../../assets/images/vincent.png';
import CU from '../../assets/images/cu.png';
import { getProducts } from '../../services/product';
import {
  addLikedProduct,
  removeLikedProduct,
} from '../../store/actions/likedProductsActions';

function RolexScene() {
  const { gl } = useThree();

  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault();
      console.log('WebGL context lost. Attempting to restore...');
      // handle context lost, e.g., show a message to the user
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored.');
      // handle context restored, e.g., reinitialize your scene or objects
    };

    gl.domElement.addEventListener('webglcontextlost', handleContextLost);
    gl.domElement.addEventListener(
      'webglcontextrestored',
      handleContextRestored,
    );

    return () => {
      gl.domElement.removeEventListener('webglcontextlost', handleContextLost);
      gl.domElement.removeEventListener(
        'webglcontextrestored',
        handleContextRestored,
      );
    };
  }, [gl]);

  return (
    <Suspense fallback={null}>
      <group position={[0.3, -1.8, 0]} scale={[40, 40, 40]}>
        <Rolex />
      </group>
    </Suspense>
  );
}

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState('최다 관심순');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likedProducts.products);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleBellClick = () => {
    navigate('/alarm');
  };

  const handleRankingCardClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  const handleToggleFavorite = (product) => {
    if (
      likedProducts.some((likedProduct) => likedProduct._id === product._id)
    ) {
      dispatch(removeLikedProduct(product._id));
    } else {
      dispatch(addLikedProduct(product));
    }
  };

  const handleVincentClick = () => {
    navigate('/vincent');
  };

  const handleCUClick = () => {
    navigate('/cu');
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const fetchProducts = async () => {
    const productList = await getProducts();
    setProducts(productList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [likedProducts]);

  useEffect(() => {
    const sortProducts = () => {
      let sorted;
      if (selectedOption === '최다 관심순') {
        sorted = [...products].sort((a, b) => b.likes - a.likes);
      } else if (selectedOption === '높은 응찰가순') {
        sorted = [...products].sort((a, b) => b.price - a.price);
      }
      setSortedProducts(sorted);
    };

    sortProducts();
  }, [selectedOption, products]);

  return (
    <Box>
      <CouponHeader />
      <LogoContainer>
        <Logo>AUCTION</Logo>
        <BellIcon onClick={handleBellClick} />
      </LogoContainer>
      <MiddleContainer>
        <Slider {...settings}>
          <SliderItem>
            <Canvas
              style={{ background: '#000' }}
              gl={{ alpha: true }}
              camera={{ position: [0, 0, 5], fov: 50 }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={5.0} />
              <directionalLight position={[-5, -5, -5]} intensity={5.0} />
              <RolexScene />
              <OrbitControls autoRotate autoRotateSpeed={1} />
            </Canvas>
          </SliderItem>
          <SliderItem onClick={handleVincentClick}>
            <Image src={Vincent} />
          </SliderItem>
          <SliderItem onClick={handleCUClick}>
            <Image src={CU} alt="Main 2" />
          </SliderItem>
        </Slider>
      </MiddleContainer>
      <RankingContainer>
        <RankingTextContainer>
          <Text>실시간 랭킹</Text>
          <RankingIcon />
        </RankingTextContainer>
        <OptionContainer>
          <Option
            selected={selectedOption === '최다 관심순'}
            onClick={() => handleOptionClick('최다 관심순')}
          >
            최다 관심순
          </Option>
          <Option
            selected={selectedOption === '높은 응찰가순'}
            onClick={() => handleOptionClick('높은 응찰가순')}
          >
            높은 응찰가순
          </Option>
        </OptionContainer>
        <RankingCardContainer>
          {sortedProducts.map((product, index) => (
            <RankingCard
              key={product._id}
              rank={index + 1}
              product={product}
              onClick={() => handleRankingCardClick(product._id)}
              isFavorite={likedProducts.some(
                (likedProduct) => likedProduct._id === product._id,
              )}
              onToggleFavorite={() => handleToggleFavorite(product)}
            />
          ))}
        </RankingCardContainer>
      </RankingContainer>
      <Divider />
      <Footer>Copyright @madcamp</Footer>
    </Box>
  );
};

export default HomePage;

const Box = styled.div`
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  overflow-x: hidden;
  padding-bottom: 50px;
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
  font-family: 'HSSummer', sans-serif;
  font-size: 24px;
`;

const BellIcon = styled(PiBell)`
  font-size: 24px;
`;

const MiddleContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const SliderItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const Image = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
`;

const RankingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
`;

const RankingTextContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 18px;
  margin-right: 10px;
`;

const RankingIcon = styled(FaRankingStar)`
  font-size: 18px;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const Option = styled.h1`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px 10px;
  margin-right: 10px;
  background-color: ${(props) => (props.selected ? '#eeeeee' : 'transparent')};
`;

const RankingCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-top: 10px;
  gap: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 20px;
`;

const Footer = styled.h1`
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 10px;
  color: #ccc;
  width: 100%;
  margin: 30px 0;
  text-align: center;
`;
