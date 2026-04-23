package com.slowind.chunchunhee.domain.product.controller;

import com.slowind.chunchunhee.domain.product.entity.Product;
import com.slowind.chunchunhee.domain.product.service.ProductService;
import com.slowind.chunchunhee.global.rsData.RsData;
import lombok.AllArgsConstructor;
import lombok.Getter;
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
    private final ProductService productService;

    // --- inner 클래스 - ProductsResponse
    @Getter
    @AllArgsConstructor
    public static class ProductsResponse {
        private final List<Product> products;
    }

    // --- 다건 조회
    @GetMapping("")
    public RsData<ProductsResponse> getProducts() {
        List<Product> products = productService.getList();
        return RsData.of("S-1","성공", new ProductsResponse(products));
    }


    // --- inner 클래스 - ProductResponse
    @Getter
    @AllArgsConstructor
    public static class ProductResponse {
        private final Product product;
    }

    // --- 단건 조회
    @GetMapping("{id}")
    public RsData<ProductResponse> getProduct(@PathVariable("id") Long id) {
        return productService.getProduct(id).map( product -> RsData.of(
                "S-1",
                "성공",
                             new ProductResponse(product)
                )).orElseGet(()-> RsData.of(
                        "F-1",
                "%d번 상품은 존재하지 않습니다.".formatted(id),
                        null
        ));
    }
}
