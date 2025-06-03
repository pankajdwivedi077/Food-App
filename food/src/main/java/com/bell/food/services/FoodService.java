package com.bell.food.services;


import com.bell.food.io.FoodRequest;
import com.bell.food.io.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {

      String uploadFile(MultipartFile img);

      FoodResponse addFood(FoodRequest request, MultipartFile img);

      List<FoodResponse> readFoods();

      FoodResponse readFood(String id);

      void deleteFood(String id);

}
