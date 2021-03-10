package com.ironhack.interactivegraphtheory.nodesservice.repositories;

import com.ironhack.interactivegraphtheory.nodesservice.models.Node;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NodeRepository extends JpaRepository<Node, Long> {
}
