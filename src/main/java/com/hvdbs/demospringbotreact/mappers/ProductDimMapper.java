package com.hvdbs.demospringbotreact.mappers;

import com.hvdbs.demospringbotreact.dto.ProductDimDto;
import com.hvdbs.demospringbotreact.model.ProductDim;
import com.hvdbs.demospringbotreact.model.StageDim;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductDimMapper {
    List<ProductDimDto> fromEntity(List<ProductDim> stageDim);
    List<ProductDim> toEntity(List<ProductDimDto> stageDimDto);
}
