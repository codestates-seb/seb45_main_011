package com.growstory.global.badwordsfilter.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Builder
public class ProfanityResponse {
    Set<String> inputProfanityWords = new HashSet<>();
    Set<String> bannedWords = new HashSet<>();

    @Override
    public String toString() {
        StringBuilder response = new StringBuilder();

        String inputProfanityWords = this.getInputProfanityWords().toString();
        String bannedWords = this.getBannedWords().toString();

        return response.append(inputProfanityWords.substring(1, inputProfanityWords.length()-1))
                .append("/")
                .append(bannedWords.substring(1, bannedWords.length()-1)).toString();
    }
}
