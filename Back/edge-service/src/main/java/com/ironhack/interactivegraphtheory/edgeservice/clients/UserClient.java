package com.ironhack.interactivegraphtheory.edgeservice.clients;

import com.ironhack.interactivegraphtheory.edgeservice.controllers.dtos.AuthenticationRequest;
import com.ironhack.interactivegraphtheory.edgeservice.controllers.dtos.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("user-service")
public interface UserClient {

    @PostMapping("/authenticate")
    ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest);

    @PostMapping("/store-user")
    ResponseEntity<?> storeUser(@RequestBody UserDto userDto);

}
