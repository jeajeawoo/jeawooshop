// pages/purchase-complete.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

interface PurchaseItem {
  id: number;
  itemTitle: string;
  quantity: number;
  price: number;
  orderdate: string;
}

const PurchaseComplete = () => {
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('authToken') || '{}').token;
    
    if (!token) {
      router.push('/login');  // 로그인하지 않았다면 로그인 페이지로 리디렉션
      return;
    }

    const fetchPurchaseDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/buy_items', {
          headers: {
            Authorization: `Bearer ${token}`,  // Bearer 토큰 방식으로 인증 헤더 추가
          },
        });
        setPurchaseDetails(response.data); // API에서 받아온 데이터를 상태에 저장
      } catch (error) {
        console.error('구매 내역을 가져오는 데 오류가 발생했습니다:', error);
        alert('구매 내역을 가져오는 데 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseDetails();
  }, [router]);

  if (loading) return <div>Loading...</div>;  // 데이터가 로딩 중일 때 표시할 내용

  if (!purchaseDetails || purchaseDetails.length === 0) {
    return (
      <Container>
        <h3>구매 내역이 없습니다.</h3>
      </Container>
    );
  }

  return (
    <Container>
      <h3>구매 완료</h3>
      <p>구매가 완료되었습니다. 아래에서 구매 내역을 확인하세요.</p>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>구매날짜</th>
          </tr>
        </thead>
        <tbody>
          {purchaseDetails.map((item: PurchaseItem, index: number) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.itemTitle}</td>
              <td>{item.quantity}</td>
              <td>{item.price.toLocaleString()}원</td>
              <td>{item.orderdate}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <p style={{ textAlign: 'right', fontWeight: 'bold' }}>
        총 결제 금액: {purchaseDetails.reduce((acc: number, item: PurchaseItem) => acc + item.price * item.quantity, 0).toLocaleString()}원
      </p>
    </Container>
  );
};

export default PurchaseComplete;
