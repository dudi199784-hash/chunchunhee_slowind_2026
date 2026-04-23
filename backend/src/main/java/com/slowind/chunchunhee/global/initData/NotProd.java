package com.slowind.chunchunhee.global.initData;

import com.slowind.chunchunhee.domain.product.repository.ProductRepository;
import com.slowind.chunchunhee.domain.product.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile({"dev","test"})
// --- 배포 제외 / 개발용 데이터
public class NotProd {
    @Bean
    CommandLineRunner initData(ProductService productService) {
        return args -> {
            productService.create("상품명", "서술");
            productService.create("상품명2", "서술2");
        };
    }
}
