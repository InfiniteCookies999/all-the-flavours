package com.infinitecookies959.gmail.com.all_the_flavours.repositories;

import com.infinitecookies959.gmail.com.all_the_flavours.models.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Optional<Recipe> findByTitle(String title);

    Page<Recipe> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    List<Recipe> findFirst8ByOrderByCreationDateDesc();

}
