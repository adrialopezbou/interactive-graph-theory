package com.ironhack.interactivegraphtheory.nodesservice.controllers.interfaces;

import com.ironhack.interactivegraphtheory.nodesservice.controllers.dtos.GraphDto;
import com.ironhack.interactivegraphtheory.nodesservice.models.Graph;

import java.util.List;

public interface IGraphController {
    List<Graph> getAllUserGraphs(String token);

    Graph getGraph(String token, Long graphId);

    void storeGraph(String token, GraphDto graphDto);

    void deleteGraph(String token, Long graphId);
}
