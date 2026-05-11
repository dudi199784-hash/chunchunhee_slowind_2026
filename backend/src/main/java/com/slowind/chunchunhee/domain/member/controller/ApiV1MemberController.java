package com.slowind.chunchunhee.domain.member.controller;

import com.slowind.chunchunhee.domain.member.dto.MemberDto;
import com.slowind.chunchunhee.domain.member.entity.Member;
import com.slowind.chunchunhee.domain.member.repository.MemberRepository;
import com.slowind.chunchunhee.domain.member.service.MemberService;
import com.slowind.chunchunhee.domain.product.controller.ApiV1ProductController;
import com.slowind.chunchunhee.domain.product.entity.Product;
import com.slowind.chunchunhee.global.exception.ResourceNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class ApiV1MemberController {
    private final MemberService memberService;

    // --- inner 클래스 - MembersResponse
    @Getter
    @AllArgsConstructor
    public static class MembersResponse {
        private List<Member> members;
    }

    // --- 유저 다건 조회
    @GetMapping("")
    public MembersResponse getMembers() {
        List<Member> members = memberService.getMemberLlist();
        return new MembersResponse(members);
    }

    // --- inner 클래스 - MemberResponse
    @Getter
    @AllArgsConstructor
    public static class MemberResponse {
        private final Member member;
    }

    // --- 유저 단건 조회
    @GetMapping("{id}")
    public MemberResponse getMember(@PathVariable("id") Long id) {
        return memberService.findById(id)
                .map( MemberResponse::new)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "%d번 고유넘버를 가진 회원은 존재하지 않습니다.".formatted(id)
                ));
    }

    // --- inner 클래스 - SignUpRequest
    @Data
    public static class SignUpRequest {
        @NotBlank
        private String username;
        @NotBlank
        private String userId;
        @NotBlank
        private String userpassword;
    }

    // --- inner 클래스 - SignUpResponse
    @Getter
    @AllArgsConstructor
    public static class SignUpResponse {
        private final Member member;
    }

    // 유저 회원가입
    @PostMapping("")
    public SignUpResponse signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        Member singupMember = memberService.createMember(
                                        signUpRequest.getUsername(),
                                        signUpRequest.getUserId(),
                                        signUpRequest.getUserpassword());

        return new SignUpResponse(singupMember);
    }

    // --- inner 클래스 - ModifyRequest
    @Data
    public static class ModifyRequest {
        @NotBlank
        private String username;
        @NotBlank
        private String userId;
        @NotBlank
        private String userpassword;
    }

    // --- inner 클래스 - ModifyResponse
    @Data
    public static class ModifyResponse {
        private final Member member;
    }

    // 유저정보 수정
    @PatchMapping("/{id}")
    public ModifyResponse modify(@Valid @RequestBody ModifyRequest modifyRequest, @PathVariable("id") Long id) {
        Member member = memberService.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                "%d번 유저는 존재하지 않습니다.".formatted(id)
        ));

        Member updatedMember = memberService.updateMember(
                member,
                modifyRequest.getUsername(),
                modifyRequest.getUserId(),
                modifyRequest.getUserpassword());

        return new ModifyResponse(updatedMember);
    }

    // inner 클래스 - removeResponse
    @Getter
    @AllArgsConstructor
    public static class RemoveResponse {
        private final Member member;
    }

    @DeleteMapping("/{id}")
    public RemoveResponse removeMember(@PathVariable("id") Long id) {
        Member member = memberService.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                "%d번 유저는 존재하지 않습니다.".formatted(id)
        ));

        memberService.deleteMember(id);
        return new RemoveResponse(member);
    }

    // ==== 로그인 관련

    @Getter
    public static class LoginRequestBody {
        @NotBlank
        private String username;
        @NotBlank
        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class LoginResponseBody {
        private MemberDto memberDto;
    }

    @PostMapping("/login")
    public LoginResponseBody login(@Valid @RequestBody LoginRequestBody loginRequest) {
        // username, password => accessToken
        MemberService.AuthAndMakeTokensResponseBody authAndMakeTokens = memberService.authAndMakeTokens(loginRequest.getUsername(), loginRequest.getPassword());
        return new LoginResponseBody(new MemberDto(
            authAndMakeTokens.getMember()
        ));
    }
}
