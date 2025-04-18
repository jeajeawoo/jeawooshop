package spring_exam.demo.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import spring_exam.demo.dto.ItemDto;
import spring_exam.demo.dto.ItemResponseDto;
import spring_exam.demo.entity.Item;
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

    // 전체 아이템 리스트
    public List<ItemResponseDto> getItem() {
        List<Item> items = itemRepository.findAll();
        return items.stream()
                .map(ItemResponseDto::new)
                .collect(Collectors.toList());
    }

    // 단일 아이템 조회
    @Transactional(readOnly = true)
    public ItemResponseDto getItemById(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("아이템을 찾을 수 없습니다."));
        ItemResponseDto itemResponseDto = new ItemResponseDto(item);

        return itemResponseDto;
    }

    // 아이템 등록
    @Override
    @Transactional
    public ItemResponseDto insertItem(ItemDto itemDto) throws IOException {
        // 이미지 업로드 → 파일 저장하고 경로, 이름 반환
        ImgUtil.ImageInfo imageInfo = imgUtil.uploadItemImage(itemDto);

        Item item = itemDto.toItemEntity(imageInfo);
        item.setOriginalImgName(imageInfo.getOriginalImgName());
        item.setStoredFilePath(imageInfo.getStoredFilePath());
        item.setFileSize(imageInfo.getFileSize());
        itemRepository.save(item);
        ItemResponseDto itemResponseDto = new ItemResponseDto(item);
        return itemResponseDto;
    }

    // 아이템 수정 (이미지 포함)
    @Transactional
    public ItemResponseDto updateItemWithImage(Long itemId, ItemDto itemDto) throws IOException {
        Item existingItem = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("아이템을 찾을 수 없습니다."));

        existingItem.setTitle(itemDto.getTitle());
        existingItem.setContent(itemDto.getContent());
        existingItem.setPrice(itemDto.getPrice());

        // 새 이미지가 있다면 교체
        ImgUtil.ImageInfo imageInfo = imgUtil.uploadItemImage(itemDto);
        existingItem.setOriginalImgName(imageInfo.getOriginalImgName());
        existingItem.setStoredFilePath(imageInfo.getStoredFilePath());
        existingItem.setFileSize(imageInfo.getFileSize());
        ItemResponseDto itemResponseDto = new ItemResponseDto(existingItem);
        return itemResponseDto;
    }

    // 아이템 삭제
    @Transactional
    public void deleteItem(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("아이템을 찾을 수 없습니다."));

        // (선택) 이미지 파일도 실제로 삭제하고 싶다면 imgUtil에서 파일 삭제 처리 가능

        itemRepository.delete(item);
    }
}

