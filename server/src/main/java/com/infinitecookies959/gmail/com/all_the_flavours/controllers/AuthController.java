package com.infinitecookies959.gmail.com.all_the_flavours.controllers;

import com.infinitecookies959.gmail.com.all_the_flavours.security.SessionPrincipal;
import com.infinitecookies959.gmail.com.all_the_flavours.exceptions.CredentialTakenException;
import com.infinitecookies959.gmail.com.all_the_flavours.models.LoginRequest;
import com.infinitecookies959.gmail.com.all_the_flavours.models.User;
import com.infinitecookies959.gmail.com.all_the_flavours.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        try {
            authService.authenticate(loginRequest, request.getSession(true));
            return ResponseEntity.ok().build();
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/is-logged-in")
    public ResponseEntity<Map<String, Boolean>> isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean status = authentication != null &&
                         authentication.isAuthenticated() &&
                         (authentication.getPrincipal() instanceof SessionPrincipal);
        return ResponseEntity.ok(Map.of("status", status));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User userRequest, HttpServletRequest request) {
        try {
            User user = authService.register(userRequest, request.getSession(true));
            return ResponseEntity.ok(user);
        } catch (CredentialTakenException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
