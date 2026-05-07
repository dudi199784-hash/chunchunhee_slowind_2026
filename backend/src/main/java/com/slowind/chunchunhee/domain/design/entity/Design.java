package com.slowind.chunchunhee.domain.design.entity;

import com.slowind.chunchunhee.domain.member.entity.Member;
import com.slowind.chunchunhee.domain.product.entity.Product;
import com.slowind.chunchunhee.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
public class Design extends BaseEntity {
    // 유저 정보
    @ManyToOne
    private Member member;

    // 상품 정보
    @ManyToOne
    private Product product;

    // 디자인
    private String designTitle;
    private String designDescription;
    private String designCategory;
}
