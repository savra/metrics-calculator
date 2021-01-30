package com.hvdbs.demospringbotreact.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "STAGE_DIM")
public class StageDim {
    private Long id;
    private String code;
    private String shortDescription;
    private String description;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STAGE_DIM_SEQ")
    @SequenceGenerator(name = "STAGE_DIM_SEQ", sequenceName = "STAGE_DIM_SEQ", allocationSize = 1)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NotNull
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Column(name = "SHORT_DESCRIPTION")
    @NotNull
    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    @NotNull
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
