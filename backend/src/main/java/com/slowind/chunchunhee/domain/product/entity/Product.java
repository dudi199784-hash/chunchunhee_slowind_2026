package com.slowind.chunchunhee.domain.product.entity;

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
public class Product extends BaseEntity {
    private String product_name;
    private String product_description;
//    private String product_price;
//    private String product_image;
//    private String product_status;
//    private String product_type;
//    private String product_category;
}
