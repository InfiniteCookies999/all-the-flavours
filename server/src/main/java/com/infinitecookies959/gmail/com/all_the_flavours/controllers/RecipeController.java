package com.infinitecookies959.gmail.com.all_the_flavours.controllers;

import com.infinitecookies959.gmail.com.all_the_flavours.models.Recipe;
import com.infinitecookies959.gmail.com.all_the_flavours.services.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    private static final int VIEWING_PAGE_SIZE = 12;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Optional<Recipe> recipe = recipeService.getRecipeById(id);
        return recipe.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping
    public  ResponseEntity<List<Recipe>> getRecipes(@RequestParam(defaultValue = "0") int page) {
        return ResponseEntity.ok(recipeService.getRecipes(page, VIEWING_PAGE_SIZE));
    }
}
