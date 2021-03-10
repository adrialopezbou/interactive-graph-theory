package com.ironhack.interactivegraphtheory.nodesservice.repositories;

import com.ironhack.interactivegraphtheory.nodesservice.models.Graph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GraphRepository extends JpaRepository<Graph, Long> {
    List<Graph> findByIdAndUserId(Long id, Long userId);

    List<Graph> findByUserId(Long userId);
}
