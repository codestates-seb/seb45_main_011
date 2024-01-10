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

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

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
        LocalDateTime currentDateTime = LocalDateTime.now();
        log.info("## "+ currentDateTime.toString());

        if(StompCommand.CONNECT.equals(headerAccessor.getCommand())) { // 웹소켓 연결 요청 -> JWT 인증
            log.info("## CONNECT : 소켓 연결 ");
            String accessToken = getAndPutAccessTokenFrom(headerAccessor);
            String refreshToken = getAndPutRefreshTokenFrom(headerAccessor);
            //TODO: refresh 토큰 관련 로직 개선
            try {
                Map<String, Object> claims = jwtTokenizer.verifyJws(accessToken); // 여기서 문제가 발생하면 헤더에 정보가 포함되지 않음.
                putClaimsHeader(headerAccessor, claims);
                log.info("## Claims : {}", claims);
            }  catch (SignatureException | MalformedJwtException sme) {
                log.warn("잘못된 JWT 서명입니다.");
                putValue(headerAccessor,  "exception", sme);
            } catch (ExpiredJwtException ee) {
                try {
                    generateNewAccessTokenUsingRefreshToken(accessToken, refreshToken, headerAccessor);
                } catch (BusinessLogicException e) {
                    putValue(headerAccessor, "refresh-exception", e);
//                    headerAccessor.setHeader("exception", ee);
                }
                log.info("## ExpiredJwtException: " + headerAccessor);
            } catch (Exception e) {
                putValue(headerAccessor, "exception", e);
            }
        } else if (StompCommand.SEND == (headerAccessor.getCommand())) {
            log.info("## SEND: " + headerAccessor);
            String payload = new String((byte[]) message.getPayload());
            log.info("Message Payload : "+ payload);
        } else if (StompCommand.SUBSCRIBE == (headerAccessor.getCommand())) {
            log.info("## SUBSCRIBE: " + headerAccessor);
            String chatRoomId = getChatRoomIdFrom(headerAccessor);
            putValue(headerAccessor, "chatRoomId", chatRoomId);
            log.info("## SUBSCRIBE: accountId ({})번, ({})님이 ({})번 채팅방을 구독하셨습니다." + headerAccessor
                    , getValue(headerAccessor, "senderId"), getValue(headerAccessor, "displayName")
                    , getValue(headerAccessor, "chatRoomId"));
        } else if (StompCommand.DISCONNECT == (headerAccessor.getCommand())) {
            log.info("## DISCONNECT: " + headerAccessor);
            log.info("## DISCONNECT: accountId ({})번, ({})님이 ({})번 채팅방을 떠났습니다." + headerAccessor
                    , getValue(headerAccessor, "senderId"), getValue(headerAccessor, "displayName")
                    , getValue(headerAccessor, "chatRoomId"));
        }

        return message;
    }

    private String getAndPutAccessTokenFrom(StompHeaderAccessor headerAccessor) {
        String accessToken = headerAccessor.getNativeHeader("Authorization").toString();
        accessToken = accessToken.substring(1, accessToken.length()-1).replace("Bearer ", "");
        putValue(headerAccessor, "Authorization", accessToken);
        log.info("## accessToken: " + accessToken);
        return accessToken;
    }
    private String getAndPutRefreshTokenFrom(StompHeaderAccessor headerAccessor) {
        String refreshToken = headerAccessor.getNativeHeader("refresh").toString();
        refreshToken = refreshToken.substring(1, refreshToken.length()-1);
        putValue(headerAccessor, "refresh", refreshToken);
        log.info("## refreshToken: " + refreshToken);
        return refreshToken;
    }
    private String getChatRoomIdFrom(StompHeaderAccessor headerAccessor) {
        String destination = headerAccessor.getDestination();
        String chatRoomId = destination.substring(destination.lastIndexOf('/')+1);
        return chatRoomId;
    }

    private void generateNewAccessTokenUsingRefreshToken(String accessToken, String refreshToken, StompHeaderAccessor headerAccessor) {
        String newAccessToken = jwtTokenizer.generateNewAccessTokenUsingRefreshToken(accessToken, refreshToken);
        putValue(headerAccessor, "Authorization", newAccessToken);
        Map<String, Object> claims = jwtTokenizer.verifyJws(newAccessToken);
        putClaimsHeader(headerAccessor, claims);
        log.info("### : generateNewAccessTokenUsingRefreshToken 토큰 재생성 :{}", newAccessToken);
    }

    private void putValue(StompHeaderAccessor accessor, String key, Object value) {
        Map<String, Object> sessionAttributes = getSessionAttributes(accessor);
        sessionAttributes.put(key, value);
    }
    private void putClaimsHeader(StompHeaderAccessor headerAccessor, Map<String, Object> claims) {
        putValue(headerAccessor, "senderId", claims.get("accountId"));
        putValue(headerAccessor, "displayName", claims.get("displayName"));
    }

    private Object getValue(StompHeaderAccessor accessor, String key) {
        Map<String, Object> sessionAttributes = getSessionAttributes(accessor);
        Object value = sessionAttributes.get(key);

        if(Objects.isNull(value)) {
            log.warn("SessionAttributes does not has a key named {}", key);
            throw new BusinessLogicException(ExceptionCode.WEBSOCKET_EXCEPTION);
        }
        return value;
    }

    private Map<String, Object> getSessionAttributes(StompHeaderAccessor accessor) {
        Map<String, Object> sessionAttributes = accessor.getSessionAttributes();

        if (Objects.isNull(sessionAttributes)) {
            log.warn("SessionAttributes is Null");
            throw new BusinessLogicException(ExceptionCode.WEBSOCKET_EXCEPTION);
        }
        return sessionAttributes;
    }

}
