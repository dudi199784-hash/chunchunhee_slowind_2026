package com.slowind.chunchunhee.domain.member.repository;

import com.slowind.chunchunhee.domain.member.entity.Member;
import com.slowind.chunchunhee.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
