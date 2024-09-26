package com.infinitecookies959.gmail.com.all_the_flavours.controllers;

import com.infinitecookies959.gmail.com.all_the_flavours.SessionPrincipal;
import com.infinitecookies959.gmail.com.all_the_flavours.models.LoginRequest;
import com.infinitecookies959.gmail.com.all_the_flavours.models.User;
import com.infinitecookies959.gmail.com.all_the_flavours.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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

    @PostMapping("/register")
    public void register() {

    }
}
