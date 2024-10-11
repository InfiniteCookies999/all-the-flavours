package com.infinitecookies959.gmail.com.all_the_flavours.services;

import com.infinitecookies959.gmail.com.all_the_flavours.models.Review;
import com.infinitecookies959.gmail.com.all_the_flavours.repositories.ReviewRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Transactional
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    @Transactional(readOnly = true)
    public Page<Review> getReviews(long recipeId, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        return reviewRepository.findByRecipeId(recipeId, pageable);
    }
}
