import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styled from 'styled-components';
import { useShoes } from '@/context/shoescontext'; 

export default function Slide() {
  const { shoes } = useShoes(); 
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이드
  useEffect(() => {
    if (isPaused || shoes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shoes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, shoes]);

  // 이전/다음 슬라이드
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? shoes.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === shoes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const togglePause = () => setIsPaused((prev) => !prev);

  if (shoes.length === 0) return null; // 데이터 없으면 렌더링 X

  return (
    <SliderContainer>
      <SliderContent>
        <Link href={`/detail/${shoes[currentIndex].id}`}>
          <Image
            src={`http://localhost:8080/images/${shoes[currentIndex].storedFilePath}`} // 👈 DB 이미지 경로
            alt={shoes[currentIndex].title}
          />
        </Link>
      </SliderContent>
      <Controls>
        <Button onClick={prevSlide}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
        <Button onClick={togglePause}>
          {isPaused ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
        </Button>
        <Button onClick={nextSlide}>
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
      </Controls>
    </SliderContainer>
  );
}


const SliderContainer = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  margin: 0 auto;
  overflow: hidden;
`;

const SliderContent = styled.div`
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease-in-out;
`;

const Controls = styled.div`
  position: absolute;
  top: 90%;
  width: 100%;
  justify-content: space-between;
  transform: translateY(-50%);
  text-align: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: black;
  cursor: pointer;
  &:hover {
    color: #0093ff;
  }
`;
