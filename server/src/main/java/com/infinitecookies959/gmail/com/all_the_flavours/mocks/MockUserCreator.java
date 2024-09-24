package com.infinitecookies959.gmail.com.all_the_flavours.mocks;

import com.infinitecookies959.gmail.com.all_the_flavours.models.User;
import com.infinitecookies959.gmail.com.all_the_flavours.services.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MockUserCreator implements MockCreator {

    private final UserService userService;

    private final List<User> userMocks = new ArrayList<>();

    public MockUserCreator(UserService userService) {
        this.userService = userService;
    }

    private User mockSusanSmith() {
        User user = new User();
        user.setFirstName("Susan");
        user.setLastName("Smith");
        user.setEmail("susan-smith@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("susan-smith");
        user.setPhone("222-333-4444");
        return user;
    }

    private User mockJohnDoe() {
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john-doe@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("john-doe");
        user.setPhone("123-456-7890");
        return user;
    }

    private User mockJaneDoe() {
        User user = new User();
        user.setFirstName("Jane");
        user.setLastName("Doe");
        user.setEmail("jane-doe@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("jane-doe");
        user.setPhone("234-567-8901");
        return user;
    }

    private User mockAliceJohnson() {
        User user = new User();
        user.setFirstName("Alice");
        user.setLastName("Johnson");
        user.setEmail("alice-johnson@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("alice-johnson");
        user.setPhone("345-678-9012");
        return user;
    }

    private User mockBobWilliams() {
        User user = new User();
        user.setFirstName("Bob");
        user.setLastName("Williams");
        user.setEmail("bob-williams@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("bob-williams");
        user.setPhone("456-789-0123");
        return user;
    }

    private void mockWithIndex(User userMock, int index) {
        if (index != 0) {
            userMock.setUsername(userMock.getUsername() + index);
            userMock.setEmail(userMock.getEmail() + index);
        }
        userMocks.add(userMock);
    }

    @Override
    public void createMocks() {
        for (int i = 0; i < 30; i++) {
            mockWithIndex(mockSusanSmith(), i);
            mockWithIndex(mockJohnDoe(), i);
            mockWithIndex(mockJaneDoe(), i);
            mockWithIndex(mockAliceJohnson(), i);
            mockWithIndex(mockBobWilliams(), i);
        }

        for (User userMock : userMocks) {
            if (!userService.userExists(userMock.getEmail())) {
                userService.saveUser(userMock);
            }
        }
    }
}
