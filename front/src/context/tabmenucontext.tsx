import React, { createContext, useState, useContext, ReactNode } from 'react';

// TabCon2 타입 정의
interface TabCon2 {
  id: number;
  title: string;
  date: string;
}

// 컨텍스트 타입 정의
interface TabContextType {
  cont: TabCon2[];
  cont2: TabCon2[];
  setCont: (cont: TabCon2[]) => void;
  setCont2: (cont2: TabCon2[]) => void;
}


let initialCont: TabCon2[] = [
  { id: 0, title: "추석 연휴 택배배송 및 영업시간 안내", date: "2024.08.22" },
  { id: 1, title: "로젠 택배 택배비 인상 안내", date: "2024.07.02" },
  { id: 2, title: "매장 연락처 및 영업시간 오시는길 안내", date: "2024.06.22" },
  { id: 3, title: "추석 연휴 택배배송 및 영업시간 안내", date: "2024.05.22" }
];

let initialCont2: TabCon2[] = [
  { id: 0, title: "9월 할인 이벤트", date: "2024.08.26" },
  { id: 1, title: "8월 할인 이벤트", date: "2024.07.27" },
  { id: 2, title: "7월 할인 이벤트", date: "2024.06.26" },
  { id: 3, title: "6월 할인 이벤트", date: "2024.05.28" }
];

// TabContext 생성
const TabContext = createContext<TabContextType | null>(null);

// Provider 컴포넌트
interface TabProviderProps {
  children: ReactNode;
}

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [cont, setCont] = useState<TabCon2[]>(initialCont);
  const [cont2, setCont2] = useState<TabCon2[]>(initialCont2);

  return (
    <TabContext.Provider value={{ cont, cont2, setCont, setCont2 }}>
      {children}
    </TabContext.Provider>
  );
};

// useContext를 사용하는 훅
export const useTab = (): TabContextType => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }

  return context;
};
