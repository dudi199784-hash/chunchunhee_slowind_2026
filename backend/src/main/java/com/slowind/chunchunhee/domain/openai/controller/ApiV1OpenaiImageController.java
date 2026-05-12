package com.slowind.chunchunhee.domain.openai.controller;

import com.slowind.chunchunhee.domain.openai.service.OpenaiImageGenerationService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/openai/images")
public class ApiV1OpenaiImageController {
    private final OpenaiImageGenerationService openaiImageGenerationService;

    @Data
    public static class OpenaiImageRequest {
        @NotBlank(message = "prompt는 필수입니다.")
        private String prompt;
    }

    @Getter
    @AllArgsConstructor
    public static class OpenaiImageResponse {
        private final String b64Json;   // null 가능
        private final String imageUrl; // null 가능
    }

    @PostMapping(value = "/generate", consumes = MediaType.APPLICATION_JSON_VALUE)
    public OpenaiImageResponse generate(@Valid @RequestBody OpenaiImageRequest openaiImageRequest) {
        return openaiImageGenerationService.generate(openaiImageRequest.getPrompt());
    }
}
