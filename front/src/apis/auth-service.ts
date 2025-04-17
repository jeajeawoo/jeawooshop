import { LoginResponse, SignUpData, SignUpResponse } from "@/types/auth-type";
import axios, { AxiosResponse } from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/public',
    headers: { 'Content-Type': 'application/json' }
});


export const loginToken = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const result: AxiosResponse<LoginResponse> = await axiosInstance.post(
    "login",
    { email, password }
  );
  return result.data;
};


export const signUpInfo = async (data:SignUpData): Promise<SignUpResponse> => {
  const response: AxiosResponse<SignUpResponse> = await axiosInstance.post("members",data);
  return response.data;
};