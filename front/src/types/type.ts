export type NavItem = {
    title: string;
    name: string[];
}

export interface Content {
    title: string;
    date: string;
  }
  
export interface TabitemProps {
    cont: Content;
}

export interface TabmenuProps {
    Tabitem: React.ComponentType<TabitemProps>;
}

export interface TabConProps {
    tab1: number;
}
// CartTable 컴포넌트 타입 정의
export interface CartTableProps {
    cartItem: { id: number; name: string; count: number,price: number }[];
    i: number;
}
// CartItem 타입 정의
export interface CartItem {
    id: number;
    name: string;
    count: number;
    price: number;
  }
  
// 초기 상태 정의
export interface CartState {
    items: CartItem[];
}

export interface Shoes {
    id: number;
    title: string;
    content: string;
    price: number;
    originalImgName: string;
    storedFilePath: string
}

export interface ShoesProps {
    shoes: Shoes;
    id: number;
}

export interface RecentProps {
    recent: number;
    shoes: Shoes[];
}

export interface TabConProps {
    tab1: number;
  }

export interface DetailProps {
    shoes: Shoes | null;
}
export interface Item {
    id: number;
    title: string;
    content: string;
    price: number;
    originalImgName: string;
    storedFilePath : string;
    fileSize : number;
}