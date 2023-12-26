package com.growstory.global.auth.handler;

import com.growstory.domain.account.constants.AccountGrade;
import com.growstory.domain.account.constants.Status;
import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.account.service.AccountService;
import com.growstory.domain.bannedAccount.entity.BannedAccount;
import com.growstory.domain.bannedAccount.repository.BannedAccountRepository;
import com.growstory.domain.point.entity.Point;
import com.growstory.domain.point.repository.PointRepository;
import com.growstory.domain.point.service.PointService;
import com.growstory.global.auth.jwt.JwtTokenizer;
import com.growstory.global.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.web.util.UriComponentsBuilder;
import org.yaml.snakeyaml.util.UriEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
//OAuth2 인증이 성공한 이후 동작 (SimpleUrlAuthenticationSuccessHandler : 인증 성공했을 때 URL 지정 등 역할 수행)
public class OAuth2AccountSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private static final String S3_ENDPOINT_URL = "http://localhost";

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final AccountService accountService;
    private final AccountRepository accountRepository;
    private final BannedAccountRepository bannedAccountRepository;
    private final PointService pointService;
    private final PointRepository pointRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("# OAuth2AccountSuccessHandler success!");

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = (String) oAuth2User.getAttributes().get("email");
        String name = (String) oAuth2User.getAttributes().get("name");
        String profileImageUrl = (String) oAuth2User.getAttributes().get("picture");
        List<String> authorities = authorityUtils.createRoles(email);

        Optional<Account> optionalAccount = accountRepository.findByEmail(email);
        Account savedAccount = null;
        if (optionalAccount.isEmpty()) {
            Point point = pointService.createPoint(email);
            savedAccount = accountRepository.save(Account.builder()
                    .email(email)
                    .displayName(name)
                    .password("")
                    .profileImageUrl(profileImageUrl)
                    .point(point)
                    .roles(authorities)
                    //status social로 추가
                    .status(Status.SOCIAL_USER)
                    .accountGrade(AccountGrade.GRADE_BRONZE)
                    .build());

            point.updateAccount(savedAccount);
            pointRepository.save(point);
        } else {
            Account findAccount = optionalAccount.get();
            chkSuspendedDays(findAccount);
            accountService.attendanceCheck(findAccount);
        }

        redirect(request, response, optionalAccount.orElse(savedAccount), authorities);
    }

    private void chkSuspendedDays(Account account) {
        BannedAccount findBannedAccount = bannedAccountRepository.findAll().stream()
                .filter(bannedAccount -> Objects.equals(bannedAccount.getAccountId(), account.getAccountId()))
                .collect(Collectors.toList())
                .get(0);

        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        // 정지가 끝났다면
        if (now.isAfter(findBannedAccount.getSuspendedDate())) {
            account.updateStatus(Status.SOCIAL_USER);
            bannedAccountRepository.delete(findBannedAccount);
        }
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response,
                          Account account, List<String> authorities) throws IOException {

        // accessToken과 refreshToken 생성
        String accessToken = delegateAccessToken(account, authorities);
        String refreshToken = delegateRefreshToken(account.getEmail());

        //FE 애플리케이션 쪽의 URI 생성.
        String uri = createURI(accessToken, refreshToken, account).toString();

//        response.setHeader("accessToken", accessToken);
//        response.setHeader("accountId", account.getAccountId().toString());

//        response.sendRedirect(uri);

//        response.setStatus(HttpStatus.TEMPORARY_REDIRECT.value());
//        response.setHeader("Location", "http://localhost:8888/v1/accounts/oauth/login");

//        client growstory.com => server api.growstory.com => cookie.setDomain(".growstory.com")
//        response = addCookies(response, account, accessToken, refreshToken);
//        HttpSession httpSession = request.getSession(true);
//        httpSession.setAttribute("accessToken", accessToken);
//        httpSession.setAttribute("accountId", account.getAccountId());

        // 만약 보안성을 추가하려면 토큰과 그 토큰을 가리키는 uuid를 하나 생성해서 account 테이블에 저장한 후
        // 토큰의 key인 uuid만 queryparam으로 리다이렉트 그 후 client측에서 uuid를 입력으로 유저정보 get 요청

        //SimpleUrlAuthenticationSuccessHandler에서 제공하는 sendRedirect() 메서드를 이용해 Frontend 애플리케이션 쪽으로 리다이렉트
        getRedirectStrategy().sendRedirect(request, response, uri);
    }


    private String delegateAccessToken(Account account, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("accountId", account.getAccountId().toString());
        claims.put("username", account.getEmail());
        claims.put("displayName", account.getDisplayName());
        claims.put("profileImageUrl", account.getProfileImageUrl());
        claims.put("roles", authorities);

        String subject = account.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private Object createURI(String accessToken, String refreshToken, Account account) {
        return UriComponentsBuilder
                .newInstance()
                .scheme("https")
                .host("growstory.vercel.app")
                .port(443)
                .path("/signin")
                .queryParam("access_token", accessToken)
                .queryParam("refresh_token", refreshToken)
                .queryParam("accountId", account.getAccountId())
                .queryParam("displayName", UriEncoder.encode(account.getDisplayName()))
                .queryParam("profileIamgeUrl", account.getProfileImageUrl())
                .queryParam("status", account.getStatus().getStepDescription())
                .build()
                .toUri();
    }

//    private HttpServletResponse addCookies(HttpServletResponse response, Account account, String accessToken, String refreshToken) {
//        response.addHeader("Set-Cookie", createCookie("access_token", accessToken).toString());
//        response.addHeader("Set-Cookie", createCookie("refresh_token", refreshToken).toString());
//        response.addHeader("Set-Cookie", createCookie("account_id", account.getAccountId().toString()).toString());
//        response.addHeader("Set-Cookie", createCookie("displayName", UriEncoder.encode(account.getDisplayName())).toString());
//        response.addHeader("Set-Cookie", createCookie("profileImageUrl", account.getProfileImageUrl()).toString());
//
//        return response;
//    }
//
//    private ResponseCookie createCookie(String key, String value) {
//        ResponseCookie cookie = ResponseCookie.from(key, value)
//                .sameSite("")
////                .domain("seb45-main-011.vercel.app")
//                .path("/")
////                .secure(true)
//                .build();
//
//        return cookie;
//    }
}
