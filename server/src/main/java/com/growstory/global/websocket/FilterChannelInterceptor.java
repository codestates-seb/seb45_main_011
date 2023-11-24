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
        log.info("## 소켓 접속!!! ");
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        log.info("## StompHeaderAccessor: " + headerAccessor);
        //TODO: SEND 검증에서 제외
        if(StompCommand.CONNECT.equals(headerAccessor.getCommand()) || StompCommand.SEND.equals(headerAccessor.getCommand())
                || StompCommand.SUBSCRIBE.equals(headerAccessor.getCommand())) {
            if(StompCommand.SEND.equals(headerAccessor.getCommand())) {
                String payload = new String((byte[]) message.getPayload());
                log.info("Message Payload : "+ payload);
            }
//            headerAccessor.getNativeHeader("Authorization").toString();
//            String accessToken = headerAccessor.getNativeHeader("Authorization").toString();
//            accessToken = accessToken.substring(1, accessToken.length()-1);
//            log.info("## accessToken: " + accessToken);
//            String refreshToken = headerAccessor.getNativeHeader("refresh").toString();
//            refreshToken = refreshToken.substring(1, refreshToken.length()-1);
//            log.info("## refreshToken: " + refreshToken);
//            if(StringUtils.hasText(accessToken) && accessToken.startsWith("Bearer")) {
//                accessToken = accessToken.replace("Bearer ", "");
//                log.info("### accessToken: " + accessToken);
//            }
//            try {
//                verifyJws(accessToken);
//                log.info("## 예외 발생?: " + accessToken);
//                verifyJws(refreshToken);
//            } catch (Exception e) {
//                e.printStackTrace();
////                jwtVerificationFilter.doFilter();
//            }
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
