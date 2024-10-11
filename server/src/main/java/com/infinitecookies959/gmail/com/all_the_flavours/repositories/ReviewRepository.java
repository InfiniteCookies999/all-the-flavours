package com.infinitecookies959.gmail.com.all_the_flavours.repositories;

import com.infinitecookies959.gmail.com.all_the_flavours.models.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByRecipeId(long recipeId, Pageable pageable);

}
