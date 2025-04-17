// 회원가입 성공
export interface SignUpResponse {
    success: boolean;
    message: string;
}
  //회원가입 폼데이터
export interface SignUpData {
    email: string;
    password: string;
    userName: string;
    age: number;
    postcode: string;
    address: string;
    detailAddress: string;
    extraAddress: string;
}
//user data
export interface UserProps{
    id:number
    email: string
    password: string
    userName: string
    age: number
    postcode: string
    address: string
    detailAddress: string
    extraAddress: string
}
// 로그인 토큰
export interface LoginResponse {
    token: string;
  }