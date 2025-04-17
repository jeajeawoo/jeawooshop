// store/cartSlice.ts
import { CartState,CartItem } from '@/types/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CartState = {
  items: [],
};

// 슬라이스 정의
const cartSlice = createSlice({
  name: 'cartItem',
  initialState,
  reducers: {
    upCount(state, action: PayloadAction<number>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.count += 1;
      }
    },
    downCount(state, action: PayloadAction<number>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.count > 1) {
        item.count -= 1;
      }
    },
    addItem(state, action: PayloadAction<CartItem>) {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].count += action.payload.count;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

// 액션 및 리듀서 내보내기
export const { upCount, addItem,removeFromCart,downCount } = cartSlice.actions;
export default cartSlice.reducer;
