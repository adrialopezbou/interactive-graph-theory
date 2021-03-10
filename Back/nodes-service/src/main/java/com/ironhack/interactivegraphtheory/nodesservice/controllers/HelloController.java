package com.ironhack.interactivegraphtheory.nodesservice.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ironhack.interactivegraphtheory.nodesservice.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class HelloController {

    @Autowired
    private JwtUtil jwtTokenUtil;

    private ObjectMapper objectMapper = new ObjectMapper();

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String hello(@RequestHeader(name = "Authorization") String token) {
        try {
            Claims claims = jwtTokenUtil.extractAllClaims(token.substring(7));

            return claims.get("roles").toString();

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }
}
