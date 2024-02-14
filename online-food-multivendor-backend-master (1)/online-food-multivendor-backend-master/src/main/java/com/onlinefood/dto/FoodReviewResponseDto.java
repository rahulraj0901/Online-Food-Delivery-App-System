package com.onlinefood.dto;

import java.util.ArrayList;
import java.util.List;

import com.onlinefood.entity.Review;

import lombok.Data;

@Data
public class FoodReviewResponseDto extends CommonApiResponse {
	
	private List<Review> reviews = new ArrayList<>();
	
	private double averageRating = 0.0;

}
