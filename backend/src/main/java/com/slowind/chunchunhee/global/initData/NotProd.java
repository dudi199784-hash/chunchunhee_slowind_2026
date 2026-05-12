package com.slowind.chunchunhee.global.initData;

import com.slowind.chunchunhee.domain.cart.entity.Cart;
import com.slowind.chunchunhee.domain.cart.service.CartService;
import com.slowind.chunchunhee.domain.design.entity.Design;
import com.slowind.chunchunhee.domain.design.service.DesignService;
import com.slowind.chunchunhee.domain.member.entity.Member;
import com.slowind.chunchunhee.domain.member.service.MemberService;
import com.slowind.chunchunhee.domain.order.service.OrderService;
import com.slowind.chunchunhee.domain.product.entity.Product;
import com.slowind.chunchunhee.domain.product.repository.ProductRepository;
import com.slowind.chunchunhee.domain.product.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.Collections;

@Configuration
@Profile({"dev","test"})
// --- 배포 제외 / 개발용 데이터
public class NotProd {
    @Bean
    CommandLineRunner initData(
            ProductService productService,
            MemberService memberService,
            DesignService designService,
            CartService cartService,
            OrderService orderService
    ) {
        return args -> {

            productService.create("상품명1", "서술1", "로고");
            productService.create("상품명2", "서술2", "유니폼");
            productService.create("상품명3", "서술3", "기타");
            productService.create("상품명4", "서술4", "기타");
            productService.create("상품명5", "서술5", "기타");

            memberService.createMember("홍길동","Hong","123");
            memberService.createMember("일지매","Lill","111");
            memberService.createMember("장영실","Jang","000");
            memberService.createMember("심청이","Sim","000");
            memberService.createMember("춘향이","Choon","000");

            // 🔥 조회
            Member member1 = memberService.findById(1L).get();
            Member member2 = memberService.findById(2L).get();
            Member member3 = memberService.findById(3L).get();
            Member member4 = memberService.findById(4L).get();
            Member member5 = memberService.findById(5L).get();

            Product product1 = productService.getProduct(1L).get();
            Product product2 = productService.getProduct(2L).get();
            Product product3 = productService.getProduct(3L).get();

            designService.create( member1.getId(), product1.getId(), "디자인1", "설명1", "로고" );
            designService.create( member2.getId(), product2.getId(), "디자인2", "설명2", "유니폼" );
            designService.create( member3.getId(), product3.getId(), "디자인3", "설명3", "기타" );
            designService.create( member4.getId(), product1.getId(), "디자인4", "설명4", product1.getCategory() );
            designService.create( member5.getId(), product1.getId(), "디자인5", "설명5", product1.getCategory() );

            Design design1 = designService.findById(1L).get();
            Design design2 = designService.findById(2L).get();
            Design design3 = designService.findById(3L).get();
            Design design4 = designService.findById(4L).get();
            Design design5 = designService.findById(5L).get();

            cartService.create(1L,
                    design1.getId(),
                    design1.getMember().getId(),
                    design1.getProduct().getId(),
                    design1.getMember().getUsername()
                    );

            cartService.create(2L,
                    design2.getId(),
                    design2.getMember().getId(),
                    design2.getProduct().getId(),
                    design2.getMember().getUsername()
            );

            cartService.create(3L,
                    design3.getId(),
                    design3.getMember().getId(),
                    design3.getProduct().getId(),
                    design3.getMember().getUsername()
            );

            cartService.create(4L,
                    design4.getId(),
                    design4.getMember().getId(),
                    design4.getProduct().getId(),
                    design4.getMember().getUsername()
            );

            cartService.create(5L,
                    design5.getId(),
                    design5.getMember().getId(),
                    design5.getProduct().getId(),
                    design5.getMember().getUsername()
            );

            Cart cart1 = cartService.findById(1L).get();
            Cart cart2 = cartService.findById(2L).get();
            Cart cart3 = cartService.findById(3L).get();
            Cart cart4 = cartService.findById(4L).get();
            Cart cart5 = cartService.findById(5L).get();

            orderService.createOrder(
                    cart1.getMember().getId(),
                    Collections.singletonList(cart1.getId())
            );

            orderService.createOrder(
                    cart2.getMember().getId(),
                    Collections.singletonList(cart2.getId())
            );

            orderService.createOrder(
                    cart3.getMember().getId(),
                    Collections.singletonList(cart3.getId())
            );
        };
    }
}
