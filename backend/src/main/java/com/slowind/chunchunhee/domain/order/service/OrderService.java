package com.slowind.chunchunhee.domain.order.service;

import com.slowind.chunchunhee.domain.cart.entity.Cart;
import com.slowind.chunchunhee.domain.cart.repository.CartRepository;
import com.slowind.chunchunhee.domain.member.entity.Member;
import com.slowind.chunchunhee.domain.member.repository.MemberRepository;
import com.slowind.chunchunhee.domain.order.entity.Order;
import com.slowind.chunchunhee.domain.order.entity.OrderItem;
import com.slowind.chunchunhee.domain.order.repository.OrderRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {
        private final MemberRepository memberRepository;
        private final CartRepository cartRepository;
        private final OrderRepository orderRepository;

    public List<Order> getList(Long memberId) {
        if (memberId != null) {
            return orderRepository.findByMemberId(memberId);
        }
        return orderRepository.findAll();
    }

    public Optional<Order> getOrder(Long orderId) {
        return orderRepository.findById(orderId);
    }

    public Optional<Order> findById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    @Transactional
    public Order createOrder(Long memberId, Long cartId) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow();

        List<Cart> carts = cartRepository.findByMemberId(memberId);

        Order order = new Order();
        order.setMember(member);

        List<OrderItem> items = carts.stream()
                .map(cart -> {

                        OrderItem item = new OrderItem();

                    if (cartId.equals(cart.getId())) {
                        item.setOrder(order);
                        item.setProduct(cart.getProduct());
                        item.setDesign(cart.getDesign());
                        item.setQuantity(cart.getQuantity());

                        item.setPrice(cart.getProduct().getPrice());
                    }
                    return item;
                })
                .toList();

        order.setItems(items);

        orderRepository.save(order);

        // ⭐ 주문 후 카트 비우기
        cartRepository.deleteAll(carts);

        return order;
    }

//    @Transactional
//    public OrderItem update(Long orderId, String userName, String designerName) {
//    }

    public void updateStatus(Long orderId, @NotBlank String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow();
        order.setStatus(status);
        orderRepository.save(order);
    }

    public void delete(Long orderId) {
        orderRepository.deleteById(orderId);
    }
}
