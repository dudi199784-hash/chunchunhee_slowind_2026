package com.slowind.chunchunhee.domain.product.service;

import com.slowind.chunchunhee.domain.product.entity.Product;
import com.slowind.chunchunhee.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getList() {
        return productRepository.findAll();
    }

    public Product getProduct(Long id) {
        Optional<Product> op = productRepository.findById(id);

        if (op.isEmpty()) { return null; }

        return op.get();
    }

    public void create(String name, String description) {
        Product product = Product.builder()
                .name(name)
                .description(description)
                .build();

        productRepository.save(product);
    }

}
