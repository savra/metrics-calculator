package com.hvdbs.demospringbotreact.repository;

import com.hvdbs.demospringbotreact.model.ProductDim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDimRepository extends JpaRepository<ProductDim, Long> {
}
