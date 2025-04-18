package spring_exam.demo.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spring_exam.demo.dto.BuyItemDto;
import spring_exam.demo.dto.MemberResponseDto;
import spring_exam.demo.entity.Member;
import spring_exam.demo.service.BuyItemService;
import spring_exam.demo.service.MemberService;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class BuyItemController {

    private final BuyItemService buyItemService;
    private final MemberService memberService;

    @GetMapping("/user/buy_items")
    public ResponseEntity<List<BuyItemDto>> listmemeberbuyitem(HttpServletRequest request){

        String email = (String) request.getAttribute("email");
        MemberResponseDto member = memberService.selectUser(email);
        List<BuyItemDto> buyItemDtoList = buyItemService.selectMemberBuyItem(member.getId());
        return ResponseEntity.status(HttpStatus.OK).body(buyItemDtoList);
    }
    @PostMapping("/user/buy_items")
    public ResponseEntity<List<BuyItemDto>> insertmemberbuyitem(HttpServletRequest request,
                                                          @RequestBody List<BuyItemDto> buyItemDto){
        String email = (String) request.getAttribute("email");
        MemberResponseDto member = memberService.selectUser(email);
        List<BuyItemDto> insertedMemberItem = buyItemService.insertMemberItem(member.getId(), buyItemDto);
        return ResponseEntity.status(HttpStatus.OK).body(insertedMemberItem);
    }

    @DeleteMapping("/user/buy_items/{id}")
    public ResponseEntity<BuyItemDto> deletememberbuyitem(@PathVariable("id") Long id){
        BuyItemDto deletedbuyitem = buyItemService.deleteMemberBuyItem(id);
        return ResponseEntity.status(HttpStatus.OK).body(deletedbuyitem);
    }
}
