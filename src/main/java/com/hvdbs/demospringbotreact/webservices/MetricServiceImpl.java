package com.hvdbs.demospringbotreact.webservices;

import com.hvdbs.demospringbotreact.dataservices.MetricDataService;
import com.hvdbs.demospringbotreact.dto.ProductDimDto;
import com.hvdbs.demospringbotreact.dto.StageDimDto;
import com.hvdbs.demospringbotreact.mappers.ProductDimMapper;
import com.hvdbs.demospringbotreact.mappers.StageDimMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MetricServiceImpl implements MetricService {
    private final MetricDataService metricDataService;
    private final StageDimMapper stageDimMapper;
    private final ProductDimMapper productDimMapper;

    @Autowired
    public MetricServiceImpl(MetricDataService metricDataService, StageDimMapper stageDimMapper, ProductDimMapper productDimMapper) {
        this.metricDataService = metricDataService;
        this.stageDimMapper = stageDimMapper;
        this.productDimMapper = productDimMapper;
    }

    @Override
    public List<StageDimDto> getAllStages() {
        return stageDimMapper.fromEntity(metricDataService.getAllStages());
    }

    @Override
    public List<ProductDimDto> getAllProducts() {
        return productDimMapper.fromEntity(metricDataService.getAllProducts());
    }

    @Override
    public double getCalculatedMetricValue(String stageCode,
                                           String metricCode,
                                           double userAsIsValue,
                                           double bpAsIsValue,
                                           double userToBeValue,
                                           LocalDate releaseMonth) {
        return 55;
    }
}
