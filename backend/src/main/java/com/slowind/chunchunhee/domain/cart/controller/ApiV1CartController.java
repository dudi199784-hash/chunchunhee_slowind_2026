package com.slowind.chunchunhee.domain.cart.controller;

import com.slowind.chunchunhee.domain.cart.dto.CartDto;
import com.slowind.chunchunhee.domain.cart.entity.Cart;
import com.slowind.chunchunhee.domain.cart.service.CartService;
import com.slowind.chunchunhee.global.exception.ResourceNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/carts")
public class ApiV1CartController {
    private final CartService cartService;

    // --- 다건 조횐
    @GetMapping("")
    public List<CartDto> getCarts(
            @RequestParam( value = "user", required = false ) Long userSerial,
            @RequestParam( value = "product", required = false ) Long productSerial,
            @RequestParam( value = "design", required = false ) Long designSerial,
            @RequestParam( value = "category", required = false ) String category
    ) {
        List<Cart> carts = cartService.getList(
                userSerial,
                productSerial,
                designSerial,
                category
        );

        return carts.stream()
                .map( c -> new CartDto(
                                c.getId(),
                                c.getDesign().getId(),
                                c.getMember().getId(),
                                c.getProduct().getId(),
                                c.getMember().getUsername()
                        ))
                .toList();
    }

    // --- 단건 조회
    @GetMapping("{id}")
    public CartDto getCart(@Valid @PathVariable("id") Long id) {
        Cart c = cartService.getCart(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "%d번 카트상품은 존재하지않습니다.".formatted(id)
                ));
        return new CartDto(
                c.getId(),
                c.getDesign().getId(),
                c.getMember().getId(),
                c.getProduct().getId(),
                c.getMember().getUsername()
        );
    }

    // --- inner 클래스 카트 추가 요청
    @Getter
    @AllArgsConstructor
    public static class AddCartRequest {
        @NotNull
        private Long cartId;
        @NotNull
        private Long designId;
        @NotNull
        private Long customerId;
        @NotNull
        private Long productId;

        @NotBlank
        private String customerName;
    }

    @Getter
    @AllArgsConstructor
    public static class AddCartResponse {
        private final Cart cart;
    }

    // --- 카트에 상품 추가
    @PostMapping("")
    public AddCartResponse addCart(@Valid @RequestBody AddCartRequest addCartRequest) {

        Cart c = cartService.create(
                addCartRequest.getCartId(),
                addCartRequest.getDesignId(),
                addCartRequest.getCustomerId(),
                addCartRequest.getProductId(),
                addCartRequest.getCustomerName()
        );

        return new AddCartResponse(c);
    }

    // --- inner 클래스 카트 수정 요청
    @Getter
    @AllArgsConstructor
    public static class ModifyCartRequest {
        @NotNull
        private Long cartId;
        @NotNull
        private Long productId;
        @NotNull
        private Long customerId;
        @NotNull
        private Long designId;

        @NotBlank
        private String customerName;
        @NotBlank
        private String designTitle;
    }

    @Getter
    @AllArgsConstructor
    public static class ModifyCartResponse {
        private final Cart cart;
    }

    @PatchMapping("{id}")
    public ModifyCartResponse modifyCart(@Valid @RequestBody ModifyCartRequest modifyCartRequest, @PathVariable("id") Long id) {
        Cart cart = cartService.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                "%d번 카트상품은 존재하지 않습니다.".formatted(id)
        ));

        Cart updateCart = cartService.update(
                cart,
                modifyCartRequest.getCartId(),
                modifyCartRequest.getProductId(),
                modifyCartRequest.getCustomerId(),
                modifyCartRequest.getDesignId(),
                modifyCartRequest.getCustomerName(),
                modifyCartRequest.getDesignTitle()
        );

        return new ModifyCartResponse(updateCart);
    }

    // --- inner 클래스 - 카트 제거
    @Getter
    @AllArgsConstructor
    public static class RemoveCartResponse {
        private final Cart cart;
    }
    @DeleteMapping("{id}")
    public RemoveCartResponse remove(@PathVariable("id") Long id) {
        Cart cart = cartService.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                "%d번 카트는 존재하지않습니다.".formatted(id)
        ));

        cartService.delete(id);
        return new RemoveCartResponse(cart);
    }

}
