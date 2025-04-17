import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;  // children의 타입을 ReactNode로 정의
  }
function MainLayout({ children }:MainLayoutProps) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
