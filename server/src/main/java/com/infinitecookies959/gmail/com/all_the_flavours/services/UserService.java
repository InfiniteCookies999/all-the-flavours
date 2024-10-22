package com.infinitecookies959.gmail.com.all_the_flavours.services;

import com.infinitecookies959.gmail.com.all_the_flavours.security.SessionPrincipal;
import com.infinitecookies959.gmail.com.all_the_flavours.models.User;
import com.infinitecookies959.gmail.com.all_the_flavours.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final FileUploadService fileUploadService;

    private static final String AVATAR_IMAGE_UPLOAD_PATH = "images/upload/avatars";

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository, FileUploadService fileUploadService) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.fileUploadService = fileUploadService;
    }

    @Transactional
    public User saveUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setEncodedPassword(encodedPassword);
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public boolean userExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id).map(user -> {
            String existingAvatarImage = user.getAvatarImage();
            if (existingAvatarImage != null) {
                // We want to store it into a different variable because JPA will
                // have state persistence across a request which can lead to this
                // having the wrong state on multiple calls.
                user.setAvatarSrc("/" + AVATAR_IMAGE_UPLOAD_PATH + "/" + existingAvatarImage);
            }
            return user;
        });
    }

    public User getSessionUser(SessionPrincipal session) {
        return getUserById(session.getUserId()).orElseThrow();
    }

    @Transactional
    public void updateAvatarImage(Long userId, MultipartFile file) throws IOException {
        User user = getUserById(userId).orElseThrow(
                () -> new EntityNotFoundException("User not found with id: " + userId));

        String randomFileName = FileUploadService.getRandomizedFileName(file);
        fileUploadService.transferFile(file, AVATAR_IMAGE_UPLOAD_PATH, randomFileName);

        String existingAvatarSrc = user.getAvatarSrc();
        if (existingAvatarSrc != null) {
            try {
                Files.delete(fileUploadService.getPath(existingAvatarSrc));
            } catch (IOException ignore) {
            }
        }

        user.setAvatarImage(randomFileName);

        userRepository.save(user);
    }
}
