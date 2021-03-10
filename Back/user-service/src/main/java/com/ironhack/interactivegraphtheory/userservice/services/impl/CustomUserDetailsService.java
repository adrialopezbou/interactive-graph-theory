package com.ironhack.interactivegraphtheory.userservice.services.impl;

import com.ironhack.interactivegraphtheory.userservice.controllers.dtos.UserDto;
import com.ironhack.interactivegraphtheory.userservice.models.Role;
import com.ironhack.interactivegraphtheory.userservice.models.User;
import com.ironhack.interactivegraphtheory.userservice.repositories.RoleRepository;
import com.ironhack.interactivegraphtheory.userservice.repositories.UserRepository;
import com.ironhack.interactivegraphtheory.userservice.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return null;
        }

        return new CustomUserDetails(user.get());
    }

    public CustomUserDetails storeUser(UserDto userDto) {
        if (loadUserByUsername(userDto.getUsername()) == null) {
            return new CustomUserDetails(saveUser(userDto));
        }
        return null;
    }

    private User saveUser(UserDto userDto) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User user = new User(userDto.getUsername(), passwordEncoder.encode(userDto.getPassword()));
        user = userRepository.save(user);
        Role role = new Role("USER", user);
        Set<Role> roles = Stream.of(role).collect(Collectors.toCollection(HashSet::new));
        user.setRoles(roles);
        return userRepository.save(user);
    }
}
