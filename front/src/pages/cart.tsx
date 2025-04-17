// components/Cart.tsx
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { AppDispatch, RootState } from '@/store';
import { downCount, removeFromCart, upCount } from './../store/cartSlice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { purchaseItems } from '@/apis/item-service';
import { CartItem } from '@/types/type'; // 이건 id, name, count, price 포함되도록 정의되어 있어야 해

function Cart() {
  const cartState = useSelector((state: RootState) => state.cartItem.items);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [hasAlerted, setHasAlerted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsClient(true);
    const token = JSON.parse(sessionStorage.getItem('authToken') || '{}').token;
    setToken(token);
  }, []);

  useEffect(() => {
    if (isClient && !token && !hasAlerted) {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      setHasAlerted(true);
      router.push('/login');
    }
  }, [isClient, token, router, hasAlerted]);

  if (!token) return null;

  const handlePurchase = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem('authToken') || '{}').token;
      const response = await purchaseItems(token, cartState);

      if (response && response.length > 0) {
        alert('구매가 완료되었습니다.');
        cartState.forEach((item) => dispatch(removeFromCart(item.id)));
        router.push('/purchase-complete');
      } else {
        alert('구매 처리 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('구매 처리 중 오류 발생:', error);
      alert('구매 처리 중 오류가 발생했습니다.');
    }
  };

  // 총 가격 계산
  const totalPrice = cartState.reduce((acc, item) => acc + (item.price || 0) * item.count, 0);
  
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cartState.map((item, i) => (
            <CartTable key={item.id} item={item} />
          ))}
        </tbody>
      </Table>

      <p style={{ textAlign: 'right', fontWeight: 'bold' }}>
        총 가격: {totalPrice.toLocaleString()}원
      </p>

      <button onClick={handlePurchase}>구매하기</button>
    </>
  );
}

interface CartTableProps {
  item: CartItem;
}

function CartTable({ item }: CartTableProps) {
  const dispatch = useDispatch<AppDispatch>();

  const increaseCount = () => {
    dispatch(upCount(item.id));
  };
  const DecreaseCount = () => {
    dispatch(downCount(item.id));
  };
  const deleteCartItem = () => {
    dispatch(removeFromCart(item.id))
  }
 
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.count}</td>
      <td>{item.price?.toLocaleString()}원</td>
      <td>
        <button onClick={increaseCount}>+</button>
        <button onClick={DecreaseCount}>-</button>
        <button onClick={deleteCartItem}>삭제</button>
      </td>
    </tr>
  );
}

export default Cart;
