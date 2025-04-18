package spring_exam.demo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import spring_exam.demo.dto.AuthResponse;
import spring_exam.demo.dto.MemberDto;
import spring_exam.demo.dto.MemberResponseDto;
import spring_exam.demo.entity.Member;
import spring_exam.demo.exception.InvalidUserDataException;
import spring_exam.demo.exception.UserAlreadyExistsException;
import spring_exam.demo.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
public class MemberController {

    @Autowired
    MemberService memberService;

    @GetMapping("/members")
    public List<MemberResponseDto> apimember(){
        List<MemberResponseDto> memberList = memberService.selectAllMember();
        return memberList;
    }
    @PostMapping("/public/members")
    public ResponseEntity<?> apiinput(@RequestBody MemberDto memberdto){
        try{
            MemberResponseDto member = memberService.inputMember(memberdto);
            return ResponseEntity.status(HttpStatus.CREATED).body(member);
        } catch (UserAlreadyExistsException e){
            // 이미 존재하는 이메일로 회원가입을 시도하는 경우
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용중인 이메일입니다");
        } catch (InvalidUserDataException e) {
            // 입력 데이터가 유효하지 않은 경우
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자가 포함되어야 합니다.");
        } catch (Exception e) {
            // 일반적인 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @PostMapping("/public/login")
    public ResponseEntity<?> logintoken(@RequestBody MemberDto memberDto){
        // 서비스 계층을 호출하여 로그인 인증 처리
        String token = memberService.authenticateMember(memberDto.getEmail(), memberDto.getPassword());
        // 인증 성공: 토큰 반환
        if (token != null) {
            return ResponseEntity.ok(new AuthResponse(token)); // 토큰 반환
        } else {
            // 인증 실패: Unauthorized (401)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/user")
    public ResponseEntity<MemberResponseDto> getUserInfo(HttpServletRequest request) {

        // preHandle에서 설정한 이메일 가져오기
        String email = (String) request.getAttribute("email");

        MemberResponseDto member = memberService.selectUser(email);

        if (member==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(member);
    }

    @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
    public void handleOptionsRequest() {
        log.info("OPTIONS 요청이 들어왔습니다.");
        // OPTIONS 요청에 대한 응답을 처리
    }

    @PatchMapping("/user/edit")
    public  ResponseEntity<?> updateUser(HttpServletRequest request,
                                         @RequestBody MemberDto memberTo){
        String email = (String) request.getAttribute("email");

        MemberResponseDto member = memberService.updateUser(email,memberTo);
        log.info(member.toString());
        if (member==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(member);
    }
    @PreAuthorize("hasRole('ROLE_User')")
    @DeleteMapping("/user/delete")
    public ResponseEntity<?> deleteUser(HttpServletRequest request){
        String email = (String) request.getAttribute("email");

        MemberResponseDto member = memberService.deleteMember(email);
        if (member != null) {
            // 사용자 삭제 성공 시 200 OK 반환
            return ResponseEntity.ok("이메일 " + email + "의 사용자가 삭제되었습니다.");
        } else {
            // 사용자가 존재하지 않으면 404 NOT FOUND 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("이메일 " + email + "에 해당하는 사용자가 존재하지 않습니다.");
        }

    }

}
