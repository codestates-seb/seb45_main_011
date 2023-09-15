package com.growstory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableJpaAuditing
public class GrowstoryApplication {

	public static void main(String[] args) {
		SpringApplication.run(GrowstoryApplication.class, args);
	}

}

/*
TODO:
 엔티티 생성 및 연관 관계 매핑
*/
