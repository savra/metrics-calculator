package com.hvdbs.demospringbotreact.mappers;

import com.hvdbs.demospringbotreact.dto.StageDimDto;
import com.hvdbs.demospringbotreact.model.StageDim;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StageDimMapper {
    List<StageDimDto> fromEntity(List<StageDim> stageDim);
    List<StageDim> toEntity(List<StageDimDto> stageDimDto);

}
