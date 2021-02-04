package com.hvdbs.demospringbotreact.dataservices;

import com.hvdbs.demospringbotreact.model.ProductDim;
import com.hvdbs.demospringbotreact.model.StageDim;

import java.util.List;

public interface MetricDataService {
    List<StageDim> getAllStages();

    List<ProductDim> getAllProducts();
}
