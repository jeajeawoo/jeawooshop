package spring_exam.demo.mapstruct;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import spring_exam.demo.dto.ItemDto;
import spring_exam.demo.dto.ItemResponseDto;
import spring_exam.demo.entity.Item;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ItemMapStruct {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "originalImgName", ignore = true)
    @Mapping(target = "storedFilePath", ignore = true)
    @Mapping(target = "fileSize", ignore = true)
    Item toEntity(ItemDto dto);

    ItemResponseDto toDto(Item item);

    List<ItemResponseDto> toDtoList(List<Item> items);
}
