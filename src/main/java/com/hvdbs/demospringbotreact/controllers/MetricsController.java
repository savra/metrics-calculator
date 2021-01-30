package com.hvdbs.demospringbotreact.controllers;

import com.hvdbs.demospringbotreact.dto.SomeClass;
import com.hvdbs.demospringbotreact.dto.StageDimDto;
import com.hvdbs.demospringbotreact.webservices.MetricService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/metrics-calculator")
@CrossOrigin("*")
public class MetricsController {
    private final MetricService metricService;

    @Autowired
    public MetricsController(MetricService metricService) {
        this.metricService = metricService;
    }

    @GetMapping("/getAllStages")
    public List<StageDimDto> getAllStages() {
        return metricService.getAllStages();
    }

    @PostMapping("/calculate")
    public double getCalculatedMetricValue(@RequestBody SomeClass gg) {
        return 66;
    }
}

