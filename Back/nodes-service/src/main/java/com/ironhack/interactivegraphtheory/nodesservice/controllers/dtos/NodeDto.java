package com.ironhack.interactivegraphtheory.nodesservice.controllers.dtos;

import javax.validation.constraints.NotNull;
import java.util.List;

public class NodeDto {
    @NotNull
    private Long id;
    @NotNull
    private Boolean isRoot;
    @NotNull
    private Integer xPos;
    @NotNull
    private Integer yPos;
    @NotNull
    private List<Long> connections;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getRoot() {
        return isRoot;
    }

    public void setIsRoot(Boolean root) {
        isRoot = root;
    }

    public Integer getxPos() {
        return xPos;
    }

    public void setxPos(Integer xPos) {
        this.xPos = xPos;
    }

    public Integer getyPos() {
        return yPos;
    }

    public void setyPos(Integer yPos) {
        this.yPos = yPos;
    }

    public List<Long> getConnections() {
        return connections;
    }

    public void setConnections(List<Long> connections) {
        this.connections = connections;
    }
}
