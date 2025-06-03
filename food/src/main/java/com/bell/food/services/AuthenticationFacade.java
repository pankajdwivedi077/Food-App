package com.bell.food.services;

import org.springframework.security.core.Authentication;

public interface AuthenticationFacade  {

    Authentication getAuthentication();

}
