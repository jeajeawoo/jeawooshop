package spring_exam.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import spring_exam.demo.entity.BuyItem;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyItemDto {

    private Long id;
    private String itemTitle;
    private Date orderdate;
    private int quantity;
    private int price;
    private Long memberid;

    public static BuyItemDto entityConvertDto(BuyItem buyItem){

        return new BuyItemDto(buyItem.getId(),
                buyItem.getItemTitle(),
                buyItem.getOrderdate(),
                buyItem.getQuantity(),
                buyItem.getPrice(),
                buyItem.getMember().getId());
    }

}
