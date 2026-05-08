package com.slowind.chunchunhee.domain.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CartDto {
    private Long cartId;
    private Long designerId;
    private Long customerId;
    private Long productId;

//    private String customerEmail;
    private String customerName;
//    private String customerPhone;
//    private String customerAddress;
//    private String customerCity;
//    private String customerZipCode;
//    private String customerPostalCode;
//    private String customerCountry;
}
