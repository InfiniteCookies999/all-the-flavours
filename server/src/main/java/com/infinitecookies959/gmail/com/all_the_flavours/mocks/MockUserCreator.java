package com.infinitecookies959.gmail.com.all_the_flavours.mocks;

import com.infinitecookies959.gmail.com.all_the_flavours.models.User;
import com.infinitecookies959.gmail.com.all_the_flavours.services.UserService;
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

    private User mockCharlieBrown() {
        User user = new User();
        user.setFirstName("Charlie");
        user.setLastName("Brown");
        user.setEmail("charlie-brown@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("charlie-brown");
        user.setPhone("567-890-1234");
        return user;
    }

    private User mockDavidClark() {
        User user = new User();
        user.setFirstName("David");
        user.setLastName("Clark");
        user.setEmail("david-clark@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("david-clark");
        user.setPhone("678-901-2345");
        return user;
    }

    private User mockEveLewis() {
        User user = new User();
        user.setFirstName("Eve");
        user.setLastName("Lewis");
        user.setEmail("eve-lewis@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("eve-lewis");
        user.setPhone("789-012-3456");
        return user;
    }

    private User mockFrankMiller() {
        User user = new User();
        user.setFirstName("Frank");
        user.setLastName("Miller");
        user.setEmail("frank-miller@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("frank-miller");
        user.setPhone("890-123-4567");
        return user;
    }

    private User mockGraceLee() {
        User user = new User();
        user.setFirstName("Grace");
        user.setLastName("Lee");
        user.setEmail("grace-lee@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("grace-lee");
        user.setPhone("901-234-5678");
        return user;
    }

    private User mockHankWilson() {
        User user = new User();
        user.setFirstName("Hank");
        user.setLastName("Wilson");
        user.setEmail("hank-wilson@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("hank-wilson");
        user.setPhone("012-345-6789");
        return user;
    }

    private User mockIvyDavis() {
        User user = new User();
        user.setFirstName("Ivy");
        user.setLastName("Davis");
        user.setEmail("ivy-davis@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("ivy-davis");
        user.setPhone("123-456-7891");
        return user;
    }

    private User mockJackTaylor() {
        User user = new User();
        user.setFirstName("Jack");
        user.setLastName("Taylor");
        user.setEmail("jack-taylor@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("jack-taylor");
        user.setPhone("234-567-8902");
        return user;
    }

    private User mockKarenWhite() {
        User user = new User();
        user.setFirstName("Karen");
        user.setLastName("White");
        user.setEmail("karen-white@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("karen-white");
        user.setPhone("345-678-9013");
        return user;
    }

    private User mockLiamMartinez() {
        User user = new User();
        user.setFirstName("Liam");
        user.setLastName("Martinez");
        user.setEmail("liam-martinez@gmail.com");
        user.setPassword("Password123!");
        user.setUsername("liam-martinez");
        user.setPhone("456-789-0124");
        return user;
    }

    @Override
    public void createMocks() {
        userMocks.add(mockSusanSmith());
        userMocks.add(mockJohnDoe());
        userMocks.add(mockJaneDoe());
        userMocks.add(mockAliceJohnson());
        userMocks.add(mockBobWilliams());
        userMocks.add(mockCharlieBrown());
        userMocks.add(mockDavidClark());
        userMocks.add(mockEveLewis());
        userMocks.add(mockFrankMiller());
        userMocks.add(mockGraceLee());
        userMocks.add(mockHankWilson());
        userMocks.add(mockIvyDavis());
        userMocks.add(mockJackTaylor());
        userMocks.add(mockKarenWhite());
        userMocks.add(mockLiamMartinez());

        for (User userMock : userMocks) {
            if (!userService.userExists(userMock.getEmail())) {
                userService.saveUser(userMock);
            }
        }
    }
}
