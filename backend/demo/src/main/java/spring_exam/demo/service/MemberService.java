package spring_exam.demo.service;

import spring_exam.demo.dto.MemberDto;
import spring_exam.demo.dto.MemberResponseDto;
import spring_exam.demo.entity.Member;

import java.util.List;

public interface MemberService {
    public List<MemberResponseDto> selectAllMember();

    public MemberResponseDto inputMember(MemberDto memberdto);

    public MemberResponseDto deleteMember(String email);

    public String authenticateMember(String email, String password);

    public MemberResponseDto selectUser(String email);

    public MemberResponseDto updateUser(String email, MemberDto memberTo);
}
