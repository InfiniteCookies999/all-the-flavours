package com.infinitecookies959.gmail.com.all_the_flavours;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupRunner implements ApplicationRunner  {

    private final MockRecipeCreator mockRecipeCreator;

    public StartupRunner(MockRecipeCreator mockRecipeCreator) {
        this.mockRecipeCreator = mockRecipeCreator;
    }

    @Override
    public void run(ApplicationArguments args) {
        mockRecipeCreator.createMockRecipes();
    }
}
