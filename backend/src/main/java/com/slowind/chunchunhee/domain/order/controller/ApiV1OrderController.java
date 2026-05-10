package com.slowind.chunchunhee.domain.order.controller;

import com.slowind.chunchunhee.domain.order.dto.OrderItemDto;
import com.slowind.chunchunhee.domain.order.entity.Order;
import com.slowind.chunchunhee.domain.order.service.OrderService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
public class ApiV1OrderController {
    private final OrderService orderService;

    @Getter
    @AllArgsConstructor
    public static class OrdersItemResponse {
        private final List<Order> orders;
    }
    @GetMapping("")
    public OrdersItemResponse orders(
            @RequestParam( value = "user", required = false ) Long userSerial
    ) {
        List<Order> orders = orderService.getList(userSerial);
        return new OrdersItemResponse(orders);
    }


    @Getter
    @AllArgsConstructor
    public static class OrderItemDto {
        private Long orderId;
        private String userName;
        private Integer quantity;
        private Integer totalPrice;
    }

    @GetMapping("{id}")
    public OrderItemDto order(
            @Valid @PathVariable("id") Long orderId,
            @RequestParam( value = "user", required = false ) Long userSerial
    ){
        Order order = orderService.getOrder(orderId).get();

        return new OrderItemDto(
                order.getId(),
                order.getMember().getUsername(),
                order.getQuantity(),
                order.getTotalPrice()
        );
    }

    @Getter
    @AllArgsConstructor
    public static class AddOrderRequest {
        @NotNull
        private Long userId;
        @NotNull
        private Long orderId;
    }

    @Getter
    @AllArgsConstructor
    public static class AddOrderResponse {
        private final Order order;
    }
    @PostMapping("")
    public AddOrderResponse addOrder(@Valid @RequestBody AddOrderRequest addOrderRequest) {
        Order order = orderService.createOrder(addOrderRequest.getUserId(), addOrderRequest.getOrderId());
        return new AddOrderResponse(order);
    }


}
