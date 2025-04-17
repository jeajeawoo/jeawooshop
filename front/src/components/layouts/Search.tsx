import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useShoes } from "@/context/shoescontext";
import { useRouter } from "next/router";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("통합검색");
  const { shoes, setFilteredShoes } = useShoes();  // context에서 가져오기
  const router = useRouter();

  // 검색어 상태 변경 핸들러
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 선택된 카테고리 상태 변경 핸들러
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCategory(e.target.value); // 값을 그대로 문자열로 처리
  };

  // 폼 제출 시 처리
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("검색어:", searchTerm);
    console.log("카테고리:", searchCategory);

    // 검색어와 카테고리에 따라 신발 데이터를 필터링
    const filteredShoes = shoes.filter((shoe) => {
      const term = searchTerm.toLowerCase(); // 검색어 소문자 변환
      const title = shoe.title.toLowerCase();
      const manufacturer = shoe.content.toLowerCase(); // 예를 들어 content에 제조사 정보 있다고 가정

      // 카테고리에 따른 필터링
      if (searchCategory === "통합검색") {
        return title.includes(term) || manufacturer.includes(term); // 제목, 제조사 모두 검색
      } else if (searchCategory === "상품명") {
        return title.includes(term); 
      } else if (searchCategory === "제조사") {
        return manufacturer.includes(term); 
      }
      return false; // 기본적으로 필터링 되지 않음
    });

    console.log("검색된 신발 목록:", filteredShoes);

    // 필터된 신발 목록을 context의 filteredShoes 상태에 저장
    setFilteredShoes(filteredShoes);

    // 다른 페이지로 이동
    router.push("/itempage");
  };
  return (
    <SearchSection>
      <SearchBox onSubmit={handleSubmit}>
        <SearchSelectbox
          value={searchCategory}
          onChange={handleCategoryChange}
        >
          <option value="통합검색">통합검색</option>
          <option value="상품명">상품명</option>
          <option value="제조사">제조사</option>
        </SearchSelectbox>
        <SearchText
          type="text"
          name="searchTerm"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="검색어를 입력하세요"
        />
        <SearchButton type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchButton>
      </SearchBox>
    </SearchSection>
  );
}

const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const SearchBox = styled.form`
  width: 400px;
  height: 40px;
  background: white;
  border-radius: 40px;
  padding: 1px;
  border: 1px solid #0093ff;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const SearchText = styled.input`
  border: none;
  background: none;
  outline: none;
  padding: 0px;
  color: black;
  font-size: 16px;
  line-height: 37px;
  width: 200px;
`;

const SearchSelectbox = styled.select`
  border: none;
  padding: 5px;
  outline: none;
  margin-right: 20px;
  background: none;
  font-size: 16px;
`;

const SearchButton = styled.button`
  color: #0093ff;
  width: 40px;
  height: 100%;
  border-radius: 50%;
  background: white;
  border: none;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  right: 10px;
`;
