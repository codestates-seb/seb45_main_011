package com.growstory.global.email.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.global.email.dto.EmailDto;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    // 부하 테스트 때 비동기 처리
    public EmailDto.SignUpResponse sendAuthCodeMail(EmailDto.Post emailPostDto) {
        String authCode = getAuthCode();
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(emailPostDto.getEmail()); // 수신 이메일
            mimeMessageHelper.setSubject("[GrowStory] 회원가입 인증번호 안내"); // 이메일 제목
            mimeMessageHelper.setText(setContext(authCode, "authCode"), true); // 이메일 본문
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        return EmailDto.SignUpResponse.builder()
                .authCode(authCode)
                .build();
    }

    public EmailDto.PasswordResponse sendPasswordMail(EmailDto.Post emailPostDto) {
        Optional<Account> optionalAccount = accountRepository.findByEmail(emailPostDto
                .getEmail());
        String password = getAuthCode();
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        optionalAccount.ifPresent(findAccount -> {
            try {
                MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
                mimeMessageHelper.setTo(emailPostDto.getEmail()); // 수신 이메일
                mimeMessageHelper.setSubject("[GrowStory] 임시 비밀번호 안내"); // 이메일 제목
                mimeMessageHelper.setText(setContext(password, "password"), true); // 이메일 본문
                mailSender.send(mimeMessage);
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }

            // password encode 필요
            accountRepository.save(findAccount.toBuilder()
                    .password(passwordEncoder.encode(password))
                    .build());
        });

        return EmailDto.PasswordResponse.builder()
                .isMatched(optionalAccount.isPresent())
                .build();
    }

    // 인증 번호 겸 임시 비밀번호
    private String getAuthCode() {
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
