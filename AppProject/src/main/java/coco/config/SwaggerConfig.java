package coco.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

// http://localhost:8080/swagger-ui/index.html
@OpenAPIDefinition(
        info = @Info(title = "COCKTAGORIZE API 명세서",
                    description = "CSID-DGU/2023-1-OSSP2-NotEasy-10"))
@RequiredArgsConstructor
@Configuration
public class SwaggerConfig {
}
