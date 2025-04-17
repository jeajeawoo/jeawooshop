// store/index.ts (또는 store.ts)
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // cartSlice 리듀서 import

// Redux 스토어 생성
export const store = configureStore({
  reducer: {
    cartItem: cartReducer, // cartSlice 리듀서 설정
  },
});

// RootState와 AppDispatch 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
