package spring_exam.demo.mapstruct;

import org.mapstruct.*;
import spring_exam.demo.dto.BuyItemDto;
import spring_exam.demo.entity.BuyItem;
import spring_exam.demo.entity.Member;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BuyItemMapStruct {

    @Mapping(source = "member.id", target = "memberid")
    BuyItemDto toDto(BuyItem entity);

    List<BuyItemDto> toDtoList(List<BuyItem> entityList);

    @Mapping(target = "member", ignore = true)
    BuyItem toEntity(BuyItemDto dto, @Context Member member);

    @AfterMapping
    default void setMember(@MappingTarget BuyItem buyItem, @Context Member member) {
        buyItem.setMember(member);
    }
    List<BuyItem> toEntityList(List<BuyItemDto> dtos, @Context Member member);
}
