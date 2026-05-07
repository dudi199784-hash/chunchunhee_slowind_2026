package com.slowind.chunchunhee.domain.member.repository;

import com.slowind.chunchunhee.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
