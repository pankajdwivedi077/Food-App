package com.bell.food.controller;


import com.bell.food.io.CartRequest;
import com.bell.food.io.CartResponse;
import com.bell.food.services.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartController {

   private final CartService cartService;

   @PostMapping
   public CartResponse addIntoCart(@RequestBody CartRequest request) {
      String foodId = request.getFoodId();
      if (foodId == null || foodId.isEmpty()) {
         throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "FoodId not found");
      }
      try {
        return cartService.addToCart(request);
//         return ResponseEntity.ok(response);
      } catch (UsernameNotFoundException e) {
         throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
      }
   }

   @GetMapping
   public CartResponse getCart(){
      return cartService.getCart();
   }

   @DeleteMapping
   @ResponseStatus(HttpStatus.NO_CONTENT)
   public void clearCart(){
      cartService.clearCart();
   }

   @PostMapping("/remove")
   public CartResponse removeCart(@RequestBody CartRequest request) {
      String foodId = request.getFoodId();
      if (foodId == null || foodId.isEmpty()) {
         throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "FoodId not found");
      }
      return cartService.removeFromCart(request);
   }

}
