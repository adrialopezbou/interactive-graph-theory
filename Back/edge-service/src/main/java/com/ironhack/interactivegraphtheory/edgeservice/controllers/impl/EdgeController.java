package com.ironhack.interactivegraphtheory.edgeservice.controllers.impl;

import com.ironhack.interactivegraphtheory.edgeservice.controllers.dtos.AuthenticationRequest;
import com.ironhack.interactivegraphtheory.edgeservice.controllers.dtos.GraphDto;
import com.ironhack.interactivegraphtheory.edgeservice.controllers.dtos.UserDto;
import com.ironhack.interactivegraphtheory.edgeservice.controllers.interfaces.IEdgeController;
import com.ironhack.interactivegraphtheory.edgeservice.services.interfaces.IEdgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class EdgeController implements IEdgeController {

    @Autowired
    private IEdgeService edgeService;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        return edgeService.authenticate(authenticationRequest);
    }

    @PostMapping("/store-user")
    public ResponseEntity<?> storeUser(@RequestBody UserDto userDto) {
        return edgeService.storeUser(userDto);
    }

    @GetMapping("/get-graphs")
    public ResponseEntity<?> getAllUserGraphs(@RequestHeader(name = "Authorization") String token) {
        return edgeService.getAllUserGraphs(token);
    }

    @GetMapping("/get-graph/{graphId}")
    public ResponseEntity<?> getGraph(@RequestHeader(name = "Authorization") String token, @PathVariable Long graphId) {
        return edgeService.getGraph(token, graphId);
    }

    @PostMapping("/store-graph")
    @ResponseStatus(HttpStatus.CREATED)
    public void storeGraph(@RequestHeader(name = "Authorization") String token, @RequestBody @Valid GraphDto graphDto) {
        edgeService.storeGraph(token, graphDto);
    }

    @DeleteMapping("/delete-graph/{graphId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteGraph(@RequestHeader(name = "Authorization") String token, @PathVariable Long graphId) {
        edgeService.deleteGraph(token, graphId);
    }

}
