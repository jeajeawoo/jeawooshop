# Jeawooshop - 쇼핑몰 웹 서비스
## 💬 프로젝트 소개
이 프로젝트는 전자상거래 웹 애플리케이션으로, 사용자들은 상품을 검색하고 장바구니에 담은 후 결제를 할 수 있습니다. 관리자는 상품을 등록하고 수정할 수 있습니다.

🛠 **기술 스택**  
- Frontend: React, Redux
- Backend: Spring Boot, JWT, MySQL

## 📌 주요 기능
- **회원가입**: 이메일 및 비밀번호를 통한 사용자 등록
- **로그인**: JWT를 사용한 로그인 및 인증
- **상품 목록/상세**: 상품 목록 조회, 상품 상세 페이지 보기
- **장바구니 기능**: 상품을 장바구니에 담고 결제 진행
- **관리자 페이지**: 관리자만 접근할 수 있는 상품 등록, 수정, 삭제

## 🧪 실행 방법
### Backend (Spring Boot)
1. `git clone https://github.com/jeajeawoo/jeawooshop`
2. `cd backend/demo`
3. `./gradlew build` (Windows는 `gradlew.bat build`)
4. `./gradlew bootRun` 으로 서버 실행 `http://localhost:8080`

### Frontend (React)
1. `cd frontend`
2. `yarn install`
3. `yarn dev` 실행 후 (http://localhost:3000) 접속

## 📸 스크린샷
### 🛍️ 상품 목록

![상품 목록](./item_img/item.png)

### 📦 상품 상세
![상품 상세](./item_img/detail.png)

### 🛒 장바구니
![장바구니](./item_img/cart.png)

### 🔐 로그인
![로그인](./item_img/login.png)

### 🧑‍💼 관리자 상품 등록
![관리자 등록](./item_img/add-item.png)
