import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Shoes } from "@/types/type";
import { fetchItems } from '@/apis/item-service';

interface ShoesContextType {
  shoes: Shoes[];
  setShoes: (shoes: Shoes[]) => void;
  filteredShoes: Shoes[];
  setFilteredShoes: (filteredShoes: Shoes[]) => void;
}

// 컨텍스트 생성
const ShoesContext = createContext<ShoesContextType | null>(null);

interface ShoesProviderProps {
  children: ReactNode;
}

export const ShoesProvider: React.FC<ShoesProviderProps> = ({ children }) => {
  const [shoes, setShoes] = useState<Shoes[]>([]);
  const [filteredShoes, setFilteredShoes] = useState<Shoes[]>([]);

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const data = await fetchItems();
        setShoes(data); // 데이터 가져오기
        setFilteredShoes(data); // 처음에는 모든 신발을 필터된 목록으로 설정
      } catch (error) {
        console.error("신발 데이터 가져오기 실패:", error);
      }
    };

    fetchShoes();
  }, []);

  return (
    <ShoesContext.Provider value={{ shoes, setShoes, filteredShoes, setFilteredShoes}}>
      {children}
    </ShoesContext.Provider>
  );
};

// 커스텀 훅
export const useShoes = (): ShoesContextType => {
  const context = useContext(ShoesContext);
  if (!context) throw new Error('useShoes must be used within a ShoesProvider');
  return context;
};
