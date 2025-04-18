package spring_exam.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import spring_exam.demo.entity.Member;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {
    private Long id;

    private String email;

    private String password;

    private String userName;

    private Integer age;

    private String postcode;

    private String address;

    private String detailAddress;

    private String extraAddress;

    public MemberResponseDto(Member member) {
        this.id= member.getId();
        this.email = member.getEmail();
        this.password = member.getPassword();
        this.userName = member.getUserName();
        this.age = member.getAge();
        this.postcode = member.getPostcode();
        this.address = member.getAddress();
        this.detailAddress = member.getDetailAddress();
        this.extraAddress = member.getExtraAddress();

    }
}