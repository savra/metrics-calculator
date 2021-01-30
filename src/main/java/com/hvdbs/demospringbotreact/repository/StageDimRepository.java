package com.hvdbs.demospringbotreact.repository;

import com.hvdbs.demospringbotreact.model.StageDim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StageDimRepository extends JpaRepository<StageDim, Long> {
}
