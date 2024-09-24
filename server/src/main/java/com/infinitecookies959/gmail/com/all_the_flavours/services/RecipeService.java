package com.infinitecookies959.gmail.com.all_the_flavours.services;

import com.infinitecookies959.gmail.com.all_the_flavours.models.Recipe;
import com.infinitecookies959.gmail.com.all_the_flavours.models.RecipeDirection;
import com.infinitecookies959.gmail.com.all_the_flavours.models.RecipeIngredient;
import com.infinitecookies959.gmail.com.all_the_flavours.repositories.RecipeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    private Recipe prefixImages(Recipe recipe) {
        List<String> prefixedImages = recipe.getImages().stream()
                .map(image -> "/images/upload/recipes/" + image)
                .toList();
        recipe.setImages(prefixedImages);
        return recipe;
    }

    @Transactional(readOnly = true)
    public Optional<Recipe> getRecipeById(Long id) {
        return recipeRepository.findById(id).map(this::prefixImages);
    }

    @Transactional(readOnly = true)
    public List<Recipe> getRecipes(int page, int pageSize) {
        Page<Recipe> recipePage = recipeRepository.findAll(PageRequest.of(page, pageSize));
        return recipePage.getContent().stream().map(this::prefixImages).toList();
    }

    @Transactional
    public Recipe saveRecipe(Recipe recipe) {
        // Setting step numbers for directions and recipe.
        List<RecipeDirection> directions = recipe.getDirections();
        for (int i = 0; i < directions.size(); i++) {
            directions.get(i).setStepNumber(i + 1);
            directions.get(i).setRecipe(recipe);
        }
        // Setting recipe for ingredients
        for (RecipeIngredient ingredient : recipe.getIngredients()) {
            ingredient.setRecipe(recipe);
        }
        return recipeRepository.save(recipe);
    }

    @Transactional(readOnly = true)
    public boolean recipeExists(String title) {
        return recipeRepository.findByTitle((title)).isPresent();
    }
}
