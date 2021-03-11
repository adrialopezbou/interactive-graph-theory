package com.ironhack.interactivegraphtheory.edgeservice.services.interfaces;

import com.ironhack.interactivegraphtheory.edgeservice.controllers.dtos.AuthenticationRequest;
import com.ironhack.interactivegraphtheory.edgeservice.controllers.dtos.GraphDto;
import com.ironhack.interactivegraphtheory.edgeservice.controllers.dtos.UserDto;
import org.springframework.http.ResponseEntity;

public interface IEdgeService {
    ResponseEntity<?> authenticate(AuthenticationRequest authenticationRequest);

    ResponseEntity<?> storeUser(UserDto userDto);

    ResponseEntity<?> getAllUserGraphs(String token);

    ResponseEntity<?> getGraph(String token, Long graphId);

    void storeGraph(String token, GraphDto graphDto);

    void deleteGraph(String token, Long graphId);
}
