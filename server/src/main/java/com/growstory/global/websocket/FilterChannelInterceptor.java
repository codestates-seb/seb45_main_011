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
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        log.info("## StompHeaderAccessor: " + headerAccessor);

        if(StompCommand.CONNECT.equals(headerAccessor.getCommand())) { // 웹소켓 연결 요청 -> JWT 인증
            log.info("## CONNECT : 소켓 연결 ");
            String accessToken = getAccessTokenFrom(headerAccessor);
            String refreshToken = getRefreshTokenFrom(headerAccessor);
            //TODO: refresh 토큰 관련 로직 개선
            try {
                Map<String, Object> claims = verifyJws(accessToken);
                putValue(headerAccessor, "senderId", claims.get("accountId"));
                putValue(headerAccessor, "displayName", claims.get("displayName"));
                log.info("## Claims : {}", claims);
            }  catch (SignatureException | MalformedJwtException sme) {
                log.info("잘못된 JWT 서명입니다.");
                putValue(headerAccessor,  "exception", sme);
            } catch (ExpiredJwtException ee) {
                log.info("만료된 JWT 토큰입니다.");
                putValue(headerAccessor,  "exception", ee);
            } catch (Exception e) {
                putValue(headerAccessor, "exception", e);
            }
        } else if (StompCommand.SEND == (headerAccessor.getCommand())) {
            String payload = new String((byte[]) message.getPayload());
            log.info("Message Payload : "+ payload);
        } else if (StompCommand.SUBSCRIBE == (headerAccessor.getCommand())) {
            String chatRoomId = getChatRoomIdFrom(headerAccessor);
            putValue(headerAccessor, "chatRoomId", chatRoomId);
            log.info("## SUBSCRIBE: accountId ({})번, ({})님이 ({})번 채팅방을 구독하셨습니다." + headerAccessor
                    , getValue(headerAccessor, "senderId"), getValue(headerAccessor, "displayName")
                    , getValue(headerAccessor, "chatRoomId"));
        } else if (StompCommand.DISCONNECT == (headerAccessor.getCommand())) {
            log.info("## DISCONNECT: accountId ({})번, ({})님이 ({})번 채팅방을 떠났습니다." + headerAccessor
                    , getValue(headerAccessor, "senderId"), getValue(headerAccessor, "displayName")
                    , getValue(headerAccessor, "chatRoomId"));
        }

        return message;
    }


    private String getAccessTokenFrom(StompHeaderAccessor headerAccessor) {
        String accessToken = headerAccessor.getNativeHeader("Authorization").toString();
        accessToken = accessToken.substring(1, accessToken.length()-1).replace("Bearer ", "");
        putValue(headerAccessor, "Authorization", accessToken);
        log.info("## accessToken: " + accessToken);
        return accessToken;
    }
    private String getRefreshTokenFrom(StompHeaderAccessor headerAccessor) {
        String refreshToken = headerAccessor.getNativeHeader("refresh").toString();
        refreshToken = refreshToken.substring(1, refreshToken.length()-1);
        putValue(headerAccessor, "refresh", refreshToken);
        log.info("## refreshToken: " + refreshToken);
        return refreshToken;
    }
    private static String getChatRoomIdFrom(StompHeaderAccessor headerAccessor) {
        String destination = headerAccessor.getDestination();
        String chatRoomId = destination.substring(destination.lastIndexOf('/')+1);
        return chatRoomId;
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

    private Object getValue(StompHeaderAccessor accessor, String key) {
        Map<String, Object> sessionAttributes = getSessionAttributes(accessor);
        Object value = sessionAttributes.get(key);

        if(Objects.isNull(value)) {
            log.info("sessionAttributes doesnt has a key named {}", key);
            throw new BusinessLogicException(ExceptionCode.WEBSOCKET_EXCEPTION);
        }
        return value;
    }

    private Map<String, Object> getSessionAttributes(StompHeaderAccessor accessor) {
        Map<String, Object> sessionAttributes = accessor.getSessionAttributes();

        if (Objects.isNull(sessionAttributes)) {
            log.info("SessionAttributes is Null");
            throw new BusinessLogicException(ExceptionCode.WEBSOCKET_EXCEPTION);
        }
        return sessionAttributes;
    }

}
