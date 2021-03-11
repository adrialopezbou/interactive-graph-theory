package com.ironhack.interactivegraphtheory.edgeservice.controllers.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

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

    @JsonProperty(value = "isRoot")
    public Boolean getRoot() {
        return isRoot;
    }

    public void setRoot(Boolean root) {
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
