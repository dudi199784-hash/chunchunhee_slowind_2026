package com.slowind.chunchunhee.domain.product.repository;

import com.slowind.chunchunhee.domain.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
