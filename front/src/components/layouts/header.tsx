// components/Header.tsx
import { Navbar, Nav, Container } from 'react-bootstrap';
import SearchBar from './Search';
import Dropnav from './dropnav';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/Authcontext';
import { useEffect } from 'react';

function Header() {
  const { isAuthenticated, logout,setIsAuthenticated } = useAuth();  // 로그인 상태와 로그아웃 함수 가져오기
  const router = useRouter();

  const handleLogout = () => {
    logout();  // 로그아웃 처리
    router.push('/');  // 홈으로 리디렉션
  };
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);  // 토큰이 있으면 로그인 상태로 설정
    } else {
      setIsAuthenticated(false); // 토큰이 없으면 로그인 상태 아님
    }
  }, [setIsAuthenticated]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} href="/">Leeshop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/cart">장바구니</Nav.Link>
              {isAuthenticated ? (
                <>
                  <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
                  <Nav.Link as={Link} href="/info">회원정보</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} href="/login">로그인</Nav.Link>
                  <Nav.Link as={Link} href="/signup">회원가입</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          <SearchBar />
        </Container>
      </Navbar>
      <Dropnav />
      <hr />
    </>
  );
}

export default Header;
