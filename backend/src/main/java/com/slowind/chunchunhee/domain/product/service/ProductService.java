package com.slowind.chunchunhee.domain.product.service;

import com.slowind.chunchunhee.domain.product.entity.Product;
import com.slowind.chunchunhee.domain.product.repository.ProductRepository;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getList() {
        return productRepository.findAll();
    }

    public Optional<Product> getProduct(Long id) {
        return productRepository.findById(id);
    }

    @Transactional // 데이터 전송중에 문제가 생겼을때 rollback 가능
    public Product create(String title, String description, String category) {
        Product product = Product.builder()
                .title(title)
                .description(description)
                .category(category)
                .build();

        productRepository.save(product);

        return product;
    }

    public Optional<Product> findyById(Long id) {
        return productRepository.findById(id);
    }

    public Product modify(Product product, @NotBlank String title, @NotBlank String description, @NotBlank String category) {
        product.setTitle(title);
        product.setDescription(description);
        product.setCategory(category);
        productRepository.save(product);
        return product;
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

}
