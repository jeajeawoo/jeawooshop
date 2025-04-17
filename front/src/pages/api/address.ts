import { NextApiRequest, NextApiResponse } from 'next';

interface AddressResponse {
  zipcode: string;
  roadAddr: string;
  jibunAddr: string;
  buildingName: string;
  zonecode: string;
}

interface ErrorResponse {
  error: string;
}

const apiKey = 'QcMiWYoisGHuCdrk%2BKDWn%2BfnyW8tiznATBCNeUzWyMXYjRcEczm%2BLcJlX9a5RjcEu5Mvzi10Jzpt6Y0kOO6iaQ%3D%3D';

// 페이지 넘기면서 데이터 가져오는 함수
async function fetchAllAddresses(district: string) {
  const perPage = 100; // 한 페이지당 최대 100개 데이터 요청
  let page = 1;
  let allAddresses: any[] = [];
  let isLastPage = false;

  while (!isLastPage) {
    const response = await fetch(
      `http://api.odcloud.kr/api/15070405/v1/uddi:dd22ecb1-d970-4d91-af69-97155311dc0a?serviceKey=${apiKey}&page=${page}&perPage=${perPage}&returnType=JSON`
    );
    
    const data = await response.json();

    // API 호출이 정상적이지 않거나 데이터가 없다면 종료
    if (!data || !data.data || data.data.length === 0) {
      break;
    }

    // 시군구 이름이 포함된 데이터만 필터링
    const filteredAddresses = data.data.filter((address: any) =>
      address.시군구이름 && address.시군구이름.includes(district)
    );

    allAddresses = [...allAddresses, ...filteredAddresses]; // 받은 데이터 합침

    // 만약 받은 데이터가 `perPage`보다 적으면 더 이상 데이터가 없다고 판단
    if (data.data.length < perPage) {
      isLastPage = true;
    } else {
      page += 1; // 다음 페이지로 이동
    }
  }

  return allAddresses;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AddressResponse | ErrorResponse>
) {
  const { district } = req.query;  // 시군구 이름

  // 시군구가 없을 경우 에러 반환
  if (!district || typeof district !== 'string') {
    return res.status(400).json({ error: '시군구 이름을 입력해주세요.' });
  }

  try {
    // 모든 주소 데이터를 페이지별로 가져오기
    const allAddresses = await fetchAllAddresses(district);

    // 결과가 없을 경우 에러 반환
    if (allAddresses.length === 0) {
      return res.status(404).json({ error: '해당 시군구에 대한 주소를 찾을 수 없습니다.' });
    }

    // 결과 반환
    const addressResult:any = allAddresses.map((result: any) => ({
      zipcode: result.우편번호,
      roadAddr: result.전체주소,
      jibunAddr: result.전체주소,
      buildingName: result.리건물이름 || '',
      zonecode: result.우편번호순서,
    }));

    return res.status(200).json(addressResult);
  } catch (error) {
    console.error('API 호출 오류:', error);
    return res.status(500).json({ error: 'API 호출에 실패했습니다.' });
  }
}
