package com.bell.food.services;

import com.bell.food.entity.UserEntity;
import com.bell.food.io.UserRequest;
import com.bell.food.io.UserResponse;
import com.bell.food.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationFacade authenticationFacade;

    @Override
    public UserResponse registerUser(UserRequest request) {
        UserEntity newUser = convertToEntity(request);
        newUser = userRepository.save(newUser);
        return convertoResponse(newUser);
    }

    @Override
    public String findByUserId() {
        Authentication authentication = authenticationFacade.getAuthentication();
        System.out.println("Authentication principal: " + authentication.getPrincipal()); // Debug
        return authentication.getName(); // Should return the user ID (not email)
    }

    private UserEntity convertToEntity(UserRequest request){
      return UserEntity.builder()
              .email(request.getEmail())
              .password(passwordEncoder.encode(request.getPassword()))
              .name(request.getName())
              .build();
    }

    private UserResponse convertoResponse(UserEntity registeredUser){
       return UserResponse.builder()
               .id(registeredUser.getId())
               .name(registeredUser.getName())
               .email(registeredUser.getEmail())
               .build();
    }

}
