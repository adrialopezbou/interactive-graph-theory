package com.ironhack.interactivegraphtheory.userservice.controllers.impl;

import com.ironhack.interactivegraphtheory.userservice.controllers.dtos.AuthenticationRequest;
import com.ironhack.interactivegraphtheory.userservice.controllers.dtos.AuthenticationResponse;
import com.ironhack.interactivegraphtheory.userservice.controllers.dtos.UserDto;
import com.ironhack.interactivegraphtheory.userservice.controllers.interfaces.IUserController;
import com.ironhack.interactivegraphtheory.userservice.security.CustomUserDetails;
import com.ironhack.interactivegraphtheory.userservice.services.impl.CustomUserDetailsService;
import com.ironhack.interactivegraphtheory.userservice.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserController implements IUserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            return null;
        }

        final CustomUserDetails customUserDetails = customUserDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtTokenUtil.generateToken(customUserDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @RequestMapping(value = "/store-user", method = RequestMethod.POST)
    public CustomUserDetails storeUser(@RequestBody UserDto userDto) {
        return customUserDetailsService.storeUser(userDto);
    }
}
