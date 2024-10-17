package com.infinitecookies959.gmail.com.all_the_flavours.repositories;

import com.infinitecookies959.gmail.com.all_the_flavours.models.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByRecipeId(Long recipeId, Pageable pageable);

    Optional<Review> findByRecipeIdAndReviewerId(Long recipeId, Long userId);

    @Query("SELECT AVG(r.rating) / 2 FROM Review r WHERE r.recipe.id = :recipeId")
    Double findAverageRatingByRecipeId(@Param("recipeId") Long recipeId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.recipe.id = :recipeId")
    Long countByRecipeId(@Param("recipeId") Long recipeId);

}
