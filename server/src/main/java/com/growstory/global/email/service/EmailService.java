package com.growstory.global.email.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.global.email.dto.EmailDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    // 부하 테스트 때 비동기 처리
    public EmailDto.SignUpResponse sendAuthCodeMail(EmailDto.Post requsetDto) {
        try {
            String authCode = getAuthCode();

            CompletableFuture.runAsync(() -> {
                String finalText = setContext(authCode, "authCode");
                try {
                    MimeMessage mimeMessage = mailSender.createMimeMessage();
                    MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");

                    mimeMessageHelper.setTo(requsetDto.getEmail()); // 수신 이메일
                    mimeMessageHelper.setSubject("[GrowStory] 회원가입 인증번호 안내"); // 이메일 제목
                    mimeMessageHelper.setText(finalText, true); // 이메일 본문

                    mailSender.send(mimeMessage);
                } catch (MessagingException e) {
                    throw new RuntimeException(e);
                }
            });

            return EmailDto.SignUpResponse.builder()
                    .isDuplicated(false)
                    .authCode(authCode)
                    .build();
        } catch (Exception e) {
            // 예외 처리
            throw new RuntimeException(e);
        }
    }

    public EmailDto.PasswordResponse sendPasswordMail(EmailDto.Post requestDto) {
        Optional<Account> optionalAccount = accountRepository.findByEmail(requestDto.getEmail());

        if (optionalAccount.isEmpty()) {
            return EmailDto.PasswordResponse.builder()
                    .isMatched(false)
                    .build();
        }


        Account findAccount = optionalAccount.get();
        String password = getAuthCode();

        CompletableFuture.runAsync(() -> {
            try {
                MimeMessage mimeMessage = mailSender.createMimeMessage();
                MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");

                mimeMessageHelper.setTo(requestDto.getEmail()); // 수신 이메일
                mimeMessageHelper.setSubject("[GrowStory] 임시 비밀번호 안내"); // 이메일 제목
                mimeMessageHelper.setText(setContext(password, "password"), true); // 이메일 본문
                mailSender.send(mimeMessage);

                // password encode 필요
                accountRepository.save(findAccount.toBuilder()
                        .password(passwordEncoder.encode(password))
                        .build());
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
        });

        return EmailDto.PasswordResponse.builder()
                .isMatched(true)
                .build();
    }


    // 인증 번호 겸 임시 비밀번호
    public String getAuthCode() {
        Random random = new Random();
        StringBuilder authCode = new StringBuilder();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(4);

            switch (index) {
                case 0: authCode.append((char) (random.nextInt(26) + 97)); break; //소문자
                case 1: authCode.append((char) (random.nextInt(26) + 65)); break; //대문자
                default: authCode.append(random.nextInt(10)); //숫자
            }
        }

        return authCode.toString();
    }

    private String setContext(String code, String type) {
        Context context = new Context();
        context.setVariable(type, code);
        return templateEngine.process(type, context);
    }
}