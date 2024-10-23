package com.infinitecookies959.gmail.com.all_the_flavours.controllers;

import com.infinitecookies959.gmail.com.all_the_flavours.models.LoginRequest;
import com.infinitecookies959.gmail.com.all_the_flavours.models.User;
import com.infinitecookies959.gmail.com.all_the_flavours.models.UserEmailUpdateRequest;
import com.infinitecookies959.gmail.com.all_the_flavours.models.UserPasswordUpdateRequest;
import com.infinitecookies959.gmail.com.all_the_flavours.models.validation.RegistrationValidationGroup;
import com.infinitecookies959.gmail.com.all_the_flavours.security.SessionPrincipal;
import com.infinitecookies959.gmail.com.all_the_flavours.services.AuthService;
import com.infinitecookies959.gmail.com.all_the_flavours.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.groups.Default;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        authService.authenticate(loginRequest, request.getSession(true));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/session-info")
    public ResponseEntity<Map<String, Object>> isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isLoggedIn = authentication != null &&
                             authentication.isAuthenticated() &&
                             (authentication.getPrincipal() instanceof SessionPrincipal);

        Map<String, Object> response = new HashMap<>();
        response.put("isLoggedIn", isLoggedIn);
        if (isLoggedIn) {
            User user = userService.getSessionUser((SessionPrincipal) authentication.getPrincipal());
            response.put("avatarSrc", user.getAvatarSrc());
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }

        HttpSession session = request.getSession();
        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok().build();
    }

    @Validated({ Default.class, RegistrationValidationGroup.class })
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User userRequest,
                                      HttpServletRequest request) {

        User user = authService.register(userRequest, request.getSession(true));
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/email")
    public ResponseEntity<?> updateUserEmail(@Valid @RequestBody UserEmailUpdateRequest request,
                                             @AuthenticationPrincipal SessionPrincipal session) {

        User user = userService.getSessionUser(session);
        authService.updateEmail(user.getId(), request.getEmail(), request.getPassword());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/password")
    public ResponseEntity<?> updateUserPassword(@Valid @RequestBody UserPasswordUpdateRequest request,
                                                @AuthenticationPrincipal SessionPrincipal session) {

        User user = userService.getSessionUser(session);
        authService.updatePassword(user.getId(), request.getCurrentPassword(), request.getNewPassword());
        return ResponseEntity.ok().build();
    }
}
