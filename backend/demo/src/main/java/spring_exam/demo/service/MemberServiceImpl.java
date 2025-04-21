package spring_exam.demo.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import spring_exam.demo.dto.MemberResponseDto;
import spring_exam.demo.exception.InvalidUserDataException;
import spring_exam.demo.mapstruct.MemberMapStruct;
import spring_exam.demo.security.JwtUtil;
import spring_exam.demo.dto.MemberDto;
import spring_exam.demo.entity.Member;
import spring_exam.demo.exception.MemberNotFoundException;
import spring_exam.demo.exception.UserAlreadyExistsException;
import spring_exam.demo.repository.MemberRepository;
import spring_exam.demo.security.Role;
import spring_exam.demo.util.PasswordValideator;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class MemberServiceImpl implements MemberService {


    private final MemberRepository memberRepository;

    private final JwtUtil jwtUtil;

    private final PasswordEncoder passwordEncoder;

    private final MemberMapStruct memberMapStruct;

    @Override
    public List<MemberResponseDto> selectAllMember() {
        List<Member> memberList = memberRepository.findAll();

        return memberMapStruct.toResponseDtoList(memberList);
    }

    @Override
    public MemberResponseDto inputMember(MemberDto memberdto) {
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

        // 관리자 계정 생성 시 Role을 ADMIN으로 설정
        if (memberdto.getEmail().equals("admin@naver.com")) {
            member.setRole(Role.ROLE_ADMIN);
        } else {
            member.setRole(Role.ROLE_USER);  // 일반 사용자로 설정
        }
        // 회원 저장
        Member saved = memberRepository.save(member);

        return memberMapStruct.toResponseDto(saved);
    }


    @Override
    public MemberResponseDto deleteMember(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (member == null){
            log.info("잘못된 아이디"+email);
            return null;
        }
        memberRepository.delete(member);

        return memberMapStruct.toResponseDto(member);
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
    public MemberResponseDto selectUser(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberNotFoundException("User not found"));

        Role role = member.getRole();

        if (role == Role.ROLE_ADMIN) {
            System.out.println("Admin role detected");
        } else {
            System.out.println("Regular user detected");
        }

        return memberMapStruct.toResponseDto(member);
    }

    @Override
    public MemberResponseDto updateUser(String email, MemberDto memberTo) {

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

        return memberMapStruct.toResponseDto(updatedMember);
    }
}
