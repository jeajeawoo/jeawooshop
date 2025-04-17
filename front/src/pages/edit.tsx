
import { getUserInfo, updateUserInfo } from "@/apis/user-service";
import DaumPostcodeSearch from "@/components/post/daumpost";
import useForm from "@/hooks/useForm";
import { UserProps } from "@/types/auth-type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function UserEdit(){
  const [email, onChangeEmail] = useForm<string>('');
  const [newPassword, onChangePW] = useForm<string>('');
  const [newPasswordConfirm, onChangePWCF] = useForm<string>('');
  const [userName, onChangeUserName] = useForm<string>('');
  const [age, onChangeAge] = useForm<number>(0);  // 나이는 number로 타입 지정    
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<UserProps | null>(null);  // 초기값을 null로 설정
  const router = useRouter();
  const [postcode, setPostcode] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [detailAddress, onChangeDetailAddress] = useForm<string>('')
  const [extraAddress, setExtraAddress] = useState<string>('')
  
  
  useEffect(() => {
      const token = JSON.parse(sessionStorage.getItem('authToken') || '{}').token;
                  if (!token) {
                      setError("로그인이 필요합니다.");
                      setLoading(false);
                      return;
                  }
      
                  const fetchUserData = async () => {
                      try {
                        const userData = await getUserInfo(token);  // UserInfo 함수 호출하여 사용자 정보 가져오기
                        setUser(userData);  // 상태에 사용자 데이터 저장
                        setLoading(false);
                      } catch (err) {
                        console.error(err);
                        setError("사용자 정보를 가져오는 데 실패했습니다.");
                        setLoading(false);
                      }
                    };
              fetchUserData();  
          }, []);  
  
  
  const handlePostcodeSelect = (postcode: string, address: string, extraAddress: string) => {
      setPostcode(postcode);
      setAddress(address);
      setExtraAddress(extraAddress);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    if (newPassword !== newPasswordConfirm) {
      setError("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
      setLoading(false);
      return;
    }
  
    const token = JSON.parse(sessionStorage.getItem("authToken") || "{}").token;
  
    try {
      await updateUserInfo(token, {
        email,
        userName,
        newPassword,
        newPasswordConfirm,
        age,
        postcode,
        address,
        detailAddress,
        extraAddress,
      }); // ✅ 서비스 함수로 요청 전송
  
      router.push("/info");
    } catch (error) {
      console.error("Error updating user data", error);
      setError("회원 정보 업데이트에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };
  


  return(
    <Wrapper>
      
      <Title>회원 정보 수정</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Label htmlFor="email">이메일</Label>
          <Input
              type="email"
              id="email"
              value={email}
              onChange={onChangeEmail}
              placeholder={user?.email}
              disabled
          />
          </InputWrapper>
          <InputWrapper>
          <Label htmlFor="newPassword">새 비밀번호</Label>
          <Input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={onChangePW}
              placeholder="비밀번호를 입력하세요"
              disabled={loading}
          />
          </InputWrapper>
          <InputWrapper>
          <Label htmlFor="newPasswordConfirm">새 비밀번호 확인</Label>
          <Input
              type="password"
              id="newPasswordConfirm"
              value={newPasswordConfirm}
              onChange={onChangePWCF}
              placeholder="비밀번호를 입력하세요"
              disabled={loading}
          />
          </InputWrapper>
          <InputWrapper>
          <Label htmlFor="userName">이름</Label>
          <Input
              type="text"
              id="userName"
              value={userName}
              onChange={onChangeUserName}
              placeholder={user?.userName}
              disabled={loading}
          />
          </InputWrapper>
        <InputWrapper>
          <Label htmlFor="age">나이</Label>
          <Input
            type="number"
            id="age"
            value={age}
            onChange={onChangeAge}
            disabled={loading}
          />
        </InputWrapper>
        <InputWrapper>
          <DaumPostcodeSearch onPostcodeSelect={handlePostcodeSelect} />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="postcode">우편번호</Label>
          <Input
            type="text"
            id="postcode"
            value={postcode}
            placeholder={user?.postcode}
            readOnly
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="address">주소</Label>
          <Input
              type="text"
              id="address"
              placeholder={user?.address}
              value={address}
              readOnly
          />
        </InputWrapper>
        <InputWrapper>
        <Label htmlFor="detailAddress">상세주소</Label>
            <Input
              type="text"
              id="detailAddress"
              placeholder={user?.detailAddress}
              value={detailAddress}
              onChange={onChangeDetailAddress}
            />
        </InputWrapper>
        <InputWrapper>
        <Label htmlFor="extraAddress">참고항목</Label>
          <Input
            type="text"
            id="extraAddress"
            placeholder={user?.extraAddress}
            value={extraAddress}
            readOnly
          />
        </InputWrapper>
        <Button type="submit" disabled={loading}>
        {loading ? '수정 중...' : '정보수정'}
        </Button>
      </form>
    </Wrapper>
  )

}

const Wrapper = styled.div`
  width: ${(props) => props.theme?.containerWidth || '100%'};
  max-width: 400px;
  margin: 100px auto;
  padding: ${(props) => props.theme?.containerPadding || '20px'};
  border: 1px solid ${(props) => props.theme?.colors?.border || '#ccc'};
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: ${(props) => props.theme?.fontSizes?.large || '24px'};
  color: ${(props) => props.theme?.colors?.textColor || '#333'};
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 15px;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: ${(props) => props.theme?.fontSizes?.medium || '16px'};
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme?.padding || '10px'};
  margin: 5px 0;
  border: 1px solid ${(props) => props.theme?.colors?.border || '#ccc'};
  border-radius: ${(props) => props.theme?.borderRadius || '4px'};
  font-size: 14px;
  box-sizing: border-box;
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${(props) => props.theme?.padding || '12px'};
  background-color: ${(props) => props.theme?.colors?.primary || '#0093ff'};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme?.borderRadius || '4px'};
  cursor: pointer;
  font-size: ${(props) => props.theme?.fontSizes?.medium || '16px'};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme?.colors?.hover || '#0059ff'};
  }

  &:disabled {
    background-color: ${(props) => props.theme?.colors?.hover || '#0059ff'};
    cursor: not-allowed;
  }
`;