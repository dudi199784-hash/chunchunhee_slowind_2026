package com.slowind.chunchunhee.domain.product.entity;

import com.slowind.chunchunhee.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
public class Product extends BaseEntity {
    private String name;
    private String description;
//    private String price;
//    private String image;
//    private String status;
//    private String type;
//    private String category;
//    private Long stock;
}
