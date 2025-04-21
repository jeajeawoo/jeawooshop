package spring_exam.demo.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import spring_exam.demo.dto.BuyItemDto;
import spring_exam.demo.entity.BuyItem;
import spring_exam.demo.entity.Member;
import spring_exam.demo.mapstruct.BuyItemMapStruct;
import spring_exam.demo.repository.BuyItemRepository;
import spring_exam.demo.repository.MemberRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BuyItemServiceImpl implements BuyItemService{

    private final BuyItemRepository buyItemRepository;
    private final MemberRepository memberRepository;
    private final BuyItemMapStruct buyItemMapStruct;

    @Override
    public List<BuyItemDto> selectMemberBuyItem(Long memberid) {
        List<BuyItem> buyItemList = buyItemRepository.findByMemberId(memberid);
        return buyItemMapStruct.toDtoList(buyItemList);
    }

    @Override
    @Transactional
    public List<BuyItemDto> insertMemberItem(Long memberid, List<BuyItemDto> buyItemDto) {
        // 외래키 이용 원글 확인
        Member member = memberRepository.findById(memberid)
                .orElseThrow(() -> new IllegalArgumentException("원글 조회 실패"));

        // DTO를 엔티티로 변환 (List<BuyItemDto> -> List<BuyItem>)
        List<BuyItem> buyItems = buyItemMapStruct.toEntityList(buyItemDto,member);
        // 테이블에 한꺼번에 insert
        List<BuyItem> savedItems = buyItemRepository.saveAll(buyItems);

        // 엔티티를 DTO로 변환해서 리턴
        return buyItemMapStruct.toDtoList(savedItems);
    }

    @Override
    @Transactional
    public BuyItemDto deleteMemberBuyItem(Long id) {
        BuyItem buyItem = buyItemRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("삭제 실패 : id가 존재하지 않음"));
        buyItemRepository.delete(buyItem);
        return buyItemMapStruct.toDto(buyItem);
    }

}
