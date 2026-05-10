package com.slowind.chunchunhee.domain.community.entity;

import com.slowind.chunchunhee.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.stereotype.Service;

@Entity
@Getter
@Service
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString( callSuper = true )
public class Community extends BaseEntity {

}
