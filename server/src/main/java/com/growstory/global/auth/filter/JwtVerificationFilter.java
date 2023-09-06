package com.growstory.global.auth.filter;

import com.growstory.global.auth.jwt.JwtTokenizer;
import com.growstory.global.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Override // 다음 필터 사이에 동작할 로직으로 JWT 검증 및 인증컨텍스트 저장을 수행한다.
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request); // JWT 검증
            setAuthenticationToContext(claims);
            //jwt 검증에 실패할 경우 발생하는 예외를 HttpServletRequest의 속성(Attribute)으로 추가
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        // authorization이 null이거나 Bearer로 시작하지 않으면 이 필터를 실행하지 않는다.(shouldNotFilter)
        return authorization == null || !authorization.startsWith("Bearer");
    }

    // JWT 검증
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        //request의 header에서 JWT 얻기
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        //서버에 저장된 비밀키 호출
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        //Claims (JWT의 Payload, 사용자 정보인 username, roles 얻기) < - 내부적으로 서명(Signature) 검증에 성공한 상태
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

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
}
