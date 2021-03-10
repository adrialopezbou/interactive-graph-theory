package com.ironhack.interactivegraphtheory.nodesservice.models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Graph {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Boolean directed;
    private Boolean weighted;
    private Boolean binaryTree;
    private Long userId;

    @OneToMany(mappedBy = "graph", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Node> nodes;

    public Graph(String name, Boolean directed, Boolean weighted, Boolean binaryTree, Long userId) {
        this.name = name;
        this.directed = directed;
        this.weighted = weighted;
        this.binaryTree = binaryTree;
        this.userId = userId;
    }

    public Graph() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getDirected() {
        return directed;
    }

    public void setDirected(Boolean directed) {
        this.directed = directed;
    }

    public Boolean getWeighted() {
        return weighted;
    }

    public void setWeighted(Boolean weighted) {
        this.weighted = weighted;
    }

    public Boolean getBinaryTree() {
        return binaryTree;
    }

    public void setBinaryTree(Boolean binaryTree) {
        this.binaryTree = binaryTree;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<Node> getNodes() {
        return nodes;
    }

    public void setNodes(List<Node> nodes) {
        this.nodes = nodes;
    }
}
