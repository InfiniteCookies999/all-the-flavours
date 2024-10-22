package com.infinitecookies959.gmail.com.all_the_flavours.controllers;

import com.infinitecookies959.gmail.com.all_the_flavours.models.Review;
import com.infinitecookies959.gmail.com.all_the_flavours.security.SessionPrincipal;
import com.infinitecookies959.gmail.com.all_the_flavours.services.ReviewService;
import com.infinitecookies959.gmail.com.all_the_flavours.services.UserService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    public static final int VIEWING_PAGE_SIZE = 10;

    private final ReviewService reviewService;
    private final UserService userService;

    public ReviewController(ReviewService reviewService, UserService userService) {
        this.reviewService = reviewService;
        this.userService = userService;
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

    @PostMapping
    public ResponseEntity<Review> createReview(@Valid @RequestBody Review review,
                                               @AuthenticationPrincipal SessionPrincipal session) {
        review.setReviewer(userService.getSessionUser(session));
        return ResponseEntity.ok(reviewService.saveReview(review));
    }

    @PutMapping
    public ResponseEntity<Review> updateReview(@Valid @RequestBody Review review,
                                               @AuthenticationPrincipal SessionPrincipal session) {
        review.setReviewer(userService.getSessionUser(session));
        return ResponseEntity.ok(reviewService.updateReview(review));
    }
}
