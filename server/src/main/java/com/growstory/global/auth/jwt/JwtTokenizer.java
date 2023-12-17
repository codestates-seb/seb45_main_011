package com.growstory.global.auth.jwt;

import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.boot.json.JsonParser;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Getter
@Slf4j
@Component
public class JwtTokenizer {
    @Value("${jwt.key.secret}")
    private String secretKey;

    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;


    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims,   // 인증 사용자 관련 정보
                                      String subject,               // JWT에 대한 제목
                                      Date expiration,              // 만료 기한
                                      String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims) // 인증된 사용자 정보
                .setSubject(subject) // JWT 제목
                .setIssuedAt(Calendar.getInstance().getTime()) // 발행 일자
                .setExpiration(expiration) // 만료 일시
                .signWith(key) //서명을 위한 키
                .compact();
    }

    // refreshToken 생성에는 사용자 인증 정보 claims가 빠짐
    public String generateRefreshToken(String subject,
                                       Date expiration,
                                       String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        // 인코딩된 키를 디코딩
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key) // 서명 검증을 위한 key 지정
                .build()
                .parseClaimsJws(jws); // 토큰의 유효성 검사

//        System.out.println("after:" + claims.getBody().getExpiration());

        return claims;
    }

    //Signature를 확인하는 메서드
    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key) // 서명 검증을 위한 key 지정
                .build()
                .parseClaimsJws(jws); // 토큰의 유효성 검사
    }

    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

    public Map<String, Object> verifyJws(String token) {
        //request의 header에서 JWT 얻기
        // String jws = request.getHeader("Authorization").replace("Bearer ", "");
        //서버에 저장된 비밀키 호출
        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());
        //Claims (JWT의 Payload, 사용자 정보인 username, roles 얻기) < - 내부적으로 서명(Signature) 검증에 성공한 상태
        Map<String, Object> claims = getClaims(token, base64EncodedSecretKey).getBody();

        return claims;
    }

    // 새로운 액세스 토큰 생성 (리프레시 토큰의 만료 시간 검증)
    public String generateNewAccessTokenUsingRefreshToken(String accessToken, String refreshToken) {
        if (!isRefreshTokenExpired(refreshToken)) { //리프레시 토큰이 유효할 때
            // 리프레시 토큰의 만료 시간을 활용하여 새로운 액세스 토큰 생성
            return recreateAccessTokenWithClaims(recreateClaimsFrom(accessToken));
        } else {
            // 리프레시 토큰이 만료시 예외 반환
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_UNAUTHORIZED);
        }
    }


    // 새로운 액세스 토큰 생성 (기존 claims 활용)
    private String recreateAccessTokenWithClaims(Map<String, Object> claims) {
        String subject = (String) claims.get("username");
        Date expiration = getTokenExpiration(getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());
        return generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    private Map<String, Object> recreateClaimsFrom(String accessToken) {
        JsonParser jsonParser = new BasicJsonParser();
        String accessTokenPayload = new String(Decoders.BASE64URL.decode(accessToken.split("\\.")[1]));
        return jsonParser.parseMap(new String(accessTokenPayload));
    }

    // 리프레시 토큰이 만료되었는지 확인
    public boolean isRefreshTokenExpired(String refreshToken) {
        Date expirationDate = null;
        try {
            expirationDate = extractClaims(refreshToken).getExpiration();
        } catch (ExpiredJwtException e) {
            log.info("## 만료된 리프레쉬 토큰입니다.");
            throw new BusinessLogicException(ExceptionCode.ACCOUNT_UNAUTHORIZED);
        }
        return expirationDate.before(new Date());
    }

    // JWT Claims(본문) 추출
    private Claims extractClaims(String token) {
        return Jwts.parser().setSigningKey(encodeBase64SecretKey(secretKey))
                .parseClaimsJws(token).getBody();
    }
}
