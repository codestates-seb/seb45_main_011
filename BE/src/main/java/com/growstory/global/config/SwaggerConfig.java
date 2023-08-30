package com.growstory.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 *      @OpenAPIDefinition(
        info = @Info(title = "GrowStory API 명세서",
        description = "GrowStory API Specification",
        version = "v1.0.0"))
 */

@Configuration
public class SwaggerConfig {
    @Bean
    public GroupedOpenApi groupedOpenApi() {
        String[] paths = {"/v1/**"};

        return GroupedOpenApi.builder()
                .group("Team Grow Story")
                .pathsToMatch(paths)
                .build();
    }

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .version("v1.0.0")
                .title("GrowStory API Specification")
                .description("@Author | NtoZero ")
                .contact(new Contact()
                        .name("SeungTae-Lee")
                        .email("dev.st1027@gmail.com")
                        .url("https://github.com/NtoZero"))
                .license(new License()
                        .name("Apache License 2.0")
                        .url("http://www.apache.org/licenses/LICENSE-2.0"));
    }

}
