package com.growstory.global.websocket;

import com.growstory.global.auth.filter.JwtVerificationFilter;
import com.growstory.global.auth.jwt.JwtTokenizer;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.asm.Accessor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Objects;

@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@Slf4j
@RequiredArgsConstructor
@Component
public class FilterChannelInterceptor implements ChannelInterceptor {
    private final JwtTokenizer jwtTokenizer;
    private final JwtVerificationFilter jwtVerificationFilter;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        log.info("## 소켓 접속!!! ");
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        log.info("## StompHeaderAccessor: " + headerAccessor);

        if(StompCommand.CONNECT.equals(headerAccessor.getCommand())) { // 웹소켓 연결 요청 -> JWT 인증
            String accessToken = headerAccessor.getNativeHeader("Authorization").toString();
            accessToken = accessToken.substring(1, accessToken.length()-1);
//            log.info("## accessToken: " + accessToken);
            String refreshToken = headerAccessor.getNativeHeader("refresh").toString();
            refreshToken = refreshToken.substring(1, refreshToken.length()-1);
//            log.info("## refreshToken: " + refreshToken);
            try {
                Map<String, Object> claims = verifyJws(accessToken);
            }  catch (SignatureException | MalformedJwtException sme) {
                log.info("잘못된 JWT 서명입니다.");
                putValue(headerAccessor,  "exception", sme);
            } catch (ExpiredJwtException ee) {
                log.info("만료된 JWT 토큰입니다.");
                putValue(headerAccessor,  "exception", ee);
            } catch (Exception e) {
                putValue(headerAccessor, "exception", e);
            }
        } else if (StompCommand.SEND.equals(headerAccessor.getCommand())) {
            String payload = new String((byte[]) message.getPayload());
            log.info("Message Payload : "+ payload);
        } else if (StompCommand.SUBSCRIBE.equals(headerAccessor.getCommand())) {

        } else if (StompCommand.DISCONNECT.equals(headerAccessor.getCommand())) {

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

    private void putValue(StompHeaderAccessor accessor, String key, Object value) {
        Map<String, Object> sessionAttributes = getSessionAttributes(accessor);
        sessionAttributes.put(key, value);
    }

    private Map<String, Object> getSessionAttributes(StompHeaderAccessor accessor) {
        Map<String, Object> sessionAttributes = accessor.getSessionAttributes();

        if (Objects.isNull(sessionAttributes)) {
            throw new BusinessLogicException(ExceptionCode.WEBSOCKET_EXCEPTION);
        }
        return sessionAttributes;
    }

}
