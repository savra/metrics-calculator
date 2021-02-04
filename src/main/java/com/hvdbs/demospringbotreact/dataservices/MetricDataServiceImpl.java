package com.hvdbs.demospringbotreact.dataservices;

import com.hvdbs.demospringbotreact.model.ProductDim;
import com.hvdbs.demospringbotreact.model.StageDim;
import com.hvdbs.demospringbotreact.repository.ProductDimRepository;
import com.hvdbs.demospringbotreact.repository.StageDimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetricDataServiceImpl implements MetricDataService {
    private final StageDimRepository stageDimRepository;
    private final ProductDimRepository productDimRepository;

    @Autowired
    public MetricDataServiceImpl(StageDimRepository stageDimRepository, ProductDimRepository productDimRepository) {
        this.stageDimRepository = stageDimRepository;
        this.productDimRepository = productDimRepository;
    }

    @Override
    public List<StageDim> getAllStages() {
        return stageDimRepository.findAll();
    }

    @Override
    public List<ProductDim> getAllProducts() {
        return productDimRepository.findAll();
    }
}
