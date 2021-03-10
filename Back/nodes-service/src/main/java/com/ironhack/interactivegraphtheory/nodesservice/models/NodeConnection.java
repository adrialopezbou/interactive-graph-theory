package com.ironhack.interactivegraphtheory.nodesservice.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class NodeConnection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;
    @ManyToOne
    @JoinColumn(name = "start_node")
    @JsonIgnore
    private Node startNode;
    private Long endNode;

    public NodeConnection(Node startNode, Long endNode) {
        this.startNode = startNode;
        this.endNode = endNode;
    }

    public NodeConnection() {
    }

    public Node getStartNode() {
        return startNode;
    }

    public void setStartNode(Node startNode) {
        this.startNode = startNode;
    }

    public Long getEndNode() {
        return endNode;
    }

    public void setEndNode(Long endNode) {
        this.endNode = endNode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
