package com.growstory.global.badwords.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Builder
public class ProfanityDto {
    Set<String> inputProfanityWords = new HashSet<>();
    Set<String> bannedWords = new HashSet<>();
}
