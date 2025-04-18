package spring_exam.demo.initializer;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import spring_exam.demo.dto.MemberDto;
import spring_exam.demo.entity.Item;
import spring_exam.demo.entity.Member;
import spring_exam.demo.repository.BuyItemRepository;
import spring_exam.demo.repository.ItemRepository;
import spring_exam.demo.repository.MemberRepository;
import spring_exam.demo.service.MemberService;

import java.util.List;

@RequiredArgsConstructor
@Component
public class DataInitializer {
    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final MemberService memberService;

    @PostConstruct
    public void initData() {
        // 데이터가 없을 경우만 초기 데이터 삽입
        if (memberRepository.count() == 0) {
            MemberDto memberDto = new MemberDto();
            //관리자
            memberDto.setEmail("admin@naver.com");
            memberDto.setUserName("이재우");
            memberDto.setPassword("Qlalf1234");
            memberDto.setAge(30);
            memberDto.setAddress("사천시 신향");
            memberDto.setPostcode("47060");
            memberDto.setDetailAddress("2층");
            memberDto.setExtraAddress("(신향길)");
            memberService.inputMember(memberDto);

            //일반 사용자
            MemberDto memberDto2 = new MemberDto();
            memberDto2.setEmail("user@naver.com");
            memberDto2.setUserName("홍길동");
            memberDto2.setPassword("Test1234");
            memberDto2.setAge(25);
            memberDto2.setAddress("서울시 강남구");
            memberDto2.setPostcode("06000");
            memberDto2.setDetailAddress("101호");
            memberDto2.setExtraAddress("(강남대로)");
            memberService.inputMember(memberDto2);

            itemRepository.saveAll(List.of(
                    createItem("White and Black", "Born in France", "shoes1.jpg", "1744619510183_shoes1.jpg", 87077L),
                    createItem("Red Knit", "Born in Seoul", "shoes2.jpg", "1744619526687_shoes2.jpg", 141690L),
                    createItem("Grey Yordan", "Born in the States", "shoes3.jpg", "1744619538853_shoes3.jpg", 92342L),
                    createItem("Grey Yordan", "Born in the States", "shoes4.jpg", "1744619545551_shoes4.jpg", 159378L),
                    createItem("Night Runner", "Lights on, speed up.", "shoes5.jpg", "1744619647676_shoes5.jpg", 117152L),
                    createItem("Desert Fade", "Walk like the wind.", "shoes6.jpg", "1744619660938_shoes6.jpg", 78785L),
                    createItem("Crimson Edge", "Cut through the crowd.", "shoes7.jpg", "1744619674388_shoes7.jpg", 101460L),
                    createItem("Echo Pulse", "Hear your style.", "shoes8.jpg", "1744619687304_shoes8.jpg", 144256L),
                    createItem("Grey Yordan", "Born in the States.", "shoes9.jpg", "1744619707769_shoes9.jpg", 118406L)
            ));
        }
    }
    private Item createItem(String title, String content, String originalImgName, String storedFilePath, Long fileSize) {
        Item item = new Item();
        item.setTitle(title);
        item.setContent(content);
        item.setOriginalImgName(originalImgName);
        item.setStoredFilePath(storedFilePath);
        item.setFileSize(fileSize);
        item.setPrice(120000);
        return item;
    }
}
