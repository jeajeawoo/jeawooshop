package spring_exam.demo.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spring_exam.demo.dto.ItemDto;
import spring_exam.demo.dto.ItemResponseDto;
import spring_exam.demo.entity.Item;
import spring_exam.demo.service.ItemService;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("api")
public class ItemController {


    private final ItemService itemService;

    // 상품 목록 조회
    @GetMapping("/item")
    public ResponseEntity<?> getItems() {
        try{
            List<ItemResponseDto> items = itemService.getItem();
            return ResponseEntity.ok(items); // 200 OK 응답
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }

    }

    // 상품 하나 조회
    @GetMapping("/item/{itemId}")
    public ResponseEntity<ItemResponseDto> getItem(@PathVariable("itemId") Long itemId) {
        try {
            ItemResponseDto itemResponseDto = itemService.getItemById(itemId);
            return ResponseEntity.ok(itemResponseDto); // 200 OK 응답과 상품 데이터 반환
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/admin")
    public ResponseEntity<?> inputItemShop(@ModelAttribute ItemDto itemDto) {
        try {
            ItemResponseDto itemResponseDto = itemService.insertItem(itemDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(itemResponseDto);
        } catch (IOException e) {
            log.error("이미지 업로드 중 오류 발생", e); // 로그 찍기
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
        }
    }
    @PutMapping("/admin/{itemId}")
    public ResponseEntity<ItemResponseDto> updateItem(@PathVariable Long itemId, @ModelAttribute ItemDto itemDto) {
        try {
            ItemResponseDto itemResponseDto = itemService.updateItemWithImage(itemId, itemDto);
            return ResponseEntity.ok(itemResponseDto); // 200 OK 응답과 수정된 상품 반환
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 400 BAD REQUEST
        }
    }

    // 상품 삭제
    @DeleteMapping("/admin/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long itemId) {
        try {
            itemService.deleteItem(itemId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // 204 NO CONTENT 응답
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 NOT FOUND
        }
    }
}
