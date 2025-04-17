import { useState } from 'react';

const AddressSearch = () => {
  const [district, setDistrict] = useState('');
  const [addresses, setAddresses] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    if (!district) {
      setError('시군구 이름을 입력해주세요.');
      return;
    }

    try {
        const res = await fetch(`/api/address?district=${encodeURIComponent(district)}`, {
          cache: 'no-store' // 캐시를 사용하지 않도록 설정
        });
        const data = await res.json();
    
        if (res.ok) {
          setAddresses(data);
          setError('');
        } else {
          setError(data.error || '주소를 찾을 수 없습니다.');
          setAddresses([]);
        }
      } catch (error) {
        setError('API 호출에 실패했습니다.');
        setAddresses([]);
      }
    };

  return (
    <div>
      <h1>시군구 이름으로 주소 찾기</h1>
      <input
        type="text"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        placeholder="시군구 이름을 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {addresses.length > 0 && (
        <div>
          <h2>주소 정보</h2>
          <ul>
            {addresses.map((address, index) => (
              <li key={index}>
                <p>우편번호: {address.zipcode}</p>
                <p>도로명 주소: {address.roadAddr}</p>
                <p>지번 주소: {address.jibunAddr}</p>
                {address.buildingName && <p>건물명: {address.buildingName}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddressSearch;
