package com.growstory.global.auth.filter;

import com.growstory.global.auth.jwt.JwtTokenizer;
import com.growstory.global.auth.utils.CustomAuthorityUtils;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import com.growstory.global.response.ErrorResponder;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.boot.json.JsonParser;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Override // 다음 필터 사이에 동작할 로직으로 JWT 검증 및 인증컨텍스트 저장을 수행한다.
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // 토큰 재발급의 2가지 방법
        // 1. 토큰이 만료되었을 때 응답 헤더로 예외를 추가하고
        // 프런트에서 다시 로그인 or 토큰 재발급 api 요청 후
        // 새로 발급한 토큰으로 이전 실제 요청을 하느냐

        // 2. 토큰이 만료되었을 때 토큰을 재발급한 후
        // 응답 헤더로 다시 새 토큰을 리턴해주고
        // 프런트에서 응답을 받았을 때 응답 헤더에 토큰이 있으면
        // 다시 저장하는 로직으로 처리하느냐
        JsonParser jsonParser = new BasicJsonParser();

        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
        String refreshToken = request.getHeader("Refresh");

        String accessTokenPayload = new String(Decoders.BASE64URL.decode(accessToken.split("\\.")[1]));
        Map<String, Object> accessTokenClaims = jsonParser.parseMap(new String(accessTokenPayload));
//        accessTokenClaims.put("accountId", accessTokenClaims.get("accountId").toString());

        String refreshTokenPayload = new String(Decoders.BASE64URL.decode(refreshToken.split("\\.")[1]));
        Map<String, Object> refreshTokenClaims = jsonParser.parseMap(new String(refreshTokenPayload));

        // 이걸 저장할 때 설정
        Date accessTokenExpiration = new Date((Long) accessTokenClaims.get("exp") * 1000L);
        Date refreshTokenExpiration = new Date((Long) refreshTokenClaims.get("exp") * 1000L);
//        System.out.println("before:" + accessTokenExpiration);
//        System.out.println("before:" + refreshTokenExpiration);
        Date now = new Date();

        // accessToken 만료시간이 지금보다 이전이면(accessToken 만료 O), refreshToken 만료시간이 지금보다 이후라면(refreshToken 만료 X)
        if (accessTokenExpiration.before(now) && refreshTokenExpiration.after(now)) {
            accessToken = recreateAccessToken(accessTokenClaims, refreshTokenExpiration);
        }

        // accessToken 만료시간이 지금보다 이전이면(accessToken 만료 O), refreshToken 만료시간이 지금보다 이전이면(refreshToken 만료 O)
        if (accessTokenExpiration.before(now) && refreshTokenExpiration.before(now)) {
            accessToken = recreateAccessToken(accessTokenClaims, jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes()));
            refreshToken =  recreateRefreshToken(refreshTokenClaims);
        }

        try {
            Map<String,Object> recreatedAccessTokenClaims = verifyJws(accessToken); // JWT 검증
            verifyJws(refreshToken);
            setAuthenticationToContext(recreatedAccessTokenClaims);
        //jwt 검증에 실패할 경우 발생하는 예외를 HttpServletRequest의 속성(Attribute)으로 추가
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        // authorization이 null이거나 Bearer로 시작하지 않으면 이 필터를 실행하지 않는다.(shouldNotFilter)
        return authorization == null || !authorization.startsWith("Bearer");
    }

    // JWT 검증
    private Map<String, Object> verifyJws(String token) {
        //request의 header에서 JWT 얻기
        // String jws = request.getHeader("Authorization").replace("Bearer ", "");
        //서버에 저장된 비밀키 호출
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        //Claims (JWT의 Payload, 사용자 정보인 username, roles 얻기) < - 내부적으로 서명(Signature) 검증에 성공한 상태
        Map<String, Object> claims = jwtTokenizer.getClaims(token, base64EncodedSecretKey).getBody();

        return claims;
    }

    // SecurityContextHolder에 인증 정보 저장
    private void setAuthenticationToContext(Map<String, Object> claims) {
        //authorityUtils의 메서드로 claims에 담긴 roles를 기반으로한 List<GrantedAuthority> 만들기
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        // 인증 토큰을 만들어 authentication으로 어퍼 캐스팅하여 SecurityContextHolder에 저장한다.
        Authentication authentication = new UsernamePasswordAuthenticationToken(claims, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private String recreateAccessToken(Map<String, Object> accessTokenClaims, Date refreshTokenExpiration) {
        accessTokenClaims.remove("iat");
        accessTokenClaims.remove("exp");

        String subject = (String) accessTokenClaims.get("username");
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        // 만약 갱신된 accessToken 만료시간이 refreshToken보다 이후라면
        if (expiration.after(refreshTokenExpiration)) expiration = refreshTokenExpiration;

        return jwtTokenizer.generateAccessToken(accessTokenClaims, subject, expiration, base64EncodedSecretKey);
    }

    private String recreateRefreshToken(Map<String, Object> refreshTokenClaims) {
        refreshTokenClaims.remove("iat");
        refreshTokenClaims.remove("exp");

        String subject = (String) refreshTokenClaims.get("username");
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }
}
