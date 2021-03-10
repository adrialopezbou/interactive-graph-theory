package com.ironhack.interactivegraphtheory.userservice.controllers.interfaces;

import com.ironhack.interactivegraphtheory.userservice.controllers.dtos.AuthenticationRequest;
import com.ironhack.interactivegraphtheory.userservice.controllers.dtos.UserDto;
import com.ironhack.interactivegraphtheory.userservice.security.CustomUserDetails;
import org.springframework.http.ResponseEntity;

public interface IUserController {
    ResponseEntity<?> createAuthenticationToken(AuthenticationRequest authenticationRequest) throws Exception;

    CustomUserDetails storeUser(UserDto userDto);
}
