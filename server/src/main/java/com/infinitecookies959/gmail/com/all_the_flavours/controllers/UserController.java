package com.infinitecookies959.gmail.com.all_the_flavours.controllers;

import com.infinitecookies959.gmail.com.all_the_flavours.models.User;
import com.infinitecookies959.gmail.com.all_the_flavours.security.SessionPrincipal;
import com.infinitecookies959.gmail.com.all_the_flavours.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/session")
    public ResponseEntity<User> getSessionUser(@AuthenticationPrincipal SessionPrincipal session) {
        return ResponseEntity.ok(userService.getSessionUser(session));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@RequestParam Long userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
