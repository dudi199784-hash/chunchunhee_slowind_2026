package com.slowind.chunchunhee.domain.community.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/communities")
public class ApiV1CommunityController {
    private final CommunityService communityService;
}
