package com.ironhack.interactivegraphtheory.nodesservice.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.List;

@Entity
public class Node {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Boolean isRoot;
    private Integer xPos;
    private Integer yPos;
    @OneToMany(mappedBy = "startNode", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<NodeConnection> connectionList;
    @ManyToOne
    @JsonIgnore
    private Graph graph;

    public Node(Boolean isRoot, Integer xPos, Integer yPos) {
        this.isRoot = isRoot;
        this.xPos = xPos;
        this.yPos = yPos;
    }

    public Node() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonProperty(value = "isRoot")
    public Boolean getRoot() {
        return isRoot;
    }

    public void setRoot(Boolean root) {
        isRoot = root;
    }

    public Integer getXPos() {
        return xPos;
    }

    public void setXPos(Integer xPos) {
        this.xPos = xPos;
    }

    public Integer getYPos() {
        return yPos;
    }

    public void setYPos(Integer yPos) {
        this.yPos = yPos;
    }

    public List<NodeConnection> getConnectionList() {
        return connectionList;
    }

    public void setConnectionList(List<NodeConnection> connectionList) {
        this.connectionList = connectionList;
    }

    public Graph getGraph() {
        return graph;
    }

    public void setGraph(Graph graph) {
        this.graph = graph;
    }
}
