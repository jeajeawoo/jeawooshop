import { useState } from 'react';
import navdata from '@/data/navdata';
import { NavItem } from '@/types/type';
import styled from 'styled-components';

export default function Dropnav() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  // 메뉴 열기
  const handleMouseEnter = (category: number) => {
    setActiveCategory(category);
  };

  // 메뉴 닫기
  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <Navbar>
      <NavList>
        {navdata.map((a: NavItem, i: number) => {
          return (
            <NavItemContainer
              key={i}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              {a.title}
              {activeCategory === i && (
                <DropdownMenu>
                  {a.name.map((name, index) => (
                    <DropdownLink key={index} href="#">
                      {name}
                    </DropdownLink>
                  ))}
                </DropdownMenu>
              )}
            </NavItemContainer>
          );
        })}
      </NavList>
    </Navbar>
  );
}

// 스타일드 컴포넌트

const Navbar = styled.nav`
  margin: 10px;
  background-color: #444;
  padding: 10px 20px;
`;

const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const NavItemContainer = styled.li`
  position: relative;
  margin-right: 20px;
  padding: 10px 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #444;
  display: block;
  min-width: 150px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px;
`;

const DropdownLink = styled.a`
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  display: block;

  &:hover {
    background-color: #666;
  }
`;
