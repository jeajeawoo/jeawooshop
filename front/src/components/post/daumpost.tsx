import React, { useEffect, useState } from 'react';

interface PostcodeSearchProps {
  onPostcodeSelect: (postcode: string, address: string, extraAddress: string) => void;
}

const DaumPostcodeSearch: React.FC<PostcodeSearchProps> = ({ onPostcodeSelect }) => {
  const [extraAddress, setExtraAddress] = useState<string>('');
  const [postcode, setPostcode] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  // Daum 우편번호 API 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    // 스크립트 로드 완료 후 콜백 함수
    script.onload = () => {
      if (window.daum) {
        console.log('Daum Postcode API 로드 완료');
      }
    };

    return () => {
      document.body.removeChild(script); // 컴포넌트가 unmount될 때 clean-up
    };
  }, []);

  const handlePostcodeSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        let addr = ''; // 주소 변수
        let extraAddr = ''; // 참고항목 변수

        // 사용자 선택 주소 타입에 따라 해당 주소 값을 가져옴
        if (data.userSelectedType === 'R') {
          addr = data.roadAddress; // 도로명 주소
        } else {
          addr = data.jibunAddress; // 지번 주소
        }

        // 도로명 주소일 경우 참고항목 처리
        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
          }

          if (extraAddr !== '') {
            extraAddr = ` (${extraAddr})`;
          }

          setExtraAddress(extraAddr);
        } else {
          setExtraAddress('');
        }

        // 우편번호와 주소 정보를 상태에 업데이트
        setPostcode(data.zonecode);
        setAddress(addr);

        // 부모 컴포넌트에 선택한 주소 전달
        onPostcodeSelect(data.zonecode, addr, extraAddr);

        // 커서를 상세주소 입력 필드로 이동
        document.getElementById('detailAddress')?.focus();
      }
    }).open();
  };

  return (
    <div>
      <button type="button" onClick={handlePostcodeSearch}>
        우편번호 검색
      </button>
    </div>
  );
};

export default DaumPostcodeSearch;
