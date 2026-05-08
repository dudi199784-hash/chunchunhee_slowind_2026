package com.slowind.chunchunhee.domain.order.repository;

import com.slowind.chunchunhee.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {
}
