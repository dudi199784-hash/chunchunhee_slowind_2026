package com.slowind.chunchunhee.domain.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.slowind.chunchunhee.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
public class Member extends BaseEntity {
    private String username;
    private String userId;

    @JsonIgnore
    private String userpassword;
    private String refreshToken;
//    private String email;
//    private String phone;
}
