package com.ironhack.interactivegraphtheory.edgeservice.clients;

import com.ironhack.interactivegraphtheory.edgeservice.controllers.dtos.GraphDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@FeignClient("nodes-service")
public interface NodesClient {
    @GetMapping("/get-graphs")
    ResponseEntity<?> getAllUserGraphs(@RequestHeader(name = "Authorization") String token);

    @GetMapping("/get-graph/{graphId}")
    ResponseEntity<?> getGraph(@RequestHeader(name = "Authorization") String token, @PathVariable Long graphId);

    @PostMapping("/store-graph")
    @ResponseStatus(HttpStatus.CREATED)
    void storeGraph(@RequestHeader(name = "Authorization") String token, @RequestBody @Valid GraphDto graphDto);

    @DeleteMapping("/delete-graph/{graphId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteGraph(@RequestHeader(name = "Authorization") String token, @PathVariable Long graphId);
}
