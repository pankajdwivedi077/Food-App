package com.bell.food.controller;

import com.bell.food.entity.UserEntity;
import com.bell.food.io.AuthenticationRequest;
import com.bell.food.io.AuthenticationResponse;
import com.bell.food.repository.UserRepository;
import com.bell.food.services.AppUserDetailsService;
import com.bell.food.utils.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest request) {
        // Authenticate with email/password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        // Get full user details
        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Create UserDetails with ID as username
        UserDetails userDetails = new User(
                user.getId(),
                user.getPassword(),
                Collections.emptyList()
        );

        // Generate token
        String jwtToken = jwtUtil.generateToken(userDetails);

        return new AuthenticationResponse(user.getEmail(), jwtToken);
    }

}
