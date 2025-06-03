package com.bell.food.services;

import com.bell.food.entity.FoodEntity;
import com.bell.food.io.FoodRequest;
import com.bell.food.io.FoodResponse;
import com.bell.food.repository.FoodRepository;
import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;
import com.cloudinary.Cloudinary;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.io.IOException;
import java.util.stream.Collectors;

@Service

public class CloundinaryService implements FoodService {

  private final Cloudinary cloudinary;

  private final FoodRepository foodRepository;

@Autowired
public CloundinaryService(FoodRepository foodRepository) {
    String cloudinaryUrl = System.getenv("CLOUDINARY_URL");
    this.cloudinary = new Cloudinary(cloudinaryUrl);
    this.foodRepository = foodRepository;
}


  @Override
  public String uploadFile(MultipartFile imageUrl){
      try{
          Map params = ObjectUtils.asMap(
                  "use_filename", true,
                  "unique_filename", false,
                  "overwrite", true
          );
          Map uploadResult = cloudinary.uploader().upload(imageUrl.getBytes(), params);
          return uploadResult.get("secure_url").toString();
      }catch (IOException e){
          e.printStackTrace();
          return "Error: " + e.getMessage();
      }
  }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile img) {

        FoodEntity foodEntity = convertToEntity(request);
        String url = uploadFile(img);
        foodEntity.setImageUrl(url);
        foodEntity = foodRepository.save(foodEntity);
        return convertToResponse(foodEntity);
    }

    @Override
    public List<FoodResponse> readFoods() {
        List<FoodEntity> databaseEntries = foodRepository.findAll();
        return databaseEntries.stream().map(object -> convertToResponse(object)).collect(Collectors.toList());
    }

    @Override
    public FoodResponse readFood(String id) {
       FoodEntity existingFood = foodRepository.findById(id).orElseThrow(() -> new RuntimeException("Food not found for the id:" +id));
       return convertToResponse(existingFood);
    }

    @Override
    public void deleteFood(String id) {
        foodRepository.deleteById(id);
    }

    private FoodEntity convertToEntity(FoodRequest request){
      return FoodEntity.builder()
              .name(request.getName())
              .description(request.getDescription())
              .category(request.getCategory())
              .price(request.getPrice())
              .build();
    }

    private FoodResponse convertToResponse(FoodEntity entity){
        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .imageUrl(entity.getImageUrl())
                .build();
    }

}
