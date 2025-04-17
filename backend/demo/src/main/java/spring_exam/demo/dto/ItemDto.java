package spring_exam.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import spring_exam.demo.entity.Item;
import spring_exam.demo.util.ImgUtil;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {

    private String title;
    private String content;
    private int price;

    private MultipartFile file; // 업로드할 이미지 파일

    // 이미지 정보를 포함해서 Item으로 변환하는 메서드
    public Item toItemEntity(ImgUtil.ImageInfo imageInfo) {
        Item item = new Item();
        item.setTitle(this.title);
        item.setContent(this.content);
        item.setPrice(this.price);

        // 이미지 정보 세팅
        if (imageInfo != null) {
            item.setOriginalImgName(imageInfo.getOriginalImgName());
            item.setStoredFilePath(imageInfo.getStoredFilePath());
            item.setFileSize(imageInfo.getFileSize());
        }

        return item;
    }
}
