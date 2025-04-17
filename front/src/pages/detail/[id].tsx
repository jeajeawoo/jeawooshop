import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Container, Alert, Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cartSlice';
import { TabCon } from '@/components/tab/tabcontents';
import { Shoes } from '@/types/type';

const Detail = () => {
  const [shoes, setShoes] = useState<Shoes | null>(null);
  const [alert, setAlert] = useState(true);
  const [tab1, setTab1] = useState(0);
  const [fade1, setFade1] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;  // next.js에서 동적 경로의 id를 가져옵니다.

  useEffect(() => {
    if (!router.isReady) return;
    console.log("id in query:", id);
    if (id) {
      const fetchShoes = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/item/${id}`);
          const item = response.data;
          const normalizedItem = {
            ...item,
            id: item.itemId, // id 필드를 추가
          };
          
  
          // 로컬스토리지 저장 로직
          if (normalizedItem.id !== undefined && typeof window !== 'undefined') {
            const raw = localStorage.getItem('watched');
            const watched: number[] = raw ? JSON.parse(raw) : [];
          
            const filtered = watched.filter((w) => w !== normalizedItem.id);
            const updated = [normalizedItem.id, ...filtered].slice(0, 3); // 최대 3개
          
            localStorage.setItem('watched', JSON.stringify(updated));
            console.log('로컬스토리지 저장됨 :', updated);
          }
          setShoes(normalizedItem);
        } catch (error) {
          console.error("상품 상세 정보를 가져오는 데 실패:", error);
        }
      };
      
      fetchShoes();
    }
  }, [id]);

  useEffect(() => {
    const timeE = setTimeout(() => setAlert(false), 3000);
    setTimeout(() => setFade1('end'), 100);

    return () => {
      clearTimeout(timeE);
    };
  }, [shoes?.id]);
  
  
  if (!shoes) return <div>Loading...</div>;  // 데이터가 없으면 로딩 상태 출력

  return (
    <Container className={'start ' + fade1}>
      {alert && <Alert variant="info">3초 이내 구매 할인</Alert>}

      <div style={{ display: 'flex' }}>
        <img
          src={`http://localhost:8080/images/${shoes.storedFilePath}`}
          width={'50%'}
          alt="신발"
        />
        <div>
          <h4>{shoes.title}</h4>
          <p>{shoes.content}</p>
          <p>{shoes.price}원</p>

            <Button
              variant="danger"
              onClick={() => {
                dispatch(addItem({ id: shoes.id, name: shoes.title, count: 1, price: shoes.price }));
                router.push('/cart');
              }}
            >
              장바구니 넣기
            </Button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link onClick={() => setTab1(0)} eventKey="link-0">
            설명
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab1(1)} eventKey="link-1">
            Option
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab1(2)} eventKey="link-2">
            설명
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabCon tab1={tab1} />
    </Container>
  );
};

export default Detail;
