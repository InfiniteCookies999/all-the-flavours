package com.infinitecookies959.gmail.com.all_the_flavours.controllers;

import com.infinitecookies959.gmail.com.all_the_flavours.models.Review;
import com.infinitecookies959.gmail.com.all_the_flavours.services.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    public static final int VIEWING_PAGE_SIZE = 10;

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getReviews(@RequestParam long recipeId,
                                                           @RequestParam(defaultValue = "0") int page) {
        Page<Review> reviewPage = reviewService.getReviews(recipeId, page, VIEWING_PAGE_SIZE);
        List<Review> reviews = reviewPage.getContent();
        return ResponseEntity.ok(Map.of(
                "elements", reviews,
                "totalReviews", reviewPage.getTotalElements()
        ));
    }
}
