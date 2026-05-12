package com.slowind.chunchunhee.domain.openai.service;

import com.slowind.chunchunhee.domain.openai.controller.ApiV1OpenaiImageController;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;


import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OpenaiImageGenerationService {
    @Value("${custom.openai.api-key}")
    private String openaiApiKey;

    private final RestClient openaiClient = RestClient.builder()
            .baseUrl("https://api.openai.com/v1")
            .build();

    public ApiV1OpenaiImageController.OpenaiImageResponse generate(String prompt) {
        var body = Map.of(
                "model", "gpt-image-2",
                "prompt", prompt,
                "n", 1,
                "response_format", "b64_json"
        );
        Map<?, ?> res = openaiClient.post()
                .uri("/images/generations")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + openaiApiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .body(Map.class);

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> dataList = (List<Map<String, Object>>) res.get("data");
        if (dataList == null || dataList.isEmpty()) {
            throw new IllegalStateException("OpenAI 응답에 data가 없습니다.");
        }
        Map<String, Object> first = dataList.get(0);
        String b64 = (String) first.get("b64_json");
        if (b64 == null || b64.isBlank()) {
            throw new IllegalStateException("OpenAI 응답에 b64_json이 없습니다.");
        }
        // res에서 data[0].b64_json 꺼내서 DTO로 감싸 반환
        return new ApiV1OpenaiImageController.OpenaiImageResponse(b64);
    }
}
