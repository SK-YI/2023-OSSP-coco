package coco.controller;

import coco.data.dto.*;
import coco.data.entity.PostFile;
import coco.service.CommunityService;
import coco.service.PostFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
public class CommunityController {

    @Autowired
    private CommunityService communityService;
    @Autowired
    private PostFileService postFileService;
    private final int defaultPageSize = 4; //수정가능

    //커뮤니티 메인페이지 - 완료. 썸네일 fileId만 보여줘도 되는지, 이미지를 보여줘야하는지.
    @GetMapping("/community")
    @ResponseBody
    public ResponseEntity<Page<PostResponseDto>> getPostList(@PageableDefault Pageable pageable) throws Exception{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<PostResponseDto> postList = communityService.getPostList(modifiedPageable, authentication);
        return ResponseEntity.ok(postList);
    }

//    //게시글 생성 - 이미지 추가하는 ver
//    @PostMapping("/community")
//    public ResponseEntity<PostDto> createPost(@RequestPart(value = "postRequestDto") PostRequestDto postRequestDto,  @RequestParam(value="files", required=false) List<MultipartFile> files) throws Exception {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
//            return ResponseEntity.ok(communityService.createPost(postRequestDto,authentication,files));
//        }
//        return ResponseEntity.ok(null);
//    }

    //제목과 내용도 form data로 받는 버전
    @PostMapping("/community")
    public ResponseEntity<PostDto> createPost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            // 다른 필드들도 필요에 따라 추가해주세요
            @RequestParam(value = "files", required = false) List<MultipartFile> files
    ) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !"anonymousUser".equals(authentication.getPrincipal())) {
            // PostRequestDto 객체를 생성하여 필드 값들을 설정
            PostRequestDto postRequestDto = new PostRequestDto();
            postRequestDto.setPostRequestDto(title,content);
            // 다른 필드들도 설정해주세요

            return ResponseEntity.ok(communityService.createPost(postRequestDto, authentication, files));
        }
        return ResponseEntity.ok(null);
    }


    //게시글 생성 - 이미지 추가안하는 원래 ver
//    @PostMapping("/community")
//    public ResponseEntity<PostDto> createPost(@RequestBody PostRequestDto postRequestDto){
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
//            return ResponseEntity.ok(communityService.createPost(postRequestDto,authentication));
//        }
//        return ResponseEntity.ok(null);
//    }

    //게시글 삭제 - 완료
    @DeleteMapping("/community/{postId}")
    public ResponseEntity<Boolean> deletePost(@PathVariable int postId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(communityService.deletePost(postId,authentication));
        }
        return ResponseEntity.ok(false);
    }
    /**
     * 게시글도 수정 : 이미지도 수정 가능한 버전, 작업중
     */
//    @PutMapping("/community/{postId}")
//        public ResponseEntity<PostDto> editPost(@PathVariable int postId,@RequestPart(value = "postRequestDto") PostRequestDto postRequestDto,  @RequestParam(value="files", required=false) List<MultipartFile> files) throws Exception {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
//            // DB에 저장되어있는 파일 불러오기
//            List<PostFile> dbPostFileList = postFileService.findAllByBoard2(postId);
//            // 전달되어온 파일들
//            //로직 바꾸기
//            List<MultipartFile> multipartList = files;
//            //List<MultipartFile> multipartList = boardFileVO.getFiles();
//
//            // 새롭게 전달되어온 파일들의 목록을 저장할 List 선언
//            List<MultipartFile> addFileList = new ArrayList<>();
//
//            if (CollectionUtils.isEmpty(dbPostFileList)) { // DB에 아예 존재 x
//                if (!CollectionUtils.isEmpty(multipartList)) { // 전달되어온 파일이 하나라도 존재
//                    for (MultipartFile multipartFile : multipartList)
//                        addFileList.add(multipartFile);    // 저장할 파일 목록에 추가
//                }
//            } else {  // DB에 한 장 이상 존재
//                if (CollectionUtils.isEmpty(multipartList)) { // 전달되어온 파일 아예 x
//                    // 파일 삭제
//                    for (PostFile dbPostFile : dbPostFileList)
//                        postFileService.deletePostFile(dbPostFile.getId());
//                } else {  // 전달되어온 파일 한 장 이상 존재
//
//                    // DB에 저장되어있는 파일 원본명 목록
//                    List<String> dbOriginNameList = new ArrayList<>();
//
//                    // DB의 파일 원본명 추출
//                    for (PostFile dbPostFile : dbPostFileList) {
//                        // file id로 DB에 저장된 파일 정보 얻어오기
//                        PostFileDto dbPostFileDto = postFileService.findByFileId(dbPostFile.getId());
//                        // DB의 파일 원본명 얻어오기
//                        String dbOrigFileName = dbPostFileDto.getOrigFileName();
//
//                        if (!multipartList.contains(dbOrigFileName))  // 서버에 저장된 파일들 중 전달되어온 파일이 존재하지 않는다면
//                            postFileService.deletePostFile(dbPostFile.getId());  // 파일 삭제
//                        else  // 그것도 아니라면
//                            dbOriginNameList.add(dbOrigFileName);    // DB에 저장할 파일 목록에 추가
//                    }
//
//                    for (MultipartFile multipartFile : multipartList) { // 전달되어온 파일 하나씩 검사
//                        // 파일의 원본명 얻어오기
//                        String multipartOrigName = multipartFile.getOriginalFilename();
//                        if (!dbOriginNameList.contains(multipartOrigName)) {   // DB에 없는 파일이면
//                            addFileList.add(multipartFile); // DB에 저장할 파일 목록에 추가
//                        }
//                    }
//
//                    return ResponseEntity.ok(communityService.editPost(postId, postRequestDto,files));
//
//                }
//
//            }
//        }
//        return ResponseEntity.notFound().build();
//    }



    //게시글 수정 - 이미지 추가 가능 전 version
    @PutMapping("/community/{postId}")
    public ResponseEntity<PostDto> editPost(@PathVariable int postId,@RequestBody PostRequestDto postRequestDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return ResponseEntity.ok(communityService.editPost(postId,postRequestDto));
        }
        return ResponseEntity.notFound().build();
    }

    //게시글 좋아요 - 완료2
    @PutMapping("/community/{postId}/like")
    public ResponseEntity<LikedResponseDto> likePost(@PathVariable int postId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return ResponseEntity.ok(communityService.likePost(postId,authentication));
        }
        return ResponseEntity.notFound().build();
    }

    //게시글 제목으로 찾기 - 완료2
    @GetMapping("/community/title/{post_title}")
    @ResponseBody
    public ResponseEntity<Page<PostResponseDto>> getPostListByTitle(@PageableDefault Pageable pageable,@PathVariable String post_title){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<PostResponseDto> postList=communityService.getPostListByTitle(post_title,modifiedPageable,authentication);
        return ResponseEntity.ok(postList);
    }
        
    

}










