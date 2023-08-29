//package coco.service;
//
//import coco.data.dto.TokenDto;
//import coco.data.dto.UserJoinDto;
//import coco.data.repository.TokenRepository;
//import coco.data.type.UserRole;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//public class TokenService {
//
//    @Autowired
//    private TokenRepository refreshTokenRepository;
//
//    @Transactional
//    public void save(TokenDto TokenDto) {
//        refreshTokenRepository.save(TokenDto.toEntity(TokenDto.getAccessToken()));
//    }
//
//}
