package com.growstory.global.badwords.service;

import com.growstory.global.badwords.dto.ProfanityDto;
import com.growstory.global.badwords.filterlist.BlackList;
import com.growstory.global.badwords.filterlist.WhiteList;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class BlackListService implements BlackList, WhiteList {

    private HashSet<String> blackSet = new HashSet<>(); //블랙 리스트
    private HashSet<String> whiteSet = new HashSet<>(); //화이트 리스트
    private HashSet<String> bannedWords = new HashSet<>(); // 포함된 금지 단어 목록

    //대체 문자 지정
    //기본값 : *
    private String substituteValue = "*";

    public BlackListService() {
        //블랙 리스트 포함
        blackSet.addAll(List.of(koreanSlangs));
        //화이트 리스트 포함
        whiteSet.addAll(List.of(whiteList));
    }

    public BlackListService(String substituteValue) {
        this.substituteValue = substituteValue;
    }

    //비속어 있다면 대체
    public String change(String text) {
        String[] words = blackSet.stream().filter(text::contains).toArray(String[]::new);
        for (String v : words) {
            String sub = this.substituteValue.repeat(v.length());
            text = text.replace(v, sub);
        }
        return text;
    }

//    public String change(String text, String[] sings) {
//        StringBuilder singBuilder = new StringBuilder("[");
//        for (String sing : sings) singBuilder.append(Pattern.quote(sing));
//        singBuilder.append("]*");
//        String patternText = singBuilder.toString();
//
//        for (String word : this) {
//            if (word.length() == 1) text = text.replace(word, substituteValue);
//            String[] chars = word.chars().mapToObj(Character::toString).toArray(String[]::new);
//            text = Pattern.compile(String.join(patternText, chars))
//                    .matcher(text)
//                    .replaceAll(v -> substituteValue.repeat(v.group().length()));
//        }
//
//        return text;
//    }

    //금지된 욕설인지 여부
    public boolean isForbidden(String text) {
        boolean isWhite = whiteSet.stream().anyMatch(text::contains);
        boolean isBlack = blackSet.stream().anyMatch(blackWord -> {
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
    public ProfanityDto getProfanityWords(String text) {
        String[] contents = text.split(" ");

        Set<String> inputProfanityWords = Arrays.stream(contents)
                .filter(this::isForbidden)
                .collect(Collectors.toSet());

        return ProfanityDto.builder()
                .inputProfanityWords(inputProfanityWords)
                .bannedWords(bannedWords).build();

        //TODO: findFirst()를 이용해 속도 효율을 증가 시키는 방법도 고려할 수 있다
    }

    //공백이 없는 상태에서 욕설 인식 및 반환
    public ProfanityDto getProfanityWordsWithNoBlanks(String text) {
        return getProfanityWords(text.replace(" ", ""));
    }
}
