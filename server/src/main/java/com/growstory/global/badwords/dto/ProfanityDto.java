package com.growstory.global.badwords.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.Set;

@Getter
@Builder
public class ProfanityDto {
    Set<String> inputProfanityWords;
    Set<String> bannedWords;
}
