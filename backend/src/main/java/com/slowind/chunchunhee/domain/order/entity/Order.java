package com.slowind.chunchunhee.domain.order.entity;

import com.slowind.chunchunhee.domain.cart.entity.Cart;
import com.slowind.chunchunhee.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
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
public class Order extends BaseEntity {

    @ManyToOne
    @JoinColumn( name = "cart_id" )
    private Cart cart;

    private String cashStyle;
}
