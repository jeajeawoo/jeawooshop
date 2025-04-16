package spring_exam.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import spring_exam.demo.security.Role;

@Entity
@Table(name = "u_member")
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가값 1,2,3
    private Long id;

    private String email;


    private String password;

    private String userName;

    private Integer age;

    private String postcode;

    private String address;

    private String detailAddress;

    private String extraAddress;

    @Enumerated(EnumType.STRING)  // 역할을 Enum으로 설정
    private Role role;

    public void patchCheck(Member member) {
        if (member.email != null && !member.email.trim().isEmpty()) {
            this.email = member.email;
        }
        if (member.userName != null && !member.userName.trim().isEmpty()) {
            this.userName = member.userName;
        }
        if (member.age != null && member.age > 0) {
            this.age = member.age;
        }
        if (member.postcode != null && !member.postcode.trim().isEmpty()) {
            this.postcode = member.postcode;
        }

        if (member.address != null && !member.address.trim().isEmpty()) {
            this.address = member.address;
        }

        if (member.detailAddress != null && !member.detailAddress.trim().isEmpty()) {
            this.detailAddress = member.detailAddress;
        }

        if (member.extraAddress != null && !member.extraAddress.trim().isEmpty()) {
            this.extraAddress = member.extraAddress;
        }
    }

}
