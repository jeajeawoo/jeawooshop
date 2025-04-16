package spring_exam.demo.service;

import spring_exam.demo.dto.MemberDto;
import spring_exam.demo.entity.Member;

import java.util.List;

public interface MemberService {
    public List<Member> selectAllMember();

    public Member selectMember(String email);

    public Member inputMember(MemberDto memberdto);

    public Member deleteMember(String email);

    public String authenticateMember(String email, String password);

    public Member selectUser(String email);

    public Member updateUser(String email, MemberDto memberTo);
}
