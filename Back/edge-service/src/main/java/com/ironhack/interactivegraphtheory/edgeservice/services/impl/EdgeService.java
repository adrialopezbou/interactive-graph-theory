package com.ironhack.interactivegraphtheory.edgeservice.services.impl;

import com.ironhack.interactivegraphtheory.edgeservice.clients.NodesClient;
import com.ironhack.interactivegraphtheory.edgeservice.clients.UserClient;
import com.ironhack.interactivegraphtheory.edgeservice.controllers.dtos.AuthenticationRequest;
import com.ironhack.interactivegraphtheory.edgeservice.controllers.dtos.GraphDto;
import com.ironhack.interactivegraphtheory.edgeservice.controllers.dtos.UserDto;
import com.ironhack.interactivegraphtheory.edgeservice.services.interfaces.IEdgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.circuitbreaker.resilience4j.Resilience4JCircuitBreakerFactory;
import org.springframework.cloud.client.circuitbreaker.CircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.CircuitBreakerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EdgeService implements IEdgeService {

    @Autowired
    private UserClient userClient;

    @Autowired
    private NodesClient nodesClient;

    private CircuitBreakerFactory circuitBreakerFactory = new Resilience4JCircuitBreakerFactory();


    public ResponseEntity<?> authenticate(AuthenticationRequest authenticationRequest) {
        CircuitBreaker authenticateCircuitBreaker = circuitBreakerFactory.create("user-service");
        return authenticateCircuitBreaker.run(() -> userClient.createAuthenticationToken(authenticationRequest), throwable -> authenticateFallback());
    }

    private <T> T authenticateFallback() {
        throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE);
    }

    public ResponseEntity<?> storeUser(UserDto userDto) {
        CircuitBreaker storeUserCircuitBreaker = circuitBreakerFactory.create("user-service");
        return storeUserCircuitBreaker.run(() -> userClient.storeUser(userDto), throwable -> storeUserFallback());
    }

    private ResponseEntity<?> storeUserFallback() {
        throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE);
    }

    public ResponseEntity<?> getAllUserGraphs(String token) {
        CircuitBreaker getAllUserGraphsCircuitBreaker = circuitBreakerFactory.create("nodes-service");
        return getAllUserGraphsCircuitBreaker.run(() -> nodesClient.getAllUserGraphs(token), throwable -> getAllUserGraphsFallback());
    }

    private ResponseEntity<?> getAllUserGraphsFallback() {
        throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE);
    }

    public ResponseEntity<?> getGraph(String token, Long graphId) {
        CircuitBreaker getGraphCircuitBreaker = circuitBreakerFactory.create("nodes-service");
        return getGraphCircuitBreaker.run(() -> nodesClient.getGraph(token, graphId), throwable -> getGraphFallback());
    }

    private ResponseEntity<?> getGraphFallback() {
        throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE);
    }

    public void storeGraph(String token, GraphDto graphDto) {
        nodesClient.storeGraph(token, graphDto);
    }

    public void deleteGraph(String token, Long graphId) {
        nodesClient.deleteGraph(token, graphId);
    }
}
