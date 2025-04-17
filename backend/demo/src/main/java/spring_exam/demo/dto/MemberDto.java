package spring_exam.demo.dto;

import lombok.*;
import spring_exam.demo.entity.Member;
import spring_exam.demo.security.Role;



@AllArgsConstructor
@NoArgsConstructor
@Data
public class MemberDto {
    private Long id;
    private String email;
    private String password;
    private String userName;
    private Integer age;
    private String postcode;
    private String address;
    private String detailAddress;
    private String extraAddress;

    private String newPassword; // 새 비밀번호
    private String newPasswordConfirm; // 새 비밀번호 확인
    private String role; // role을 추가할 수 있음 (입력 값으로 받을 경우)

    public Member toEntity() {
        Role userRole = (role == null || role.isEmpty()) ? Role.ROLE_USER : Role.valueOf(role);
        return new Member(id,email,password,userName,age,postcode,address,detailAddress,extraAddress,userRole);

    }


}


