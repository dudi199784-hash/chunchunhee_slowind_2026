package com.slowind.chunchunhee.domain.product.controller;

import com.slowind.chunchunhee.domain.product.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
public class ApiV1ProductController {

    // --- 다건 조회
    @GetMapping("")
    public List<Product> getProducts() {
        List<Product> products = new ArrayList<>();
        return products;
    }

    // --- 단건 조회
    @GetMapping("{id}")
    public Product getProduct(@PathVariable("id") Long id) {
        Product product = new Product();
        return product;
    }
}
