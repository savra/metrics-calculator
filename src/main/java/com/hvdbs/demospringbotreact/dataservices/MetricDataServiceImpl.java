package com.hvdbs.demospringbotreact.dataservices;

import com.hvdbs.demospringbotreact.model.StageDim;
import com.hvdbs.demospringbotreact.repository.StageDimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetricDataServiceImpl implements MetricDataService {
    private final StageDimRepository stageDimRepository;

    @Autowired
    public MetricDataServiceImpl(StageDimRepository stageDimRepository) {
        this.stageDimRepository = stageDimRepository;
    }

    @Override
    public List<StageDim> getAllStages() {
        return stageDimRepository.findAll();
    }
}
