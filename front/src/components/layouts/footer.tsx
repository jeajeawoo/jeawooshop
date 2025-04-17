import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCalendarDays, faTruck, faHouse } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";

export default function Footer() {
    return (
        <>
        <hr/>
        <FooterWrapper>
            <FooterInner>
                <TopButton href="#top">
                    <FontAwesomeIcon icon={faArrowUp} />
                </TopButton>
                <FooterLogo>
                    <img 
                        src='https://codingapple1.github.io/shop/shoes1.jpg' 
                        alt="신발 로고" 
                        width="50%" 
                    />
                </FooterLogo>
                <FooterInfo>
                    <h2 className="footer-info-name">신발가게</h2>
                    <p>대표이사: ### | 사업자등록번호: 000-00-00000</p>
                    <p>주소: ##시##로##번길</p>
                    <p>대표번호: 010-0000-0000</p>
                    <p>통신판매업신고: 0000-##시-0000호 | 정보책임자: ###</p>
                </FooterInfo>
                <FooterCon>
                    <h2>바로가기</h2>
                    <LinkList>
                        <LinkItem>
                            <Link href="#">
                                <IconWrapper>
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                </IconWrapper>
                                <span>출석체크</span>
                            </Link>
                        </LinkItem>
                        <LinkItem>
                            <Link href="#">
                                <IconWrapper>
                                    <FontAwesomeIcon icon={faTruck} />
                                </IconWrapper>
                                <span>배송조회</span>
                            </Link>
                        </LinkItem>
                        <LinkItem>
                            <Link href="/">
                                <IconWrapper>
                                    <FontAwesomeIcon icon={faHouse} />
                                </IconWrapper>
                                <span>홈으로</span>
                            </Link>
                        </LinkItem>
                    </LinkList>
                </FooterCon>
            </FooterInner>
        </FooterWrapper>
        </>
    );
}

// 스타일드 컴포넌트

const FooterWrapper = styled.div`
  height: 150px;
  background-color: #fff;
`;

const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const TopButton = styled.a`
  position: fixed;
  bottom: 5px;
  right: 5px;
  font-size: 35px;
  cursor: pointer;
`;

const FooterLogo = styled.div`
  width: 50%;
`;

const FooterInfo = styled.div`
  font-size: 11px;
  line-height: 10px;
  margin-right: 200px;
`;

const FooterCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  height: 150px;
`;

const LinkList = styled.ul`
  display: flex;
  margin: 10px 0;
  padding: 0;
  list-style: none;
`;

const LinkItem = styled.li`
  display: inline-block;
  margin-left: 20px;
`;

const Link = styled.a`
  display: block;
  height: 100%;
  text-align: center;
  text-decoration: none;
  color: inherit;
`;

const IconWrapper = styled.p`
  width: 80px;
  height: 60px;
  background-color: #ceb398;
  text-align: center;
  padding-top: 5px;
  border-radius: 20px;
  font-size: 35px;
`;

const FooterConTitle = styled.h2`
  color: #ceb398;
  margin-left: 50px;
`;

