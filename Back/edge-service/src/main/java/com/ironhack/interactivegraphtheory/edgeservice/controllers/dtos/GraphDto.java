package com.ironhack.interactivegraphtheory.edgeservice.controllers.dtos;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

public class GraphDto {
    @NotEmpty
    private String name;
    @NotNull
    private Boolean directed;
    @NotNull
    private Boolean weighted;
    @NotNull
    private Boolean binaryTree;
    @NotNull
    @Valid
    private List<NodeDto> nodeDtos;

    public List<NodeDto> getNodeDtos() {
        return nodeDtos;
    }

    public void setNodeDtos(List<NodeDto> nodeDtos) {
        this.nodeDtos = nodeDtos;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
