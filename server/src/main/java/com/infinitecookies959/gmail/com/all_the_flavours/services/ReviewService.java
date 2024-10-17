package com.infinitecookies959.gmail.com.all_the_flavours.services;

import com.infinitecookies959.gmail.com.all_the_flavours.exceptions.ReviewAlreadyExistException;
import com.infinitecookies959.gmail.com.all_the_flavours.models.Recipe;
import com.infinitecookies959.gmail.com.all_the_flavours.models.RecipeRank;
import com.infinitecookies959.gmail.com.all_the_flavours.models.Review;
import com.infinitecookies959.gmail.com.all_the_flavours.repositories.RecipeRankRepository;
import com.infinitecookies959.gmail.com.all_the_flavours.repositories.ReviewRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.infinitecookies959.gmail.com.all_the_flavours.exceptions.UpdateNonExistentModelException;

import java.util.Objects;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final RecipeRankRepository recipeRankRepository;

    public ReviewService(ReviewRepository reviewRepository, RecipeRankRepository recipeRankRepository) {
        this.reviewRepository = reviewRepository;
        this.recipeRankRepository = recipeRankRepository;
    }

    public double getRecipeScore(Recipe recipe) {
        Double averageRating = getAverageRating(recipe);
        long numberOfReviews = getNumberOfReviews(recipe);

        double weightForRating = 0.7;
        double weightForReviews = 0.3;
        return (averageRating * weightForRating) + (numberOfReviews * weightForReviews);
    }

    private static long getNewRankValue(RecipeRank currentRank, RecipeRank rankAbove) {
        if (rankAbove != null) {
            if (Objects.equals(rankAbove.getId(), currentRank.getId())) {
                // Our rank is worse than our previous rank but that does not
                // mean it is a new rank by itself.
                return currentRank.getValue();
            }
            // Our rank is one worse than the rank with a better score than
            // our rank.
            return rankAbove.getValue() + 1;
        } else {
            // There is no other rank with a higher score so this becomes
            // rank number 1!
            return 1;
        }
    }

    @Transactional
    private void updateRecipeRank(Recipe recipe) {
        double score = getRecipeScore(recipe);

        RecipeRank currentRank = recipeRankRepository.findByRecipeId(recipe.getId());

        // Say we have the following table:
        //
        // recipe id | score
        // 1         | 90
        // 2         | 85
        // 3         | 80
        // 4         | 75
        //
        // If the calculated score is 83 then it will return us 90 which is the
        // first score greater than our calculated score. In other words the score
        // above.
        RecipeRank rankAbove = recipeRankRepository.findFirstByScoreGreaterThanOrderByScoreAsc(score);

        long newRankValue = getNewRankValue(currentRank, rankAbove);

        // Updating the ranks of the rest of the recipes that were effected.
        long currentRankValue = currentRank.getValue() != null ? currentRank.getValue() : 0L;

        if (currentRankValue == 0) {
            // Special case when we insert a value. All ranks with scores less than the new
            // rank score must lose rank.
            recipeRankRepository.incrementRanksFromValueToMax(newRankValue);
        } else if (newRankValue < currentRankValue) {
            // Gained a rank! Shift ranks up by 1.
            //
            // Example of ranks mapping: Say rank 6 becomes rank 3.
            // 1 2 3 4 5 6 7 8   ->   1 2 4 5 6 6 7 8
            //                                  ^
            //                                  |
            //                                  This can now be replaced with 3.
            recipeRankRepository.incrementRanksBetween(newRankValue, currentRankValue - 1);
        } else if (newRankValue > currentRankValue) {
            // Lost a rank! Shift ranks down by 1.
            // Example of ranks mapping: Say rank 3 becomes rank 6.
            // 1 2 3 4 5 6 7 8   ->   1 2 3 3 4 5 7 8
            //                            ^
            //                            |
            //                            This can now be replaced with 6.
            recipeRankRepository.decrementRanksBetween(currentRankValue + 1, newRankValue);
        }

        // Set the new rank and score.
        currentRank.setScore(score);
        currentRank.setRecipe(recipe);
        currentRank.setValue(newRankValue);
        recipeRankRepository.save(currentRank);
    }

    @Transactional
    public void saveReview(Review review) {

        Review existingReview = reviewRepository.findByRecipeIdAndReviewerId(
                review.getRecipe().getId(),
                review.getReviewer().getId()
        ).orElse(null);

        if (existingReview != null) {
            throw new ReviewAlreadyExistException();
        }

        review = reviewRepository.save(review);
        updateRecipeRank(review.getRecipe());
    }

    @Transactional
    public void updateReview(Review review) {

        Review existingReview = reviewRepository.findByRecipeIdAndReviewerId(
                review.getRecipe().getId(),
                review.getReviewer().getId()
        ).orElseThrow(() -> new UpdateNonExistentModelException(Review.class));

        review.setId(existingReview.getId());

        review = reviewRepository.save(review);
        updateRecipeRank(review.getRecipe());
    }

    @Transactional(readOnly = true)
    public Page<Review> getReviews(long recipeId, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        return reviewRepository.findByRecipeId(recipeId, pageable);
    }

    @Transactional(readOnly = true)
    public Double getAverageRating(Recipe recipe) {
        Double average = reviewRepository.findAverageRatingByRecipeId(recipe.getId());
        return average != null ? average : 0;
    }

    @Transactional(readOnly = true)
    public long getNumberOfReviews(Recipe recipe){
        return reviewRepository.countByRecipeId(recipe.getId());
    }

    public Optional<Review> getReviewByUserIdAndRecipe(Long userId, Recipe recipe) {
        return reviewRepository.findByRecipeIdAndReviewerId(recipe.getId(), userId);
    }
}
