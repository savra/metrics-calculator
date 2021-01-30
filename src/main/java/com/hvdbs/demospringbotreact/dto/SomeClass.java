package com.hvdbs.demospringbotreact.dto;

import java.time.LocalDate;

public class SomeClass {
    private String stageCode;
    private String metricCode;
    private double userAsIsValue;
    private double bpAsIsValue;
    private double userToBeValue;
    private LocalDate releaseMonth;

    public String getStageCode() {
        return stageCode;
    }

    public void setStageCode(String stageCode) {
        this.stageCode = stageCode;
    }

    public String getMetricCode() {
        return metricCode;
    }

    public void setMetricCode(String metricCode) {
        this.metricCode = metricCode;
    }

    public double getUserAsIsValue() {
        return userAsIsValue;
    }

    public void setUserAsIsValue(double userAsIsValue) {
        this.userAsIsValue = userAsIsValue;
    }

    public double getBpAsIsValue() {
        return bpAsIsValue;
    }

    public void setBpAsIsValue(double bpAsIsValue) {
        this.bpAsIsValue = bpAsIsValue;
    }

    public double getUserToBeValue() {
        return userToBeValue;
    }

    public void setUserToBeValue(double userToBeValue) {
        this.userToBeValue = userToBeValue;
    }

    public LocalDate getReleaseMonth() {
        return releaseMonth;
    }

    public void setReleaseMonth(LocalDate releaseMonth) {
        this.releaseMonth = releaseMonth;
    }
}
