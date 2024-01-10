package com.growstory.domain.alarm.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.alarm.constants.AlarmType;
import com.growstory.domain.alarm.dto.AlarmDto;
import com.growstory.domain.alarm.entity.Alarm;
import com.growstory.domain.alarm.repository.AlarmRepository;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class AlarmService {
    private final AlarmRepository alarmRepository;
    private final AccountRepository accountRepository;

    public void createAlarm(Long accountId, AlarmType alarmType) {
        Account findAccount = accountRepository.findById(accountId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND));

        Alarm savedAlarm = alarmRepository.save(Alarm.builder()
                .alarmType(alarmType)
                .isShow(false)
                .account(findAccount)
                .build());

        findAccount.addAlarm(savedAlarm);
    }

    // 최신순 조회
    public List<AlarmDto.Response> findAlarms(Long accountId) {
        Account findAccount = accountRepository.findById(accountId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND));

        return findAccount.getAlarms().stream()
                .sorted(Comparator.comparing(Alarm::getAlarmId).reversed())
                .map(this::getAlarmResponseDto)
                .collect(Collectors.toList());
    }

    // 더티체킹 테스트해보기
    public void deleteAlarm(Long alarmId) {
        Alarm findAlarm = findVerifiedAlarm(alarmId);
        alarmRepository.delete(findAlarm);

        findAlarm.getAccount().getAlarms().remove(findAlarm);
    }

    public void deleteAlarms(Long accountId) {
        Account findAccount = accountRepository.findById(accountId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND));

        alarmRepository.deleteAll();

        findAccount.getAlarms().clear();
    }

    @Transactional(readOnly = true)
    public Alarm findVerifiedAlarm(Long alarmId) {
        return alarmRepository.findById(alarmId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ALARM_NOT_FOUND));
    }

    private AlarmDto.Response getAlarmResponseDto(Alarm findAlarm) {
        return AlarmDto.Response.builder()
                .id(findAlarm.getAlarmId())
                .type(findAlarm.getAlarmType().getStepDescription())
                .num(findAlarm.getAlarmType().getPoint())
                .isShow(findAlarm.getIsShow())
                .build();
    }

    public void readAlarms(Long accountId) {
        Account findAccount = accountRepository.findById(accountId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND));

        findAccount.getAlarms().forEach(alarm ->
                alarm.updateIsShow(true));
    }
}
