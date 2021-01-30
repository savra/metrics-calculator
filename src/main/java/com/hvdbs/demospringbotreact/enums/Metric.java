package com.hvdbs.demospringbotreact.enums;

public enum Metric {
    NPL("NPL"),
    RR("RR"),
    WRITE_OFF("Списания"),
    CESSIONS("Цессии"),
    DURATION_OF_MANUAL_OPERATIONS("Длительность ручных операций");

    private final String description;

    Metric(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return getDescription();
    }
}
