package coco.data.dto;
import coco.data.entity.Post;
import coco.data.entity.PostFile;
import coco.data.entity.PostFile;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.SimpleDateFormat;

@Getter
@Setter
@NoArgsConstructor
public class PostFileDto {
    private int id;
    private int postId;
    private String origFileName;
    private String filePath;  // 파일 저장 경로
    private Long fileSize;

    //user?
    public PostFileDto(PostFile postFile){
        id=postFile.getId();
        postId=postFile.getPost().getId();
        origFileName= postFile.getOrigFileName();
        filePath= postFile.getFilePath();
        fileSize= postFile.getFileSize();
    }
    //필요하다면 userNumber 도 parm으로
    public PostFileDto(PostFile postFile,int postId){
        id=postFile.getId();
        this.postId=postId;
    }

    @Builder
    public PostFileDto(String origFileName, String filePath, Long fileSize){
        this.origFileName = origFileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }
}

