import { UserProps } from "@/types/auth-type";
import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/user',
    headers: { 'Content-Type': 'application/json' }
});

export const getUserInfo = async (token: string): Promise<UserProps> => {
  try {
    const response: AxiosResponse<UserProps> = await axiosInstance.get(
      "",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err: any) {
    console.error(err);
    throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
  }
};

export const deleteAccount = async (token: string): Promise<void> => {
    await axiosInstance.delete("delete", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };



interface EditUserRequest {
    email: string;
    userName: string;
    newPassword: string;
    newPasswordConfirm: string;
    age: number;
    postcode: string;
    address: string;
    detailAddress: string;
    extraAddress: string;
  }
  
  export const updateUserInfo = async (
    token: string,
    userData: EditUserRequest
  ): Promise<void> => {
    await axiosInstance.patch("edit", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };