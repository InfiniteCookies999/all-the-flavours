package com.infinitecookies959.gmail.com.all_the_flavours.controllers;

import com.infinitecookies959.gmail.com.all_the_flavours.models.LoginRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public void login(@RequestBody LoginRequest request) {

    }
}
