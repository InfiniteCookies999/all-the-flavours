package com.infinitecookies959.gmail.com.all_the_flavours.controllers;

import com.infinitecookies959.gmail.com.all_the_flavours.models.User;
import com.infinitecookies959.gmail.com.all_the_flavours.models.UserNameUpdateRequest;
import com.infinitecookies959.gmail.com.all_the_flavours.models.UserPhoneUpdateRequest;
import com.infinitecookies959.gmail.com.all_the_flavours.models.UserUsernameUpdateRequest;
import com.infinitecookies959.gmail.com.all_the_flavours.models.validation.FileType;
import com.infinitecookies959.gmail.com.all_the_flavours.security.SessionPrincipal;
import com.infinitecookies959.gmail.com.all_the_flavours.services.AuthService;
import com.infinitecookies959.gmail.com.all_the_flavours.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService, AuthService authService) {
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

    private boolean notAuthorizedToUpdate(SessionPrincipal session, Long userId) {
        // If we were to allow admin code then we would also check if they are an
        // admin here.
        return !Objects.equals(userService.getSessionUser(session).getId(), userId);
    }

    @PatchMapping(value = "/{userId}/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateAvatarImage(@PathVariable Long userId,
                                               @RequestParam("file")
                                               @Validated
                                               @FileType(accepted = { "image/jpg", "image/jpeg", "image/png", "image/webp" })
                                               MultipartFile file,
                                               @AuthenticationPrincipal SessionPrincipal session) throws IOException {
        if (notAuthorizedToUpdate(session, userId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        userService.updateAvatarImage(userId, file);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{userId}/name")
    public ResponseEntity<?> updateUserName(@PathVariable Long userId,
                                            @Valid @RequestBody UserNameUpdateRequest request,
                                            @AuthenticationPrincipal SessionPrincipal session) {
        if (notAuthorizedToUpdate(session, userId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        userService.updateUserName(userId, request.getFirstName(), request.getLastName());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{userId}/username")
    public ResponseEntity<?> updateUserUsername(@PathVariable Long userId,
                                                @Valid @RequestBody UserUsernameUpdateRequest request,
                                                @AuthenticationPrincipal SessionPrincipal session) {
        if (notAuthorizedToUpdate(session, userId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        userService.updateUserUsername(userId, request.getUsername());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{userId}/phone")
    public ResponseEntity<?> updateUserPhone(@PathVariable Long userId,
                                             @Valid @RequestBody UserPhoneUpdateRequest request,
                                             @AuthenticationPrincipal SessionPrincipal session) {
        if (notAuthorizedToUpdate(session, userId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        userService.updatePhone(userId, request.getPhone());
        return ResponseEntity.ok().build();
    }
}
