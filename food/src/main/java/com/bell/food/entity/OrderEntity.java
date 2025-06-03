package com.bell.food.entity;

import com.bell.food.io.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "orders")
public class OrderEntity {

   @Id
   private String id;
   private String userId;
   private String userAddress;
   private String phoneNumber;
   private String email;
   private List<OrderItem> orderItems;
   private double amount;
   private String paymentStatus;
   private String razorpayOrderId;
   private String razorpaySignature;
   private String orderStatus;

}
