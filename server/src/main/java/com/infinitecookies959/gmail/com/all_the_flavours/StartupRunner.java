package com.infinitecookies959.gmail.com.all_the_flavours;

import com.infinitecookies959.gmail.com.all_the_flavours.mocks.MockRecipeCreator;
import com.infinitecookies959.gmail.com.all_the_flavours.mocks.MockUserCreator;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupRunner implements ApplicationRunner  {

    private final MockRecipeCreator mockRecipeCreator;
    private final MockUserCreator mockUserCreator;

    public StartupRunner(MockRecipeCreator mockRecipeCreator, MockUserCreator mockUserCreator) {
        this.mockRecipeCreator = mockRecipeCreator;
        this.mockUserCreator = mockUserCreator;
    }

    @Override
    public void run(ApplicationArguments args) {
        mockUserCreator.createMocks();
        mockRecipeCreator.createMocks();
    }
}
