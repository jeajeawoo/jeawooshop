package spring_exam.demo.util;


import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import spring_exam.demo.dto.ItemDto;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RequiredArgsConstructor
@Component
public class ImgUtil {

    @Value("${file.upload-dir}")
    private String uploadDir; // 파일 저장 경로

    /**
     * 이미지 저장 처리만 수행하고, 이미지 정보 객체 반환
     */
    public ImageInfo uploadItemImage(ItemDto itemDto) throws IOException {
        MultipartFile file = itemDto.getFile();

        // 1. 유효성 검사
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("업로드할 파일이 없습니다.");
        }

        String originalFilename = file.getOriginalFilename();
        String lowerCaseFileName = originalFilename != null ? originalFilename.toLowerCase() : "";
        if (!lowerCaseFileName.matches(".*\\.(jpg|jpeg|png|gif)$")) {
            throw new IllegalArgumentException("지원하지 않는 파일 형식입니다.");
        }

        long maxFileSize = 5 * 1024 * 1024; // 5MB
        if (file.getSize() > maxFileSize) {
            throw new IllegalArgumentException("파일 크기는 5MB를 초과할 수 없습니다.");
        }

        // 2. 디렉토리 없으면 생성
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 3. 저장 경로 + 유니크 파일명
        String fileName = System.currentTimeMillis() + "_" + originalFilename;
        Path filePath = uploadPath.resolve(fileName);

        // 4. 실제 파일 저장
        file.transferTo(filePath.toFile());

        // 5. 이미지 정보 반환
        ImageInfo info = new ImageInfo();
        info.setOriginalImgName(originalFilename);
        info.setStoredFilePath(fileName);
        info.setFileSize(file.getSize());
        return info;
    }

    /**
     * 저장된 이미지 정보를 담는 내부 클래스
     */
    @Data
    public static class ImageInfo {
        private String originalImgName;
        private String storedFilePath;
        private Long fileSize;
    }

}
