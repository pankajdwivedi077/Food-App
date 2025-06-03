package com.bell.food.services;

import com.bell.food.io.UserRequest;
import com.bell.food.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();

}
