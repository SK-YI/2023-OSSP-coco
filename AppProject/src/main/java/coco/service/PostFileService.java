package coco.service;

import coco.data.dto.PostFileDto;
import coco.data.dto.PostFileResponseDto;
import coco.data.entity.Post;
import coco.data.entity.PostFile;
import coco.data.repository.PostFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostFileService {
    @Autowired
    private final PostFileRepository postFileRepository;

    /**
     * 이미지 개별 조회
     */
    @Transactional(readOnly = true)
    public PostFileDto findByFileId(int id){

        PostFile postFile = postFileRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("해당 파일이 존재하지 않습니다."));

        PostFileDto postFileDto = PostFileDto.builder()
                .origFileName(postFile.getOrigFileName())
                .filePath(postFile.getFilePath())
                .fileSize(postFile.getFileSize())
                .build();

        return postFileDto;
    }
    /**
     * 이미지 전체 조회
     */
    @Transactional(readOnly = true)
    public List<PostFileResponseDto> findAllByBoard(int postId){

        List<PostFile> postFileList = postFileRepository.findAllByPostId(postId);

        return postFileList.stream()
                .map(PostFileResponseDto::new)
                .collect(Collectors.toList());
    }

//    @Transactional(readOnly = true)
//    public List<PostFile> findAllByBoard2(int postId){
//
//        List<PostFile> postFileList = postFileRepository.findAllByPostId(postId);
//
//        return postFileList.stream()
//                .map(PostFile::new)
//                .collect(Collectors.toList());
//    }


    @Transactional
    public String deletePostFile(int postFileId){
            postFileRepository.deleteById(postFileId);
            return "success";

    }


}
