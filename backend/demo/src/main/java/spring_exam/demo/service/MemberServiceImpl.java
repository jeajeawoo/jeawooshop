package spring_exam.demo.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import spring_exam.demo.exception.InvalidUserDataException;
import spring_exam.demo.security.JwtUtil;
import spring_exam.demo.dto.MemberDto;
import spring_exam.demo.entity.Member;
import spring_exam.demo.exception.MemberNotFoundException;
import spring_exam.demo.exception.UserAlreadyExistsException;
import spring_exam.demo.repository.MemberRepository;
import spring_exam.demo.security.Role;
import spring_exam.demo.util.PasswordValideator;

import java.util.List;

@Service
@Slf4j
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Member selectMember(String email) {
        Member member = memberRepository.findByEmail(email).orElse(null);
        if (member==null){
            log.info("잘못된 아이디"+email);
            return null;
        }
        return member;
    }

    @Override
    public List<Member> selectAllMember() {
        List<Member> memberList = memberRepository.findAll();
        return memberList;
    }

    @Override
    public Member inputMember(MemberDto memberdto) {
        // 이메일 중복 체크
        if (memberRepository.existsByEmail(memberdto.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists");
        }
        // 비밀번호 유효성 검사
        if (!PasswordValideator.isValidPassword(memberdto.getPassword())) {
            throw new InvalidUserDataException("Password must be at least 8 characters long and include uppercase, lowercase, and a number.");
        }

        // 비밀번호 해시화
        String encodedPassword = passwordEncoder.encode(memberdto.getPassword());
        Member member = memberdto.toEntity();

        member.setPassword(encodedPassword);

        log.info(member.toString());

        // 회원 저장
        Member saved = memberRepository.save(member);
        return saved;
    }


    @Override
    public Member deleteMember(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (member == null){
            log.info("잘못된 아이디"+email);
            return null;
        }
        memberRepository.delete(member);
        return member;
    }

    @Override
    public String authenticateMember(String email, String password) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(password, member.getPassword())) {
            return null; // 비밀번호가 일치하지 않으면 null 반환
        }
        // 역할(role) 추출
        String role = member.getRole().name();  // role을 문자열로 가져옴

        return jwtUtil.generateToken(email,role);
    }

    @Override
    public Member selectUser(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Role을 추출해서 사용할 수 있음
        Role role = member.getRole();  // Role enum을 반환
        // role을 문자열로 비교
        if ("ROLE_ADMIN".equals(role)) {
            // 관리자 권한을 가진 경우
            System.out.println("Admin role detected");
        } else {
            // 일반 사용자
            System.out.println("Regular user detected");
        }
        return member;
    }

    @Override
    public Member updateUser(String email, MemberDto memberTo) {


        // 이메일로 회원 조회
        Member findMember = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberNotFoundException("Member not found"));

        Member member = memberTo.toEntity();
        findMember.patchCheck(member);

        // 새 비밀번호가 입력된 경우에만 유효성 검사 및 해시화 진행
        if (memberTo.getNewPassword() != null && !memberTo.getNewPassword().isEmpty()) {
            // 새 비밀번호 확인 일치 검사
            if (!PasswordValideator.isPasswordMatch(memberTo.getNewPassword(), memberTo.getNewPasswordConfirm())) {
                throw new IllegalArgumentException("New password and confirm password do not match.");
            }
            // 새 비밀번호 유효성 검사
            if (!PasswordValideator.isValidPassword(memberTo.getNewPassword())) {
                throw new IllegalArgumentException("Password must be at least 8 characters long and include uppercase, lowercase, and a number.");
            }
            // 비밀번호 해시화
            String encodedPassword = passwordEncoder.encode(memberTo.getNewPassword());
            findMember.setPassword(encodedPassword);  // 새 비밀번호를 해시화하여 설정
        }

        // 변경된 회원 저장
        Member updatedMember = memberRepository.save(findMember);
        return updatedMember;
    }
}
