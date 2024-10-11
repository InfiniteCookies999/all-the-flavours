package com.infinitecookies959.gmail.com.all_the_flavours;

import com.infinitecookies959.gmail.com.all_the_flavours.mocks.MockRecipeCreator;
import com.infinitecookies959.gmail.com.all_the_flavours.mocks.MockReviewsCreator;
import com.infinitecookies959.gmail.com.all_the_flavours.mocks.MockUserCreator;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupRunner implements ApplicationRunner  {

    private final MockRecipeCreator mockRecipeCreator;
    private final MockUserCreator mockUserCreator;
    private final MockReviewsCreator mockReviewsCreator;

    public StartupRunner(MockRecipeCreator mockRecipeCreator, MockUserCreator mockUserCreator, MockReviewsCreator mockReviewsCreator) {
        this.mockRecipeCreator = mockRecipeCreator;
        this.mockUserCreator = mockUserCreator;
        this.mockReviewsCreator = mockReviewsCreator;
    }

    @Override
    public void run(ApplicationArguments args) {
        mockUserCreator.createMocks();
        mockRecipeCreator.createMocks();
        mockReviewsCreator.createMocks();
    }
}
