package com.ironhack.interactivegraphtheory.nodesservice.repositories;

import com.ironhack.interactivegraphtheory.nodesservice.models.NodeConnection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NodeConnectionRepository extends JpaRepository<NodeConnection, Long> {
}
