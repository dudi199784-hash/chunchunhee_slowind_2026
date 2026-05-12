package com.slowind.chunchunhee.domain.openai.controller;

import com.slowind.chunchunhee.domain.openai.service.OpenaiImageGenerationService;
import jakarta.validation.Valid;
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
    public static class OpenaiImageRequest{
        private String prompt;
    }

    @Getter
    @AllArgsConstructor
    public static class OpenaiImageResponse {
        private final String b64Json;
    }

    @PostMapping(value = "/generate", consumes = MediaType.APPLICATION_JSON_VALUE)
    public OpenaiImageResponse generate(@Valid @RequestBody OpenaiImageRequest openaiImageRequest) {
        return openaiImageGenerationService.generate(openaiImageRequest.getPrompt());
    }
}
