package com.ironhack.interactivegraphtheory.nodesservice.services.impl;

import com.ironhack.interactivegraphtheory.nodesservice.controllers.dtos.GraphDto;
import com.ironhack.interactivegraphtheory.nodesservice.controllers.dtos.NodeDto;
import com.ironhack.interactivegraphtheory.nodesservice.models.Graph;
import com.ironhack.interactivegraphtheory.nodesservice.models.Node;
import com.ironhack.interactivegraphtheory.nodesservice.models.NodeConnection;
import com.ironhack.interactivegraphtheory.nodesservice.repositories.GraphRepository;
import com.ironhack.interactivegraphtheory.nodesservice.repositories.NodeConnectionRepository;
import com.ironhack.interactivegraphtheory.nodesservice.repositories.NodeRepository;
import com.ironhack.interactivegraphtheory.nodesservice.services.interfaces.IGraphService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GraphService implements IGraphService {

    @Autowired
    private GraphRepository graphRepository;

    @Autowired
    private NodeRepository nodeRepository;

    @Autowired
    private NodeConnectionRepository nodeConnectionRepository;

    public void storeGraph(Long userId, GraphDto graphDto) {
        Graph graph = graphRepository.save(new Graph(graphDto.getName(), graphDto.getDirected(), graphDto.getWeighted(), graphDto.getBinaryTree(), userId));

        Map<Long, Node> nodeMap = new HashMap<>(); //Map for keeping track of front-end id nodes
        Map<Long, List<Long>> connectionMap = new HashMap<>(); //Map for keeping track of front-end node lists
        for (NodeDto node : graphDto.getNodeDtos()) {
            Node repoNode = new Node(node.getRoot(), node.getxPos(), node.getyPos());
            repoNode.setGraph(graph);
            repoNode = nodeRepository.save(repoNode);
            nodeMap.put(node.getId(), repoNode);
            connectionMap.put(node.getId(), node.getConnections());
        }
        List<Node> finalNodeList = new ArrayList<>();
        //Going throw the node map to assign new repo ids to the connection lists
        for (Map.Entry<Long, Node> entry : nodeMap.entrySet()) {
            List<NodeConnection> nodeConnection = new ArrayList<>();
            for (Long endNode : connectionMap.get(entry.getKey())) {
                nodeConnection.add(new NodeConnection(entry.getValue(), nodeMap.get(endNode).getId()));
            }
            entry.getValue().setConnectionList(nodeConnection);
            finalNodeList.add(nodeRepository.save(entry.getValue()));
        }
        //Saving the node list with the user id
        graph.setNodes(finalNodeList);
        graphRepository.save(graph);
    }

    public Graph getGraph(Long userId, Long graphId) {
        List<Graph> graphs = graphRepository.findByIdAndUserId(graphId, userId);
        if (graphs.size() == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return graphs.get(0);
    }

    public List<Graph> getAllUserGraphs(Long userId) {
        return graphRepository.findByUserId(userId);
    }

    public void deleteGraph(Long userId, Long graphId) {
        List<Graph> graphs = graphRepository.findByIdAndUserId(graphId, userId);
        if (graphs.size() == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        graphRepository.deleteById(graphId);
    }

}
