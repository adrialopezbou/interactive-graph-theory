package com.ironhack.interactivegraphtheory.nodesservice.controllers.impl;

import com.ironhack.interactivegraphtheory.nodesservice.controllers.dtos.GraphDto;
import com.ironhack.interactivegraphtheory.nodesservice.controllers.interfaces.IGraphController;
import com.ironhack.interactivegraphtheory.nodesservice.models.Graph;
import com.ironhack.interactivegraphtheory.nodesservice.services.interfaces.IGraphService;
import com.ironhack.interactivegraphtheory.nodesservice.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
public class GraphController implements IGraphController {

    @Autowired
    private IGraphService graphService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @GetMapping("/get-graphs")
    public List<Graph> getAllUserGraphs(@RequestHeader(name = "Authorization") String token) {
        try {
            if (token.startsWith("Bearer ")) {
                Claims claims = jwtTokenUtil.extractAllClaims(token.substring(7));

                return graphService.getAllUserGraphs(Long.parseLong(claims.get("id").toString()));
            } else {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/get-graph/{graphId}")
    public Graph getGraph(@RequestHeader(name = "Authorization") String token, @PathVariable Long graphId) {
        try {
            if (token.startsWith("Bearer ")) {
                Claims claims = jwtTokenUtil.extractAllClaims(token.substring(7));
                return graphService.getGraph(Long.parseLong(claims.get("id").toString()), graphId);
            } else {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/store-graph")
    @ResponseStatus(HttpStatus.CREATED)
    public void storeGraph(@RequestHeader(name = "Authorization") String token, @RequestBody @Valid GraphDto graphDto) {
        try {
            Claims claims = jwtTokenUtil.extractAllClaims(token.substring(7));

            graphService.storeGraph(Long.parseLong(claims.get("id").toString()), graphDto);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    @DeleteMapping("/delete-graph/{graphId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteGraph(@RequestHeader(name = "Authorization") String token, @PathVariable Long graphId) {
        try {
            Claims claims = jwtTokenUtil.extractAllClaims(token.substring(7));

            graphService.deleteGraph(Long.parseLong(claims.get("id").toString()), graphId);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }
}
