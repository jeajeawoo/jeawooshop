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

}