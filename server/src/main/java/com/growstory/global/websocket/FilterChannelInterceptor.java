package com.growstory.global.websocket;

import com.growstory.global.auth.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Map;

@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@Slf4j
@RequiredArgsConstructor
@Component
public class FilterChannelInterceptor implements ChannelInterceptor {
    private final JwtTokenizer jwtTokenizer;
//    private final JwtVerificationFilter jwtVerificationFilter;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        log.info("##" + message);
        log.info("##" + channel);
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        log.info("##" + headerAccessor);
        if(StompCommand.CONNECT.equals(headerAccessor.getCommand()) || StompCommand.SEND.equals(headerAccessor.getCommand())
                || StompCommand.SUBSCRIBE.equals(headerAccessor.getCommand())) {
            String accessToken = headerAccessor.getNativeHeader("Authorization").toString();
            String refreshToken = headerAccessor.getNativeHeader("Refresh").toString();
            if(StringUtils.hasText(accessToken) && accessToken.startsWith("Bearer")) {
                accessToken = accessToken.replace("Bearer ", "");
            }
            try {
                verifyJws(accessToken);
                verifyJws(refreshToken);
            } catch (Exception e) {
                e.printStackTrace();
//                jwtVerificationFilter.doFilter();
            }
            return message;
        }
        return message;
    }

    private Map<String, Object> verifyJws(String token) {
        //request의 header에서 JWT 얻기
        // String jws = request.getHeader("Authorization").replace("Bearer ", "");
        //서버에 저장된 비밀키 호출
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        //Claims (JWT의 Payload, 사용자 정보인 username, roles 얻기) < - 내부적으로 서명(Signature) 검증에 성공한 상태
        Map<String, Object> claims = jwtTokenizer.getClaims(token, base64EncodedSecretKey).getBody();

        return claims;
    }


}
