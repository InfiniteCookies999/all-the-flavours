package com.infinitecookies959.gmail.com.all_the_flavours.mocks;

import com.infinitecookies959.gmail.com.all_the_flavours.models.Recipe;
import com.infinitecookies959.gmail.com.all_the_flavours.models.RecipeDirection;
import com.infinitecookies959.gmail.com.all_the_flavours.models.RecipeIngredient;
import com.infinitecookies959.gmail.com.all_the_flavours.services.RecipeService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MockRecipeCreator implements MockCreator {

    private final RecipeService recipeService;

    private final List<Recipe> recipeMocks = new ArrayList<>();

    public MockRecipeCreator(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    private Recipe chocolateChipCookiesRecipe() {
        List<RecipeDirection> directions = new ArrayList<>();
        directions.add(new RecipeDirection("Preheat the oven to 375 degrees F (190 degrees C). Grease or line baking sheets with parchment paper."));
        directions.add(new RecipeDirection("In a small bowl, whisk together flour, baking soda, and salt. Set aside."));
        directions.add(new RecipeDirection("In a large bowl, beat together butter, white sugar, and brown sugar until smooth."));
        directions.add(new RecipeDirection("Beat in the eggs one at a time, then stir in vanilla extract."));
        directions.add(new RecipeDirection("Gradually blend in the flour mixture. Stir in the chocolate chips."));
        directions.add(new RecipeDirection("Drop by rounded spoonfuls onto prepared baking sheets."));
        directions.add(new RecipeDirection("Bake for 8 to 10 minutes, or until golden brown. Cool on wire racks."));

        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(new RecipeIngredient("unsalted butter", 1.0, "cup"));
        ingredients.add(new RecipeIngredient("white sugar", 1.0 / 2.0, "cup"));
        ingredients.add(new RecipeIngredient("brown sugar", 1.0, "cup"));
        ingredients.add(new RecipeIngredient("egg", 2.0));
        ingredients.add(new RecipeIngredient("vanilla extract", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("all-purpose flour", 2.25, "cups"));
        ingredients.add(new RecipeIngredient("baking soda", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("salt", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("chocolate chips", 2.0, "cups"));

        List<String> images = new ArrayList<>();
        for (int i = 1; i <= 8; i++) {
            images.add("mock-chocolate-chip-cookies-" + i + ".jpg");
        }
        Recipe recipe = new Recipe("Classic Chocolate Chip Cookies", "A timeless recipe for warm, gooey chocolate chip cookies that everyone loves.");
        recipe.setDirections(directions);
        recipe.setIngredients(ingredients);
        recipe.setImages(images);
        return recipe;
    }

    private Recipe muffinRecipe() {
        List<RecipeDirection> directions = new ArrayList<>();
        directions.add(new RecipeDirection("Preheat the oven to 375 degrees F (190 degrees C). Grease a muffin tin or line with paper muffin cups."));
        directions.add(new RecipeDirection("Whisk together flour, sugar, baking powder, and salt in a large bowl."));
        directions.add(new RecipeDirection("In a separate bowl, whisk together milk, vegetable oil, eggs, and vanilla extract."));
        directions.add(new RecipeDirection("Pour the wet ingredients into the dry ingredients and stir until just combined."));
        directions.add(new RecipeDirection("Fold in chocolate chips or blueberries, if desired."));
        directions.add(new RecipeDirection("Spoon the batter into the prepared muffin tin, filling each cup about two-thirds full."));
        directions.add(new RecipeDirection("Bake in the preheated oven for 20-25 minutes, or until a toothpick inserted into the center comes out clean."));
        directions.add(new RecipeDirection("Let the muffins cool in the tin for 5 minutes, then transfer them to a wire rack to cool completely."));

        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(new RecipeIngredient("all-purpose flour", 2.0, "cup"));
        ingredients.add(new RecipeIngredient("granulated sugar", 1.0, "cup"));
        ingredients.add(new RecipeIngredient("baking powder", 2.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("salt", 0.5, "teaspoon"));
        ingredients.add(new RecipeIngredient("milk", 1.0, "cup"));
        ingredients.add(new RecipeIngredient("vegetable oil", 0.5, "cup"));
        ingredients.add(new RecipeIngredient("egg", 2.0));
        ingredients.add(new RecipeIngredient("vanilla extract", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("chocolate chips", 1.0, "cup"));

        List<String> images = new ArrayList<>();
        for (int i = 1; i <= 4; i++) {
            images.add("mock-chocolate-chip-muffin-" + i + ".jpg");
        }
        Recipe recipe = new Recipe("Chocolate Chip Muffins", "These muffins are soft, fluffy, and filled with rich chocolate chips, perfect for breakfast or a snack.");
        recipe.setDirections(directions);
        recipe.setIngredients(ingredients);
        recipe.setImages(images);

        return recipe;
    }

    private Recipe tonkotsuRamenRecipe() {
        List<RecipeDirection> directions = new ArrayList<>();
        directions.add(new RecipeDirection("In a large pot, bring the pork bones and water to a boil. Reduce heat and simmer for 10 minutes. Discard the water and rinse the bones to remove impurities."));
        directions.add(new RecipeDirection("Return the bones to the pot and add fresh water to cover the bones by about 2 inches. Bring to a boil, then reduce heat to low and simmer for 4-6 hours, occasionally skimming off any foam or impurities that rise to the surface."));
        directions.add(new RecipeDirection("Add onion, garlic, ginger, and leek to the pot during the last 1-2 hours of simmering."));
        directions.add(new RecipeDirection("After simmering, strain the broth through a fine mesh sieve into a clean pot or bowl. Discard the solids. Season the broth with soy sauce, miso paste (if using), and salt to taste. Keep warm."));
        directions.add(new RecipeDirection("In a small bowl, mix soy sauce, sake, mirin, and sugar. Stir until the sugar is dissolved. Set aside."));
        directions.add(new RecipeDirection("Cook the ramen noodles according to package instructions. Drain and set aside."));
        directions.add(new RecipeDirection("Divide the cooked noodles between serving bowls."));
        directions.add(new RecipeDirection("Pour the hot broth over the noodles."));
        directions.add(new RecipeDirection("Add a spoonful of tare to each bowl, adjusting to taste."));
        directions.add(new RecipeDirection("Top with chashu pork, a soft-boiled egg, sliced green onions, mushrooms, nori strips, bean sprouts, and bamboo shoots."));
        directions.add(new RecipeDirection("Serve the ramen hot, and enjoy!"));

        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(new RecipeIngredient("pork bones", 4.0, "pound"));
        ingredients.add(new RecipeIngredient("water", 2.0, "liter"));
        ingredients.add(new RecipeIngredient("onion", 1.0, "whole"));
        ingredients.add(new RecipeIngredient("garlic", 4.0, "clove"));
        ingredients.add(new RecipeIngredient("ginger", 1.0, "inch piece"));
        ingredients.add(new RecipeIngredient("leek", 1.0, "whole"));
        ingredients.add(new RecipeIngredient("soy sauce", 2.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("miso paste", 1.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("salt", 1.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("soy sauce", 0.25, "cup"));
        ingredients.add(new RecipeIngredient("sake", 2.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("mirin", 1.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("sugar", 1.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("ramen noodles", 200.0, "grams"));
        ingredients.add(new RecipeIngredient("chashu pork", 4.0, "slices"));
        ingredients.add(new RecipeIngredient("soft-boiled eggs", 2.0, "whole"));
        ingredients.add(new RecipeIngredient("sliced green onions", 1.0, "cup"));
        ingredients.add(new RecipeIngredient("sliced mushrooms", 1.0, "cup"));
        ingredients.add(new RecipeIngredient("nori", 1.0, "sheet"));
        ingredients.add(new RecipeIngredient("bean sprouts", 1.0, "cup"));
        ingredients.add(new RecipeIngredient("bamboo shoots", 1.0, "cup"));

        List<String> images = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            images.add("mock-tonkotsu-ramen-" + i + ".webp");
        }

        Recipe recipe = new Recipe("Tonkotsu Ramen", "A rich, creamy ramen with a savory pork broth, topped with traditional ingredients.");
        recipe.setDirections(directions);
        recipe.setIngredients(ingredients);
        recipe.setImages(images);

        return recipe;
    }

    public Recipe skilletPepperAndGarlicPorkChopsRecipe() {
        List<RecipeDirection> directions = new ArrayList<>();
        directions.add(new RecipeDirection("Pat the pork chops dry with paper towels. Season both sides generously with salt and black pepper."));
        directions.add(new RecipeDirection("Heat the olive oil in a large skillet over medium-high heat."));
        directions.add(new RecipeDirection("Add the pork chops to the skillet and cook for about 4-5 minutes on each side, or until they are golden brown and cooked through. The internal temperature should reach 145°F (63°C). Remove the pork chops from the skillet and set them aside on a plate."));
        directions.add(new RecipeDirection("In the same skillet, reduce the heat to medium. Add the minced garlic, rosemary, thyme, and paprika. Sauté for about 1 minute, until the garlic is fragrant but not burned."));
        directions.add(new RecipeDirection("Pour in the chicken broth, white wine (if using), soy sauce, and Dijon mustard. Stir to combine, scraping up any browned bits from the bottom of the skillet. Bring the mixture to a simmer."));
        directions.add(new RecipeDirection("If you prefer a thicker sauce, mix the cornstarch with water to make a slurry. Add the slurry to the skillet and stir until the sauce has thickened."));
        directions.add(new RecipeDirection("Return the pork chops to the skillet, spooning some of the sauce over them. Simmer for a few more minutes, until the pork chops are heated through and the sauce has reduced slightly."));
        directions.add(new RecipeDirection("Stir in the lemon juice. Adjust seasoning with additional salt and pepper if needed. Serve the pork chops with the garlic and pepper sauce spooned over the top."));

        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(new RecipeIngredient("pork chops", 4.0, "pieces"));
        ingredients.add(new RecipeIngredient("olive oil", 2.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("garlic", 4.0, "clove"));
        ingredients.add(new RecipeIngredient("fresh rosemary", 1.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("fresh thyme", 1.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("paprika", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("chicken broth", 0.5, "cup"));
        ingredients.add(new RecipeIngredient("white wine", 0.25, "cup"));
        ingredients.add(new RecipeIngredient("soy sauce", 1.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("Dijon mustard", 1.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("lemon juice", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("cornstarch", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("water", 1.0, "tablespoon"));

        List<String> images = List.of("mock-skillet-pepper-and-garlic-pork-chops-1.jpg");

        Recipe recipe = new Recipe("Skillet Garlic/Pepper Pork Chops", "Tender pork chops cooked with a savory garlic and pepper sauce.");
        recipe.setDirections(directions);
        recipe.setIngredients(ingredients);
        recipe.setImages(images);

        return recipe;
    }

    private Recipe sushiBowlRecipe() {
        List<RecipeDirection> directions = new ArrayList<>();
        directions.add(new RecipeDirection("Prepare the sushi rice: Rinse the rice under cold water until the water runs clear. Cook the rice according to package instructions and let it cool slightly."));
        directions.add(new RecipeDirection("In a small bowl, mix the rice vinegar, sugar, and salt until dissolved. Gently fold the mixture into the cooked rice and set aside."));
        directions.add(new RecipeDirection("Slice the raw sushi-grade fish (such as salmon and tuna) into thin strips or cubes."));
        directions.add(new RecipeDirection("Assemble the bowls: Divide the sushi rice among serving bowls."));
        directions.add(new RecipeDirection("Top each bowl with sliced fish, avocado, cucumber, carrots, and any other desired toppings like nori, sesame seeds, or pickled ginger."));
        directions.add(new RecipeDirection("Drizzle soy sauce, spicy mayo, or wasabi over the top."));
        directions.add(new RecipeDirection("Serve immediately with optional chopsticks and additional soy sauce on the side."));

        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(new RecipeIngredient("sushi rice", 2.0, "cup"));
        ingredients.add(new RecipeIngredient("rice vinegar", 3.0, "tablespoons"));
        ingredients.add(new RecipeIngredient("sugar", 1.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("salt", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("sushi-grade salmon", 0.5, "pound"));
        ingredients.add(new RecipeIngredient("sushi-grade tuna", 0.5, "pound"));
        ingredients.add(new RecipeIngredient("avocado", 1.0, "whole"));
        ingredients.add(new RecipeIngredient("cucumber", 1.0, "whole"));
        ingredients.add(new RecipeIngredient("carrots", 1.0, "whole"));
        ingredients.add(new RecipeIngredient("nori (seaweed sheets)", 1.0, "sheet"));
        ingredients.add(new RecipeIngredient("soy sauce", 2.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("spicy mayo", 2.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("wasabi", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("sesame seeds", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("pickled ginger", 1.0, "tablespoon"));

        List<String> images = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            images.add("mock-sushi-bowl-" + i + ".webp");
        }

        Recipe recipe = new Recipe("Rice Sushi Bowl", "A fresh and vibrant sushi bowl featuring sushi-grade raw fish, seasoned rice, and fresh toppings.");
        recipe.setDirections(directions);
        recipe.setIngredients(ingredients);
        recipe.setImages(images);
        return recipe;
    }

    private Recipe sausagePastaRecipe() {
        List<RecipeDirection> directions = new ArrayList<>();
        directions.add(new RecipeDirection("Cook the pasta in salted boiling water according to the package instructions until al dente. Drain and set aside."));
        directions.add(new RecipeDirection("In a large skillet, heat olive oil over medium heat. Add the sausage and cook until browned on all sides, breaking it into pieces with a spoon."));
        directions.add(new RecipeDirection("Add the chopped onion and minced garlic to the skillet and cook until the onion becomes soft and translucent."));
        directions.add(new RecipeDirection("Stir in the crushed tomatoes, dried oregano, and red pepper flakes. Bring the sauce to a simmer and cook for 10-15 minutes, allowing the flavors to combine."));
        directions.add(new RecipeDirection("Season the sauce with salt and pepper to taste. Stir in fresh basil just before serving."));
        directions.add(new RecipeDirection("Toss the cooked pasta with the sausage sauce. Serve with grated Parmesan cheese on top and garnish with extra basil, if desired."));

        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(new RecipeIngredient("pasta", 12.0, "ounce"));
        ingredients.add(new RecipeIngredient("Italian sausage", 1.0, "pound"));
        ingredients.add(new RecipeIngredient("olive oil", 2.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("onion", 1.0, "medium"));
        ingredients.add(new RecipeIngredient("garlic", 3.0, "clove"));
        ingredients.add(new RecipeIngredient("crushed tomatoes", 1.0, "can (28 oz)"));
        ingredients.add(new RecipeIngredient("dried oregano", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("red pepper flakes", 0.5, "teaspoon"));
        ingredients.add(new RecipeIngredient("salt", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("black pepper", 0.5, "teaspoon"));
        ingredients.add(new RecipeIngredient("fresh basil", 0.25, "cup"));
        ingredients.add(new RecipeIngredient("Parmesan cheese", 0.5, "cup"));

        List<String> images = List.of(
                "mock-pasta-sausage-1.webp",
                "mock-pasta-sausage-2.webp"
        );

        Recipe recipe = new Recipe("Sausage with Pasta", "A savory pasta dish with Italian sausage, rich tomato sauce, and fresh basil.");
        recipe.setDirections(directions);
        recipe.setIngredients(ingredients);
        recipe.setImages(images);

        return recipe;
    }

    private Recipe softServeIceCream() {
        List<RecipeDirection> directions = new ArrayList<>();
        directions.add(new RecipeDirection("In a large bowl, whisk together the milk, heavy cream, sugar, and vanilla extract until the sugar is completely dissolved."));
        directions.add(new RecipeDirection("Pour the mixture into an ice cream maker and churn according to the manufacturer's instructions until it reaches a soft-serve consistency."));
        directions.add(new RecipeDirection("Transfer the soft serve to a freezer-safe container and freeze for at least 2 hours to firm up before serving."));
        directions.add(new RecipeDirection("Serve the soft serve in cones or bowls. Top with your favorite toppings like chocolate sauce, sprinkles, or fresh fruit, if desired."));

        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(new RecipeIngredient("milk", 2.0, "cups"));
        ingredients.add(new RecipeIngredient("heavy cream", 2.0, "cups"));
        ingredients.add(new RecipeIngredient("sugar", 3.0, "cup"));
        ingredients.add(new RecipeIngredient("vanilla extract", 1.0, "tablespoon"));

        List<String> images = List.of(
                "mock-soft-serve-icecream-1.webp",
                "mock-soft-serve-icecream-2.webp",
                "mock-soft-serve-icecream-3.webp"
        );

        Recipe recipe = new Recipe("Soft Serve Ice Cream", "A creamy and delightful soft serve ice cream perfect for a hot day.");
        recipe.setDirections(directions);
        recipe.setIngredients(ingredients);
        recipe.setImages(images);

        return recipe;
    }

    private Recipe spaghettiAndSauceRecipe() {
        List<RecipeDirection> directions = new ArrayList<>();
        directions.add(new RecipeDirection("Cook the spaghetti in a large pot of salted boiling water according to the package instructions until al dente. Drain and set aside."));
        directions.add(new RecipeDirection("In a large skillet, heat olive oil over medium heat. Add the chopped onion and cook until translucent."));
        directions.add(new RecipeDirection("Add minced garlic to the skillet and cook for 1 minute, until fragrant."));
        directions.add(new RecipeDirection("Stir in the canned tomatoes, tomato paste, dried basil, dried oregano, and sugar. Bring to a simmer and cook for 15-20 minutes, allowing the flavors to meld together."));
        directions.add(new RecipeDirection("Season the sauce with salt and pepper to taste. Stir in fresh basil if using."));
        directions.add(new RecipeDirection("Toss the cooked spaghetti with the tomato sauce. Serve with grated Parmesan cheese on top and garnish with extra basil, if desired."));

        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(new RecipeIngredient("spaghetti", 12.0, "ounce"));
        ingredients.add(new RecipeIngredient("olive oil", 2.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("onion", 1.0, "medium, chopped"));
        ingredients.add(new RecipeIngredient("garlic", 3.0, "clove, minced"));
        ingredients.add(new RecipeIngredient("canned tomatoes", 1.0, "can (28 oz)"));
        ingredients.add(new RecipeIngredient("tomato paste", 2.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("dried basil", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("dried oregano", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("sugar", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("salt", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("black pepper", 0.5, "teaspoon"));
        ingredients.add(new RecipeIngredient("fresh basil", 0.25, "cup, chopped (optional)"));
        ingredients.add(new RecipeIngredient("Parmesan cheese", 0.5, "cup, grated (optional)"));

        List<String> images = List.of(
                "mock-spaghetti-1.jpg",
                "mock-spaghetti-2.jpg",
                "mock-spaghetti-3.jpg"
        );

        Recipe recipe = new Recipe("Spaghetti with Tomato Sauce", "A classic spaghetti dish with a rich and flavorful tomato sauce.");
        recipe.setDirections(directions);
        recipe.setIngredients(ingredients);
        recipe.setImages(images);

        return recipe;
    }

    private Recipe cookedShrimpRecipe() {
        List<RecipeDirection> directions = new ArrayList<>();
        directions.add(new RecipeDirection("In a large bowl, toss the shrimp with olive oil, garlic, lemon juice, paprika, salt, and black pepper until well coated."));
        directions.add(new RecipeDirection("Heat a large skillet over medium-high heat. Add the shrimp and cook for 2-3 minutes per side, or until the shrimp are pink and opaque."));
        directions.add(new RecipeDirection("Remove the shrimp from the skillet and transfer to a plate. Garnish with chopped parsley and lemon wedges if desired."));
        directions.add(new RecipeDirection("Serve immediately as an appetizer, or add to salads, pasta, or rice dishes."));

        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(new RecipeIngredient("shrimp", 1.0, "pound, peeled and deveined"));
        ingredients.add(new RecipeIngredient("olive oil", 2.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("garlic", 3.0, "clove, minced"));
        ingredients.add(new RecipeIngredient("lemon juice", 1.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("paprika", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("salt", 0.5, "teaspoon"));
        ingredients.add(new RecipeIngredient("black pepper", 0.5, "teaspoon"));
        ingredients.add(new RecipeIngredient("fresh parsley", 2.0, "tablespoon, chopped (optional)"));
        ingredients.add(new RecipeIngredient("lemon wedges", 1.0, "for garnish (optional)"));

        List<String> images = List.of("mock-cooked-shrimp-1.jpg");

        Recipe recipe = new Recipe("Cooked Shrimp", "Quick and flavorful cooked shrimp, perfect as an appetizer or for adding to other dishes.");
        recipe.setDirections(directions);
        recipe.setIngredients(ingredients);
        recipe.setImages(images);

        return recipe;
    }

    private Recipe hawaiianPizzaRecipe() {
        List<RecipeDirection> directions = new ArrayList<>();
        directions.add(new RecipeDirection("Preheat your oven to 475°F (245°C). If using a pizza stone, place it in the oven while it heats up."));
        directions.add(new RecipeDirection("Roll out the pizza dough on a floured surface to your desired thickness. Transfer the dough to a pizza peel or a baking sheet lined with parchment paper."));
        directions.add(new RecipeDirection("Spread the tomato sauce evenly over the dough, leaving a small border around the edges for the crust."));
        directions.add(new RecipeDirection("Sprinkle the shredded mozzarella cheese over the sauce, ensuring even coverage."));
        directions.add(new RecipeDirection("Distribute the cooked ham and pineapple chunks evenly over the cheese. Add additional toppings if desired, such as sliced bell peppers or onions."));
        directions.add(new RecipeDirection("Transfer the pizza to the preheated oven (or onto the pizza stone if using). Bake for 12-15 minutes, or until the crust is golden and the cheese is melted and bubbly."));
        directions.add(new RecipeDirection("Remove the pizza from the oven and let it cool for a few minutes before slicing. Garnish with fresh basil or parsley if desired."));

        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(new RecipeIngredient("pizza dough", 1.0, "pound"));
        ingredients.add(new RecipeIngredient("tomato sauce", 1.0, "cup"));
        ingredients.add(new RecipeIngredient("mozzarella cheese", 2.0, "cup, shredded"));
        ingredients.add(new RecipeIngredient("cooked ham", 1.0, "cup, diced"));
        ingredients.add(new RecipeIngredient("pineapple chunks", 1.0, "cup, drained"));
        ingredients.add(new RecipeIngredient("olive oil", 1.0, "tablespoon (optional, for brushing the crust)"));
        ingredients.add(new RecipeIngredient("fresh basil or parsley", 2.0, "tablespoon, chopped (optional, for garnish)"));

        List<String> images = List.of(
                "mock-hawaiian-pizza-1.jpg",
                "mock-hawaiian-pizza-2.webp"
        );

        Recipe recipe = new Recipe("Hawaiian Pizza", "A delicious pizza topped with ham and pineapple, combining sweet and savory flavors.");
        recipe.setDirections(directions);
        recipe.setIngredients(ingredients);
        recipe.setImages(images);

        return recipe;
    }

    private Recipe broccoliAlfredoRecipe() {
        List<RecipeDirection> directions = new ArrayList<>();
        directions.add(new RecipeDirection("Cook the fettuccine according to package instructions until al dente. Drain and set aside."));
        directions.add(new RecipeDirection("In a large skillet, melt 2 tablespoons of butter over medium heat. Add the chopped onion and cook until translucent, about 3-4 minutes."));
        directions.add(new RecipeDirection("Add minced garlic to the skillet and cook for another 1 minute until fragrant."));
        directions.add(new RecipeDirection("Stir in the heavy cream and bring to a gentle simmer. Cook for 3-4 minutes, allowing the cream to thicken slightly."));
        directions.add(new RecipeDirection("Add the grated Parmesan cheese to the skillet and stir until the cheese is fully melted and the sauce is smooth."));
        directions.add(new RecipeDirection("In the meantime, steam or blanch the broccoli florets until tender-crisp, about 3-4 minutes. Drain and set aside."));
        directions.add(new RecipeDirection("Add the cooked fettuccine and broccoli to the Alfredo sauce. Toss gently to coat the pasta and broccoli evenly with the sauce."));
        directions.add(new RecipeDirection("Season with salt and black pepper to taste. Serve immediately, garnished with additional Parmesan cheese and fresh parsley if desired."));

        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(new RecipeIngredient("fettuccine", 12.0, "ounce"));
        ingredients.add(new RecipeIngredient("butter", 4.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("onion", 1.0, "medium, chopped"));
        ingredients.add(new RecipeIngredient("garlic", 3.0, "clove, minced"));
        ingredients.add(new RecipeIngredient("heavy cream", 1.0, "cup"));
        ingredients.add(new RecipeIngredient("Parmesan cheese", 1.0, "cup, grated"));
        ingredients.add(new RecipeIngredient("broccoli florets", 2.0, "cup"));
        ingredients.add(new RecipeIngredient("salt", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("black pepper", 0.5, "teaspoon"));
        ingredients.add(new RecipeIngredient("fresh parsley", 2.0, "tablespoon, chopped (optional)"));

        List<String> images = List.of("mock-broccoli-alfredo-1.jpg");

        Recipe recipe = new Recipe("Broccoli Alfredo", "A creamy and comforting pasta dish featuring fettuccine tossed with a rich Alfredo sauce and tender broccoli florets.");
        recipe.setDirections(directions);
        recipe.setIngredients(ingredients);
        recipe.setImages(images);

        return recipe;
    }

    private Recipe macAndCheeseWithHotDogsRecipe() {
        List<RecipeDirection> directions = new ArrayList<>();
        directions.add(new RecipeDirection("Preheat your oven to 375°F (190°C). Grease a baking dish and set aside."));
        directions.add(new RecipeDirection("Cook the macaroni according to package instructions until al dente. Drain and set aside."));
        directions.add(new RecipeDirection("In a large skillet, cook the sliced hot dogs over medium heat until they are browned and slightly crispy. Remove from the skillet and set aside."));
        directions.add(new RecipeDirection("In the same skillet, melt 4 tablespoons of butter over medium heat. Stir in the flour and cook for 1-2 minutes, until the mixture is bubbly and golden brown."));
        directions.add(new RecipeDirection("Gradually whisk in the milk, making sure there are no lumps. Continue to cook, whisking frequently, until the sauce thickens and starts to bubble."));
        directions.add(new RecipeDirection("Remove the skillet from the heat and stir in the shredded cheddar cheese until it is fully melted and the sauce is smooth."));
        directions.add(new RecipeDirection("Combine the cooked macaroni, cheese sauce, and hot dogs in a large bowl. Mix until well combined."));
        directions.add(new RecipeDirection("Transfer the macaroni and cheese mixture to the prepared baking dish. Sprinkle the top with additional shredded cheddar cheese and breadcrumbs, if desired."));
        directions.add(new RecipeDirection("Bake in the preheated oven for 20-25 minutes, or until the top is golden brown and the cheese is bubbly."));
        directions.add(new RecipeDirection("Let cool for a few minutes before serving. Garnish with chopped parsley if desired."));

        List<RecipeIngredient> ingredients = new ArrayList<>();
        ingredients.add(new RecipeIngredient("macaroni", 12.0, "ounce"));
        ingredients.add(new RecipeIngredient("hot dogs", 4.0, "large, sliced"));
        ingredients.add(new RecipeIngredient("butter", 4.0, "tablespoon"));
        ingredients.add(new RecipeIngredient("all-purpose flour", 1.0, "quarter cup"));
        ingredients.add(new RecipeIngredient("milk", 2.0, "cup"));
        ingredients.add(new RecipeIngredient("cheddar cheese", 2.0, "cup, shredded"));
        ingredients.add(new RecipeIngredient("salt", 1.0, "teaspoon"));
        ingredients.add(new RecipeIngredient("black pepper", 0.5, "teaspoon"));
        ingredients.add(new RecipeIngredient("breadcrumbs", 0.5, "cup, optional"));
        ingredients.add(new RecipeIngredient("fresh parsley", 2.0, "tablespoon, chopped (optional)"));

        List<String> images = List.of("mock-mac-and-cheese-1.jpg");

        Recipe recipe = new Recipe("Mac and Cheese with Hot Dogs", "A comforting and hearty dish combining creamy macaroni and cheese with crispy hot dogs for a family-friendly meal.");
        recipe.setDirections(directions);
        recipe.setIngredients(ingredients);
        recipe.setImages(images);

        return recipe;
    }

    private void mockWithTitleIndex(Recipe recipe, int index) {
        if (index != 0) {
            recipe.setTitle(recipe.getTitle() + " " + index);
        }
        recipeMocks.add((recipe));
    }

    @Override
    public void createMocks() {
        for (int i = 0; i < 10; i++) {
            mockWithTitleIndex(chocolateChipCookiesRecipe(), i);
            mockWithTitleIndex(muffinRecipe(), i);
            mockWithTitleIndex(tonkotsuRamenRecipe(), i);
            mockWithTitleIndex(skilletPepperAndGarlicPorkChopsRecipe(), i);
            mockWithTitleIndex(sushiBowlRecipe(), i);
            mockWithTitleIndex(sausagePastaRecipe(), i);
            mockWithTitleIndex(softServeIceCream(), i);
            mockWithTitleIndex(spaghettiAndSauceRecipe(), i);
            mockWithTitleIndex(cookedShrimpRecipe(), i);
            mockWithTitleIndex(hawaiianPizzaRecipe(), i);
            mockWithTitleIndex(broccoliAlfredoRecipe(), i);
            mockWithTitleIndex(macAndCheeseWithHotDogsRecipe(), i);
        }

        for (Recipe recipeMock : recipeMocks) {
            if (!recipeService.recipeExists(recipeMock.getTitle())) {
                recipeService.saveRecipe(recipeMock);
            }
        }
    }
}
