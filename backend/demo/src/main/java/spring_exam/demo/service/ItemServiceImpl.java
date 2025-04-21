package spring_exam.demo.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import spring_exam.demo.dto.ItemDto;
import spring_exam.demo.dto.ItemResponseDto;
import spring_exam.demo.entity.Item;
import spring_exam.demo.mapstruct.ItemMapStruct;
import spring_exam.demo.repository.ItemRepository;
import spring_exam.demo.util.ImgUtil;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final ImgUtil imgUtil;
    private final ItemMapStruct itemMapStruct;

    // 전체 아이템 리스트
    public List<ItemResponseDto> getItem() {
        List<Item> items = itemRepository.findAll();
        return itemMapStruct.toDtoList(items);
    }

    // 단일 아이템 조회
    @Transactional(readOnly = true)
    public ItemResponseDto getItemById(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("아이템을 찾을 수 없습니다."));

        return itemMapStruct.toDto(item);
    }

    // 아이템 등록
    @Override
    @Transactional
    public ItemResponseDto insertItem(ItemDto itemDto) throws IOException {
        // 이미지 업로드 → 파일 저장하고 경로, 이름 반환
        ImgUtil.ImageInfo imageInfo = imgUtil.uploadItemImage(itemDto);

        Item item = itemMapStruct.toEntity(itemDto);
        item.setOriginalImgName(imageInfo.getOriginalImgName());
        item.setStoredFilePath(imageInfo.getStoredFilePath());
        item.setFileSize(imageInfo.getFileSize());
        itemRepository.save(item);

        return itemMapStruct.toDto(item);
    }

    // 아이템 수정 (이미지 포함)
    @Transactional
    public ItemResponseDto updateItemWithImage(Long itemId, ItemDto itemDto) throws IOException {
        Item existingItem = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("아이템을 찾을 수 없습니다."));

        // ItemDto -> Item 엔티티 변환 (이미지 제외)
        Item updatedItem = itemMapStruct.toEntity(itemDto);

        // 새 이미지가 있다면 업로드하여 정보 세팅
        ImgUtil.ImageInfo imageInfo = imgUtil.uploadItemImage(itemDto);
        updatedItem.setOriginalImgName(imageInfo.getOriginalImgName());
        updatedItem.setStoredFilePath(imageInfo.getStoredFilePath());
        updatedItem.setFileSize(imageInfo.getFileSize());

        // 기존 아이템에서 값을 업데이트
        existingItem.setTitle(updatedItem.getTitle());
        existingItem.setContent(updatedItem.getContent());
        existingItem.setPrice(updatedItem.getPrice());
        existingItem.setOriginalImgName(updatedItem.getOriginalImgName());
        existingItem.setStoredFilePath(updatedItem.getStoredFilePath());
        existingItem.setFileSize(updatedItem.getFileSize());

        Item savedItem = itemRepository.save(existingItem);

        return itemMapStruct.toDto(savedItem);
    }

    // 아이템 삭제
    @Transactional
    public void deleteItem(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("아이템을 찾을 수 없습니다."));

        itemRepository.delete(item);
    }
}

