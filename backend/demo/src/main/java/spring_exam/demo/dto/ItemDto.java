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

}
