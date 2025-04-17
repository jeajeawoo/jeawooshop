import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { AxiosError } from "axios";
import { signUpInfo } from "@/apis/auth-service";
import useForm from "@/hooks/useForm";
import styled from "styled-components";
import DaumPostcodeSearch from "@/components/post/daumpost";

export default function SignUp() {
  const [email, onChangeEmail] = useForm<string>('');
  const [password, onChangePW] = useForm<string>('');
  const [userName, onChangeUserName] = useForm<string>('');
  const [age, onChangeAge] = useForm<number>(0);  // 나이는 number로 타입 지정
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [postcode, setPostcode] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [detailAddress, onChangeDetailAddress] = useForm<string>('')
  const [extraAddress, setExtraAddress] = useState<string>('')

  const handlePostcodeSelect = (postcode: string, address: string, extraAddress: string) => {
    setPostcode(postcode);
    setAddress(address);
    setExtraAddress(extraAddress);
  };
  const userData = {
    email,
    password,
    userName,
    age,
    postcode,
    address,
    detailAddress,
    extraAddress,
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUpInfo(userData)
      router.push('/login');
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          if (err.response.status === 409) {
            setError(err.response.data);  // 서버에서 반환한 에러 메시지
          } else if (err.response.status === 400) {
            setError(err.response.data);
          } else {
            setError('알 수 없는 오류가 발생했습니다.');
          }
        } else {
          setError('네트워크 오류가 발생했습니다.');
        }
      }
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>회원가입</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="이메일을 입력하세요"
            disabled={loading}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={onChangePW}
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
            placeholder="이름을 입력하세요"
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
            placeholder="나이를 입력하세요"
            disabled={loading}
          />
        </InputWrapper>
        <InputWrapper>
          <DaumPostcodeSearch onPostcodeSelect={handlePostcodeSelect} />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            id="postcode"
            placeholder="우편번호"
            value={postcode}
            readOnly
          />
        </InputWrapper>


        <InputWrapper>
          <Input
            type="text"
            id="address"
            placeholder="주소"
            value={address}
            readOnly
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            id="detailAddress"
            placeholder="상세주소"
            value={detailAddress}
            onChange={onChangeDetailAddress}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            id="extraAddress"
            placeholder="참고항목"
            value={extraAddress}
            readOnly
          />
        </InputWrapper>

        <Button type="submit" disabled={loading}>
          {loading ? '회원가입 중...' : '회원가입'}
        </Button>
      </form>
    </Wrapper>
  );
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
