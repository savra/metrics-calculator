package com.hvdbs.demospringbotreact.webservices;

import com.hvdbs.demospringbotreact.dto.StageDimDto;

import java.time.LocalDate;
import java.util.List;

public interface MetricService {
    List<StageDimDto> getAllStages();

    double getCalculatedMetricValue(String stageCode,
                                    String metricCode,
                                    double userAsIsValue,
                                    double bpAsIsValue,
                                    double userToBeValue,
                                    LocalDate releaseMonth);
}
