package spring_exam.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import spring_exam.demo.dto.BuyItemDto;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuyItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String itemTitle;
    private int quantity;
    private int price;

    @Temporal(value = TemporalType.DATE) // 년월일 date 타입 DB에 매핑
    @CreationTimestamp // 타임자동으로 생성해줌
    private Date orderdate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "memberid")
    private Member member;

    public static BuyItem dtoConvertEntity(BuyItemDto buyItemDto, Member member) {
        return new BuyItem(
                null,
                buyItemDto.getItemTitle(),
                buyItemDto.getQuantity(),
                buyItemDto.getPrice(),
                buyItemDto.getOrderdate(),
                member
        );
    }

    public static List<BuyItem> dtoConvertEntities(List<BuyItemDto> buyItemDtos, Member member) {
        return buyItemDtos.stream()
                .map(dto -> dtoConvertEntity(dto, member))
                .collect(Collectors.toList());
    }
}