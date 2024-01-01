package com.growstory.global.badwordsfilter.service;

import com.growstory.global.badwordsfilter.dto.ProfanityResponse;
import com.growstory.global.badwordsfilter.filterlist.BadWords;
import com.growstory.global.badwordsfilter.filterlist.AllowedWords;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BadWordsService implements BadWords, AllowedWords {

    private HashSet<String> badWords = new HashSet<>(); //블랙 리스트
    private HashSet<String> allowedWords = new HashSet<>(); //화이트 리스트
    private HashSet<String> bannedWords = new HashSet<>(); // 포함된 금지 단어 목록

    public BadWordsService() {
        //블랙 리스트 포함
        badWords.addAll(List.of(badWordArray));
        //화이트 리스트 포함
        allowedWords.addAll(List.of(allowedWordArray));
    }

    //테스트용 정적 팩토리 메서드
    public static BadWordsService of(String[] badWordArray, String[] allowedWordArray) {
        return new BadWordsService(badWordArray, allowedWordArray);
    }

    private BadWordsService(String[] badWordArray, String[] allowedWordArray) {
        badWords.addAll(List.of(badWordArray));
        allowedWords.addAll(List.of(allowedWordArray));
    }

    //금지된 욕설인지 여부
    public boolean isForbidden(String text) {
        boolean isWhite = allowedWords.stream().anyMatch(text::contains);
        boolean isBlack = badWords.stream().anyMatch(blackWord -> {
            // contains, 블랙 리스트에 포함되어 있으면서 화이트 리스트에서 제외되었는지 여부 판단
            boolean contains = text.contains(blackWord) && !isWhite;
            if (contains) {
                bannedWords.add(blackWord); // anyMatch가 true일 때 해당 단어를 추가
            }
            return contains;
        });

        return isBlack && !isWhite;
    }

    //사용자가 입력한 욕설 리스트 반환
    public ProfanityResponse getProfanityWords(String text) {
        String[] contents = text.split(" ");
        bannedWords.clear();

        Set<String> inputProfanityWords = Arrays.stream(contents)
                .filter(this::isForbidden)
                .collect(Collectors.toSet());

        return ProfanityResponse.builder()
                .inputProfanityWords(inputProfanityWords)
                .bannedWords(bannedWords).build();
    }
}
