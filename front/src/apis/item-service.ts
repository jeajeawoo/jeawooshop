import { CartItem, Item } from '@/types/type';
import axios from 'axios';



// axios를 사용하여 상품 목록을 가져오는 함수
export const fetchItems = async (): Promise<Item[]> => {
  try {
    const response = await axios.get('http://localhost:8080/api/item');
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error('상품 목록을 가져오는 데 실패:', error);
    throw new Error('상품 목록을 가져오는 데 실패');
  }
};

export const fetchDetailItem = async (itemId: number): Promise<Item> => {
  try {
    const response = await axios.get(`http://localhost:8080/api/item/${itemId}`);
    return response.data;
  } catch (error) {
    console.error(`상품 상세 조회 실패 (ID: ${itemId}):`, error);
    throw new Error('상품 상세 정보를 가져오는 데 실패했습니다.');
  }
};
export const purchaseItems = async (token: string, cartState: CartItem[]): Promise<Item[]> => {
  try {
    
    const itemsToPurchase = cartState.map(cartItem => ({
      id: cartItem.id,
      itemTitle: cartItem.name,
      quantity: cartItem.count,
      orderdate: new Date().toISOString(),
      price: cartItem.price
    }));

    const response = await axios.post(
      'http://localhost:8080/api/user/buy_items',
      itemsToPurchase, // BuyItemDto 형식에 맞게 데이터를 전달
      {
        headers: {
          Authorization: `Bearer ${token}`, // 로그인한 사용자 인증을 위한 토큰
        },
      }
    );

    return response.data; // 구매 처리 후 응답 데이터 반환
  } catch (error) {
    console.error('구매 처리 실패:', error);
    throw new Error('상품 구매 처리에 실패했습니다.');
  }
};