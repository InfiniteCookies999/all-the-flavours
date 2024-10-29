package com.infinitecookies959.gmail.com.all_the_flavours.repositories;

import com.infinitecookies959.gmail.com.all_the_flavours.models.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    List<Recipe> findByTitle(String title);

    @Query("SELECT r FROM Recipe r WHERE LOWER(r.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    Page<Recipe> findByTitleLike(@Param("title") String title, Pageable pageable);

    List<Recipe> findFirst8ByOrderByCreationDateDesc();

    Page<Recipe> findByUser_Id(Long userId, Pageable pageable);

    @Query("SELECT r FROM Recipe r JOIN r.ingredients i " +
            "WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :ingredientName, '%')) " +
            "AND LOWER(r.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    Page<Recipe> findByIngredientNameAndTitle(@Param("ingredientName") String ingredientName,
                                              @Param("title") String title,
                                              Pageable pageable);

}
