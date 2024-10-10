package com.infinitecookies959.gmail.com.all_the_flavours.controllers;

import com.infinitecookies959.gmail.com.all_the_flavours.SessionPrincipal;
import com.infinitecookies959.gmail.com.all_the_flavours.models.Recipe;
import com.infinitecookies959.gmail.com.all_the_flavours.services.RecipeService;
import com.infinitecookies959.gmail.com.all_the_flavours.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;
    private final UserService userService;

    private static final int VIEWING_PAGE_SIZE = 12;

    public RecipeController(RecipeService recipeService, UserService userService) {
        this.recipeService = recipeService;
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Optional<Recipe> recipe = recipeService.getRecipeById(id);
        return recipe.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping
    public ResponseEntity<List<Recipe>> getRecipes(@RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "") String search) {
        return ResponseEntity.ok(recipeService.getRecipes(page, VIEWING_PAGE_SIZE, search));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Long>> createRecipe(@Valid @ModelAttribute Recipe recipe,
                                                          @AuthenticationPrincipal SessionPrincipal session)
            throws IOException {

        recipe.setUser(userService.getSessionUser(session));

        recipe = recipeService.saveRecipe(recipe);
        return ResponseEntity.ok(Map.of("id", recipe.getId()));
    }
}
