package com.slowind.chunchunhee.domain.member.dto;

import com.slowind.chunchunhee.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MemberDto {
    private Long id;
    private String userId;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;

    public MemberDto(Member member) {
        this.id = member.getId();
        this.userId = member.getUserId();
        this.createTime = member.getCreateTime();
        this.modifyTime = member.getUpdateTime();
    }
}
