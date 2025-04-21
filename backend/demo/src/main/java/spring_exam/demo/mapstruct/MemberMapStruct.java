package spring_exam.demo.mapstruct;

import org.mapstruct.*;

import spring_exam.demo.dto.MemberResponseDto;
import spring_exam.demo.entity.Member;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapStruct {

    MemberResponseDto toResponseDto(Member member);

    List<MemberResponseDto> toResponseDtoList(List<Member> members);
}
