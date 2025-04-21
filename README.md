# Jeawooshop - 쇼핑몰 웹 서비스
## 💬 프로젝트 소개
이 프로젝트는 전자상거래 웹 애플리케이션으로, 사용자들은 상품을 검색하고 장바구니에 담은 후 결제를 할 수 있습니다. 관리자는 상품을 등록하고 수정할 수 있습니다.

📦 **개발 환경**
- **JDK:Java 17**
- **MySQL: 8.0.x**

🐬 **MySQL 수동 설정 방법 (Docker 미사용 시)**
1. MySQL 8.0 설치

2. 아래 정보를 기반으로 DB 수동 생성
  - **DB 이름**:  sqldb
  - **사용자명**:  root
  - **비밀번호**:  111111
  - **SQL로 직접 생성**: (MySQL 접속 후) CREATE DATABASE sqldb;
3. `git clone https://github.com/jeajeawoo/jeawooshop`
4. `cd backend/demo`
5. `./gradlew build` (Windows는 `gradlew.bat build`)
6. `./gradlew bootRun` 으로 서버 실행 (Windows는 `gradlew.bat bootRun`)

🐳 **Docker 사용 시 실행 방법**
1. `git clone https://github.com/jeajeawoo/jeawooshop`
2. `cd backend/demo`
3. `docker-compose up -d`
4. `./gradlew build` (Windows는 `gradlew.bat build`)
5. `./gradlew bootRun` 으로 서버 실행 `http://localhost:8080`

### Frontend (React)
1. `cd frontend`
2. `yarn install`
3. `yarn dev` 실행 후 (http://localhost:3000) 접속

🛠 **기술 스택**  
- Frontend: React, Redux
- Backend: Spring Boot, JWT, MySQL

## 📌 주요 기능
- **회원가입**: 이메일 및 비밀번호를 통한 사용자 등록
- **로그인**: JWT를 사용한 로그인 및 인증
- **상품 목록/상세**: 상품 목록 조회, 상품 상세 페이지 보기
- **장바구니 기능**: 상품을 장바구니에 담고 결제 진행
- **관리자 페이지**: 관리자만 접근할 수 있는 상품 등록 
(관리자 아이디: admin@naver.com 비밀번호 Qlalf1234)
(일반 아이디 :  user@naver.com 비밀번호 Test1234)

## 📸 스크린샷
### 🛍️ 상품 목록

![상품 목록](https://github.com/jeajeawoo/jeawooshop/blob/master/item_img/item.PNG)

### 📦 상품 상세
![상품 상세](https://github.com/jeajeawoo/jeawooshop/blob/master/item_img/detail.PNG)

### 🛒 장바구니
![장바구니](https://github.com/jeajeawoo/jeawooshop/blob/master/item_img/cart.PNG)

### 🔐 로그인
![로그인](https://github.com/jeajeawoo/jeawooshop/blob/master/item_img/login.PNG)

### 🧑‍💼 관리자 상품 등록
![관리자 등록](https://github.com/jeajeawoo/jeawooshop/blob/master/item_img/add-item.PNG)
