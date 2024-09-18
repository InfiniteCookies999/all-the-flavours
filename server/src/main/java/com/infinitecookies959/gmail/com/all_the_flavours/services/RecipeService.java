package com.infinitecookies959.gmail.com.all_the_flavours.services;

import com.infinitecookies959.gmail.com.all_the_flavours.models.Recipe;
import com.infinitecookies959.gmail.com.all_the_flavours.models.RecipeDirection;
import com.infinitecookies959.gmail.com.all_the_flavours.models.RecipeIngredient;
import com.infinitecookies959.gmail.com.all_the_flavours.repositories.RecipeRepository;
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

    @Transactional(readOnly = true)
    public Optional<Recipe> getRecipeById(Long id) {
        return recipeRepository.findById(id);
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
