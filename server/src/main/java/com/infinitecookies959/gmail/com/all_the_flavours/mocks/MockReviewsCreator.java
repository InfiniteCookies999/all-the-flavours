package com.infinitecookies959.gmail.com.all_the_flavours.mocks;

import com.infinitecookies959.gmail.com.all_the_flavours.models.Recipe;
import com.infinitecookies959.gmail.com.all_the_flavours.models.Review;
import com.infinitecookies959.gmail.com.all_the_flavours.models.User;
import com.infinitecookies959.gmail.com.all_the_flavours.services.RecipeService;
import com.infinitecookies959.gmail.com.all_the_flavours.services.ReviewService;
import com.infinitecookies959.gmail.com.all_the_flavours.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class MockReviewsCreator implements MockCreator {

    private final ReviewService reviewService;
    private final UserService userService;
    private final RecipeService recipeService;

    public MockReviewsCreator(ReviewService reviewService, UserService userService, RecipeService recipeService) {
        this.reviewService = reviewService;
        this.userService = userService;
        this.recipeService = recipeService;
    }

    @Override
    public void createMocks() {
        Recipe recipe = recipeService.getRecipeByTitle("Tonkotsu Ramen").orElseThrow();

        Page<Review> existingReviews = reviewService.getReviews(recipe.getId(), 0, 1);
        if (!existingReviews.isEmpty()) {
            return;
        }

        User reviewer1 = userService.getUserByEmail("susan-smith@gmail.com").orElseThrow();
        User reviewer2 = userService.getUserByEmail("john-doe@gmail.com").orElseThrow();
        User reviewer3 = userService.getUserByEmail("jane-doe@gmail.com").orElseThrow();
        User reviewer4 = userService.getUserByEmail("alice-johnson@gmail.com").orElseThrow();
        User reviewer5 = userService.getUserByEmail("bob-williams@gmail.com").orElseThrow();

        Review review1 = new Review();
        review1.setReviewer(reviewer1);
        review1.setRecipe(recipe);
        review1.setText("The Tonkotsu Ramen was absolutely delicious! The broth was rich and flavorful, and the noodles were perfectly cooked. I would definitely recommend this recipe to anyone who loves authentic ramen.");
        review1.setRating(4, true);
        reviewService.saveReview(review1);

        Review review2 = new Review();
        review2.setReviewer(reviewer2);
        review2.setRecipe(recipe);
        review2.setText("The ramen was good, but it needed a bit more salt for my taste.");
        review2.setRating(3, true);
        reviewService.saveReview(review2);

        Review review3 = new Review();
        review3.setReviewer(reviewer3);
        review3.setRecipe(recipe);
        review3.setText("I wasn't a fan of the texture of the noodles, but the broth was amazing!");
        review3.setRating(2, true);
        reviewService.saveReview(review3);

        Review review4 = new Review();
        review4.setReviewer(reviewer4);
        review4.setRecipe(recipe);
        review4.setText("Best Tonkotsu Ramen I've ever had! Perfect in every way.");
        review4.setRating(5, false);
        reviewService.saveReview(review4);

        Review review5 = new Review();
        review5.setReviewer(reviewer5);
        review5.setRecipe(recipe);
        review5.setText("The broth was great, but the toppings felt a bit lacking.");
        review5.setRating(3, false);
        reviewService.saveReview(review5);

        Review review6 = new Review();
        review6.setReviewer(reviewer1);
        review6.setRecipe(recipe);
        review6.setText("The ramen was okay, but I found it to be too greasy for my liking.");
        review6.setRating(2, false);
        reviewService.saveReview(review1);

        Review review7 = new Review();
        review7.setReviewer(reviewer2);
        review7.setRecipe(recipe);
        review7.setText("Delicious! I really enjoyed the depth of flavor in the broth.");
        review7.setRating(4, true);
        reviewService.saveReview(review7);

        Review review8 = new Review();
        review8.setReviewer(reviewer3);
        review8.setRecipe(recipe);
        review8.setText("Solid ramen, but I've had better elsewhere.");
        review8.setRating(3, false);
        reviewService.saveReview(review8);

        Review review9 = new Review();
        review9.setReviewer(reviewer4);
        review9.setRecipe(recipe);
        review9.setText("The broth was rich and tasty, but the pork slices were too fatty for me.");
        review9.setRating(3, true);
        reviewService.saveReview(review9);

        Review review10 = new Review();
        review10.setReviewer(reviewer5);
        review10.setRecipe(recipe);
        review10.setText("Very disappointing. The noodles were overcooked and the broth lacked flavor.");
        review10.setRating(1, false);
        reviewService.saveReview(review10);

        Review review11 = new Review();
        review11.setReviewer(reviewer1);
        review11.setRecipe(recipe);
        review11.setText("The ramen was pretty good, but the egg was a little overcooked.");
        review11.setRating(4, false);
        reviewService.saveReview(review11);

        Review review12 = new Review();
        review12.setReviewer(reviewer2);
        review12.setRecipe(recipe);
        review12.setText("Decent ramen, but I felt it was lacking some spice.");
        review12.setRating(3, true);
        reviewService.saveReview(review12);

        Review review13 = new Review();
        review13.setReviewer(reviewer3);
        review13.setRecipe(recipe);
        review13.setText("Great flavor and texture, but the broth could have been hotter.");
        review13.setRating(4, false);
        reviewService.saveReview(review13);

        Review review14 = new Review();
        review14.setReviewer(reviewer4);
        review14.setRecipe(recipe);
        review14.setText("This is the best ramen I've had outside of Japan. Truly authentic!");
        review14.setRating(5, false);
        reviewService.saveReview(review14);

        Review review15 = new Review();
        review15.setReviewer(reviewer5);
        review15.setRecipe(recipe);
        review15.setText("The ramen was too salty and the noodles were a bit soggy.");
        review15.setRating(2, true);
        reviewService.saveReview(review15);

    }
}
