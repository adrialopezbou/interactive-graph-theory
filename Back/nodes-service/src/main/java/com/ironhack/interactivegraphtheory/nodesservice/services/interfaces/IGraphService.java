package com.ironhack.interactivegraphtheory.nodesservice.services.interfaces;

import com.ironhack.interactivegraphtheory.nodesservice.controllers.dtos.GraphDto;
import com.ironhack.interactivegraphtheory.nodesservice.models.Graph;

import java.util.List;

public interface IGraphService {
    void storeGraph(Long userId, GraphDto graphDto);

    Graph getGraph(Long userId, Long graphId);

    List<Graph> getAllUserGraphs(Long userId);

    void deleteGraph(Long userId, Long graphId);
}
