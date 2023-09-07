package coco.controller;

import coco.data.dto.PostFileDto;
import coco.data.entity.PostFile;
import coco.service.CommunityService;
import coco.service.PostFileService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@RequiredArgsConstructor
@RestController
public class PostFileController {
    @Autowired
    private PostFileService postFileService;

    /**
     * 썸네일용 이미지 조회
     */
    @CrossOrigin
    @GetMapping(
            value = "/thumbnail/{id}",
            // 출력하고자 하는 데이터 포맷 정의
            produces = {MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE}
    )
    public ResponseEntity<byte[]> getThumbnail(@PathVariable int id) throws IOException {

        // 이미지가 저장된 절대 경로 추출
        String absolutePath =
                new File("").getAbsolutePath() + File.separator + File.separator;
        String path;


        if(id != 0) {  // 전달되어 온 이미지가 기본 썸네일이 아닐 경우
            PostFileDto postFileDto = postFileService.findByFileId(id);
            String filePath = postFileDto.getFilePath();

            // 파일 경로를 운영체제에 맞게 수정
            String modifiedFilePath;
            if (absolutePath.contains("/")) {
                modifiedFilePath = filePath.replace("\\", "/");
            } else {
                modifiedFilePath = filePath.replace("/", "\\");
            }

            path = modifiedFilePath;


            //path = postFileDto.getFilePath();
        }
        else {  // 전달되어 온 이미지가 기본 썸네일일 경우
            path = "images" + File.separator + "thumbnail" + File.separator + "thumbnail.png";
        }

        // FileInputstream의 객체를 생성하여
        // 이미지가 저장된 경로를 byte[] 형태의 값으로 encoding
        InputStream imageStream = new FileInputStream(absolutePath + path);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();

        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }

    /**
     * 이미지 개별 조회
     */
    @CrossOrigin
    @GetMapping(
            //image/{id}
            value = "/fileId/{id}",
            produces = {MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE}
    )
    public ResponseEntity<byte[]> getImage(@PathVariable int id) throws IOException {
        PostFileDto postFileDto = postFileService.findByFileId(id);
        String absolutePath
                = new File("").getAbsolutePath() + File.separator + File.separator;
        String filePath = postFileDto.getFilePath();

        String path;

        String modifiedFilePath;
        if (absolutePath.contains("/")) {
            modifiedFilePath = filePath.replace("\\", "/");
        } else {
            modifiedFilePath = filePath.replace("/", "\\");
        }

        path = modifiedFilePath;


        InputStream imageStream = new FileInputStream(absolutePath + path);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();

        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }


}
