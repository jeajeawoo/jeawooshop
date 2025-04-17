import { useState, useEffect } from 'react';
import { Tabitem, Tabmenu } from '@/components/tab/tabmenu';
import Slide from '@/components/shoes-item/slide';
import { Recent, Shoes } from '@/components/shoes-item/shoescard';
import { useShoes } from '@/context/shoescontext';
import styled from 'styled-components';

export default function Home() {
  const { shoes = [] } = useShoes();
  const [visibleChunks, setVisibleChunks] = useState(1); // 처음에 1개만 보여줌
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRecent = localStorage.getItem('watched');
      if (storedRecent) {
        setRecent(JSON.parse(storedRecent));
      }
    }
  }, []);

  const chunkedShoes = [];
  for (let i = 0; i < shoes.length; i += 3) {
    chunkedShoes.push(shoes.slice(i, i + 3));
  }

  const loadMoreChunks = () => {
    setVisibleChunks(prev => prev + 1);
  };

  return (
    <>
      <div>
        <Slide />
        {chunkedShoes.slice(0, visibleChunks).map((chunk, index) => (
          <ShoesMain key={index}>
            {chunk.map((shoes) => (
              <Shoes key={shoes.id} shoes={shoes} id={shoes.id} />
            ))}
          </ShoesMain>
        ))}

        <ButtonContainer>
          <button
            onClick={loadMoreChunks}
            disabled={visibleChunks >= chunkedShoes.length}
          >
            {visibleChunks < chunkedShoes.length ? "상품 더보기" : "더 이상 상품이 없습니다."}
          </button>
        </ButtonContainer>

        <TabAndRecent>
          <Tabmenu Tabitem={Tabitem} />
          <RecentBox>
            <RecentHeader>
              <h4>최근 본 상품</h4>
            </RecentHeader>
            <RecentItemContainer>
              {recent.length > 0 && recent.slice(0, 3).map((item, i) => (
                <Recent key={i} recent={item} shoes={shoes} />
              ))}
            </RecentItemContainer>
          </RecentBox>
        </TabAndRecent>
      </div>
    </>
  );
}

const ShoesMain = styled.div`
  display: flex;
  text-align: center;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const TabAndRecent = styled.div`
  display: flex;
`;

const RecentBox = styled.div`
  width: 570px;
`;

const RecentHeader = styled.div`
  padding-top: 20px;
  text-align: center;
`;

const RecentItemContainer = styled.div`
  display: flex;
  padding-top: 30px;
`;
