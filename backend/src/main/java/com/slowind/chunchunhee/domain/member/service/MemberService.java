package com.slowind.chunchunhee.domain.member.service;

import com.slowind.chunchunhee.domain.member.entity.Member;
import com.slowind.chunchunhee.domain.member.repository.MemberRepository;
import com.slowind.chunchunhee.global.exception.ResourceNotFoundException;
import com.slowind.chunchunhee.global.jwt.JwtProvider;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;

    // 모든 사용자 --- 유저 조회
    public List<Member> getMemberLlist() {
        return memberRepository.findAll();
    }

    // 모든 사용자 --- 단일 유저 조회
    public Optional<Member> getMemberById(Long id) {
        return memberRepository.findById(id);
    }
    // 멤버 존재 여부
    public Optional<Member> findById(Long id) {
        return memberRepository.findById(id);
    }

    // 모든 사용자 --- 유저 생성
    @Transactional
    public Member createMember(String username, String userId, String userpassword) {
        Member member = Member.builder()
                .username(username)
                .userId(userId)
                .userpassword(userpassword)
                .build();

        memberRepository.save(member);
        return member;
    }

    // 모든 사용자 --- 유저정보 수정
    public Member updateMember(Member member, @NotBlank String username, @NotBlank String userId, @NotBlank String userpassword) {
        member.setUsername(username);
        member.setUserId(userId);
        member.setUserpassword(userpassword);

        memberRepository.save(member);
        return member;
    }

    // 모든 사용자 --- 유저 탈퇴 / 삭제
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }

    @Getter
    @AllArgsConstructor
    public static class AuthAndMakeTokensResponseBody {
        private Member member;
        private String accessToken;
    }

    public AuthAndMakeTokensResponseBody authAndMakeTokens(@NotBlank String username, @NotBlank String password) {
        Member member = memberRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException(
                "%s 회원은 존재하지않습니다.".formatted(username)));

        // 시간 설정 및 토큰 생성
        String accessToken = jwtProvider.genToken(member,60 * 60 * 5);

        System.out.println("accessToken: " + accessToken);

        return new AuthAndMakeTokensResponseBody(member, accessToken);
    }
}
