package com.slowind.chunchunhee.global.initData;

import com.slowind.chunchunhee.domain.design.service.DesignService;
import com.slowind.chunchunhee.domain.member.entity.Member;
import com.slowind.chunchunhee.domain.member.service.MemberService;
import com.slowind.chunchunhee.domain.product.entity.Product;
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
    CommandLineRunner initData(
            ProductService productService,
            MemberService memberService,
            DesignService designService
    ) {
        return args -> {
            productService.create("상품명1", "서술1", "로고");
            productService.create("상품명2", "서술2", "유니폼");
            productService.create("상품명3", "서술3", "기타");

            memberService.createMember("홍길동","Hong","123");
            memberService.createMember("일지매","Lill","111");
            memberService.createMember("장영실","Jang","000");

            // 🔥 조회
            Member member1 = memberService.findById(1L).get();
            Member member2 = memberService.findById(2L).get();
            Member member3 = memberService.findById(3L).get();
            Product product1 = productService.getProduct(1L).get();
            Product product2 = productService.getProduct(2L).get();
            Product product3 = productService.getProduct(3L).get();

            designService.create( member1.getId(), product1.getId(), "디자인1", "설명1", "로고" );
            designService.create( member2.getId(), product2.getId(), "디자인2", "설명2", "유니폼" );
            designService.create( member3.getId(), product3.getId(), "디자인3", "설명3", "기타" );
        };
    }
}
