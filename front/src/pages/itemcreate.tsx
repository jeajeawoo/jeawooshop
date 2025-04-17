import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';

export default function CreateItemPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('이미지를 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('price', String(price));
    formData.append('file', file); 

    try {
      // axios로 POST 요청 보내기
      const response = await axios.post('http://localhost:8080/api/item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // multipart/form-data 타입을 명시
        },
      });
  
      // 성공적인 응답을 받았을 때 처리
      console.log('상품 등록 성공', response.data);
  
    } catch (err: any) {
      // 오류 처리
      console.error(err);
      
      // axios 에러 처리
      if (err.response) {
        // 서버 응답이 있었을 때 (예: 400, 500 등)
        setError(err.response.data.message || '상품 등록 중 오류 발생');
      } else if (err.request) {
        // 요청이 서버로 전송되었으나 응답이 없었을 때
        setError('서버 응답 없음');
      } else {
        // 기타 오류
        setError(err.message || '상품 등록 중 오류 발생');
      }
    }
  };

  return (
    <Container>
      <FormWrapper>
        <h2>상품 등록</h2>
        {error && <Error>{error}</Error>}
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Label>상품명</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label>설명</Label>
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label>가격</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label>상품 이미지</Label>
            <FileInput type="file" accept="image/*" onChange={handleFileChange} required />
          </InputWrapper>
          <SubmitButton type="submit">등록하기</SubmitButton>
        </Form>
      </FormWrapper>
    </Container>
  );
}

// Styled Components

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormWrapper = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    border-color: #0093ff;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  height: 120px;
  resize: vertical;
  &:focus {
    border-color: #0093ff;
    outline: none;
  }
`;

const FileInput = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  display: block;
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  background-color: #0093ff;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0077cc;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;
