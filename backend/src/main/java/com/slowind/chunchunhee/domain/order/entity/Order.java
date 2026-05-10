package com.slowind.chunchunhee.domain.order.entity;

import com.slowind.chunchunhee.domain.member.entity.Member;
import com.slowind.chunchunhee.global.jpa.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
@Table(name = "orders")
public class Order extends BaseEntity {

    // 구매 유저 정보
    @ManyToOne
    @JoinColumn( name = "member_id")
    private Member member;

    // 주문 정보
    @OneToMany(mappedBy = "order" , cascade = CascadeType.ALL)
    private List<OrderItem> items;

    private int quantity;
    private int totalPrice;
    private String status;
}
