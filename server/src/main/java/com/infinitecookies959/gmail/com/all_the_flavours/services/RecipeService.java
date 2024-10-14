package com.infinitecookies959.gmail.com.all_the_flavours.services;

import com.infinitecookies959.gmail.com.all_the_flavours.models.Recipe;
import com.infinitecookies959.gmail.com.all_the_flavours.models.RecipeDirection;
import com.infinitecookies959.gmail.com.all_the_flavours.models.RecipeIngredient;
import com.infinitecookies959.gmail.com.all_the_flavours.repositories.RecipeRepository;
import jakarta.servlet.ServletContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class RecipeService {

    private static final Map<String, String> FILE_TYPE_MAPPING = Map.of(
            "image/png", "png",
            "image/jpg", "jpg",
            "image/jpeg", "jpeg",
            "image/webp", "webp"
    );

    private static final String IMAGE_UPLOAD_PATH = "images/upload/recipes";

    private final RecipeRepository recipeRepository;
    private final FileUploadService fileUploadService;
    private final ReviewService reviewService;

    public RecipeService(RecipeRepository recipeRepository, ServletContext servletContext, FileUploadService fileUploadService, ReviewService reviewService) {
        this.recipeRepository = recipeRepository;
        this.fileUploadService = fileUploadService;
        this.reviewService = reviewService;
    }

    private void prefixImages(Recipe recipe) {
        List<String> prefixedImages = recipe.getImages().stream()
                .map(image -> "/images/upload/recipes/" + image)
                .toList();
        recipe.setImages(prefixedImages);
    }

    private void setReviewInfo(Recipe recipe) {
        recipe.setRating(reviewService.getAverageRating(recipe));
        recipe.setNumberOfReviews(reviewService.getNumberOfReviews(recipe));
    }

    private Recipe fixupRecipe(Recipe recipe) {
        setReviewInfo(recipe);
        prefixImages(recipe);
        return recipe;
    }

    @Transactional(readOnly = true)
    public Optional<Recipe> getRecipeById(Long id) {
        return recipeRepository.findById(id).map(this::fixupRecipe);
    }

    private List<Recipe> fixupRecipes(Page<Recipe> recipePage) {
        return recipePage.getContent().stream().map(this::fixupRecipe).toList();
    }

    @Transactional(readOnly = true)
    public List<Recipe> getRecipes(int page, int pageSize, String search) {

        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Recipe> recipePage;
        if (search != null && !search.isEmpty()) {
            recipePage = recipeRepository.findByTitleContainingIgnoreCase(search, pageable);
        } else {
            recipePage = recipeRepository.findAll(pageable);
        }
        return fixupRecipes(recipePage);
    }

    @Transactional
    public Recipe saveRecipe(Recipe recipe) throws IOException {

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

        // Upload the images for the recipe.
        if (recipe.getUploadImages() != null) {
            recipe.setImages(new ArrayList<>());

            MultipartFile[] files = recipe.getUploadImages();

            fileUploadService.transferFiles(files, IMAGE_UPLOAD_PATH, file -> {
                String randomFileName = UUID.randomUUID() + "."
                        + FILE_TYPE_MAPPING.get(file.getContentType());
                recipe.getImages().add(randomFileName);
                return randomFileName;
            });
        } else {
            recipe.setUploadImages(new MultipartFile[]{});
        }

        return recipeRepository.save(recipe);
    }

    @Transactional(readOnly = true)
    public boolean recipeExists(String title) {
        return recipeRepository.findByTitle((title)).isPresent();
    }

    @Transactional(readOnly = true)
    public Optional<Recipe> getRecipeByTitle(String title) {
        return recipeRepository.findByTitle(title);
    }
}
