package com.bell.food.services;


import com.bell.food.io.CartRequest;
import com.bell.food.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);

}
