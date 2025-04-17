import { deleteAccount } from "@/apis/user-service";
import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/router";
import styled from "styled-components";
import useUserData from "@/hooks/useUserData";  // 만든 훅 불러오기

export default function UserInfo() {
    const router = useRouter();
    const { logout } = useAuth();
    const { user, loading, error } = useUserData()

    const handleEditProfile = () => {
        router.push("/edit");
    };

    const handleDeleteAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        try {
            const token = JSON.parse(sessionStorage.getItem("authToken") || "{}").token;
            await deleteAccount(token);
            logout();
            router.push("/");
        } catch (err) {
            console.error(err);
            alert("회원 탈퇴 중 오류가 발생했습니다.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!user) return <div>사용자 정보가 없습니다.</div>;

    return (
        <Wrapper>
            <H1>회원정보</H1>
            <H3>아이디: {user.email}</H3>
            <H3>이름: {user.userName}</H3>
            <H3>나이: {user.age}</H3>
            <H3>우편번호: {user.postcode}</H3>
            <H3>주소: {user.address}</H3>
            <H3>상세주소: {user.detailAddress}</H3>
            <H3>참고항목: {user.extraAddress}</H3>
            <button onClick={handleEditProfile}>정보수정</button>
            <button onClick={handleDeleteAccount}>회원삭제</button>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    padding: 20px;
    text-align: center;
`;

const H1 = styled.h1`
    font-size: 2rem;
`;

const H3 = styled.h3`
    font-size: 1.5rem;
    border: 1px solid;
`;
