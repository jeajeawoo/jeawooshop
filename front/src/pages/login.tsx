import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useForm from '@/hooks/useForm';
import { loginToken } from '@/apis/auth-service';
import { useAuth } from '@/context/Authcontext';
import styled from 'styled-components';

function Login() {
  const [email, onChangeEmail] = useForm<string>('');
  const [password, onChangePW] = useForm<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await loginToken(email, password);
      login(result.token);
      router.push('/');
    } catch (err) {
      setError('로그인 실패! 이메일이나 비밀번호를 확인하세요.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <Title>로그인</Title>
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
        <Button type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  width: ${(props) => props.theme?.containerWidth || '300px'};
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
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  text-align: left;
  font-weight: bold;
  font-size: ${(props) => props.theme?.fontSizes?.medium || '16px'};
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
  padding: ${(props) => props.theme?.padding || '10px'};
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
