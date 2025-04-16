package spring_exam.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import spring_exam.demo.entity.Item;


import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemResponseDto {
    private Long id;
    private String title;
    private String content;
    private int price;
    private String originalImgName;
    private String storedFilePath;


    public ItemResponseDto(Item item) {
        this.id = item.getItemId();
        this.title = item.getTitle();
        this.content = item.getContent();
        this.price = item.getPrice();
        this.originalImgName = item.getOriginalImgName();
        this.storedFilePath = item.getStoredFilePath();

    }
}
