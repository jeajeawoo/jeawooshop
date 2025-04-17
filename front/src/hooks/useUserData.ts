import { useState, useEffect } from "react";
import { UserProps } from "@/types/auth-type";
import { getUserInfo } from "@/apis/user-service";

const useUserData = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof window === "undefined") return;  // SSR 방어

      const token = JSON.parse(sessionStorage.getItem("authToken") || "{}")?.token;

      if (!token) {
        setError("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      try {
        const result = await getUserInfo(token);
        setUser(result);
      } catch (err) {
        console.error(err);
        setError("사용자 정보를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { user, loading, error };
};


export default useUserData;
