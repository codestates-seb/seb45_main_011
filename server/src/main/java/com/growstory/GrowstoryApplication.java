package com.growstory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableJpaAuditing
@EnableAsync
@EnableAspectJAutoProxy
@SpringBootApplication
public class GrowstoryApplication {

	public static void main(String[] args) {
		SpringApplication.run(GrowstoryApplication.class, args);
	}

}
