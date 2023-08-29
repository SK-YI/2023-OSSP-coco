package coco.config.jwt;

public interface JwtProperties {
    String SECRET = "cocoproject"; // 우리 서버만 알고 있는 비밀값
    int EXPIRATION_TIME = 10;
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
