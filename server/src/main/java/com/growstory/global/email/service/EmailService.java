package com.growstory.global.email.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.global.email.dto.EmailDto;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    private final AccountRepository accountRepository;

    public EmailDto.Response sendAuthCodeMail(EmailDto.Post emailPostDto) {
        String authCode = getAuthCode();
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(emailPostDto.getEmail()); // 수신 이메일
            mimeMessageHelper.setSubject("인증번호 발송"); // 이메일 제목
            mimeMessageHelper.setText(setContext(authCode, "authCode"), true); // 이메일 본문
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        return EmailDto.Response.builder()
                .authCode(authCode)
                .build();
    }

    public void sendPasswordMail(EmailDto.Post emailPostDto) {
        String password = getAuthCode();
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(emailPostDto.getEmail()); // 수신 이메일
            mimeMessageHelper.setSubject("임시 비밀번호 발송"); // 이메일 제목
            mimeMessageHelper.setText(setContext(password, "password"), true); // 이메일 본문
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        Account findAccount = accountRepository.findByEmail(emailPostDto.getEmail()).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND));

        accountRepository.save(findAccount.toBuilder()
                .password(password)
                .build());
    }

    // 인증 번호 겸 임시 비밀번호
    private String getAuthCode() {
        Random random = new Random();
        StringBuffer authCode = new StringBuffer();

        for (int i = 0; i < 30; i++) {
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
