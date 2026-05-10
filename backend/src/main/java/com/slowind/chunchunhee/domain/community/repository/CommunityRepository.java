package com.slowind.chunchunhee.domain.community.repository;

import com.slowind.chunchunhee.domain.community.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long> {
}
