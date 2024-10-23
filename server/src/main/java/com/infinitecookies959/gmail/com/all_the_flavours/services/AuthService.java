package com.infinitecookies959.gmail.com.all_the_flavours.services;

import com.infinitecookies959.gmail.com.all_the_flavours.exceptions.CredentialTakenException;
import com.infinitecookies959.gmail.com.all_the_flavours.exceptions.WrongCredentialsException;
import com.infinitecookies959.gmail.com.all_the_flavours.models.LoginRequest;
import com.infinitecookies959.gmail.com.all_the_flavours.models.User;
import com.infinitecookies959.gmail.com.all_the_flavours.repositories.UserRepository;
import com.infinitecookies959.gmail.com.all_the_flavours.security.SessionPrincipal;
import com.infinitecookies959.gmail.com.all_the_flavours.security.SessionToken;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserService userService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    public boolean passwordsDoNotMatch(String password, User user) {
        return !passwordEncoder.matches(password, user.getEncodedPassword());
    }

    @Transactional(readOnly = true)
    public User checkCredentials(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new WrongCredentialsException("Invalid email or password"));

        // Check the provided password against the encoded password.
        if (passwordsDoNotMatch(request.getPassword(), user)) {
            throw new WrongCredentialsException("Invalid email or password");
        }

        return user;
    }

    public void authenticate(LoginRequest request, HttpSession session) {
        User user = checkCredentials(request);
        authenticate(session, user);
    }

    private void authenticate(HttpSession session, User user) {
        Authentication auth = new SessionToken(
                new SessionPrincipal(user.getId()),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );

        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(auth);
        session.setAttribute("SPRING_SECURITY_CONTEXT", securityContext);
    }

    @Transactional
    public User register(User userRequest, HttpSession session) {
        Optional<User> userByEmail = userRepository.findByEmail(userRequest.getEmail());
        if (userByEmail.isPresent()) {
            throw new CredentialTakenException("email taken");
        }

        Optional<User> userByUsername = userRepository.findByUsername(userRequest.getUsername());
        if (userByUsername.isPresent()) {
            throw new CredentialTakenException("username taken");
        }

        String encodedPassword = passwordEncoder.encode(userRequest.getPassword());
        userRequest.setEncodedPassword(encodedPassword);

        User user = userService.saveUser(userRequest);
        authenticate(session, user);

        return user;
    }

    @Transactional
    public void updateEmail(Long userId, String email, String password) {

        User user = userService.getUserOrThrow(userId);

        // Only need to check if the email is taken if the email they are
        // trying to change is not the email they already have.
        if (!Objects.equals(email.toLowerCase(), user.getEmail().toLowerCase())) {
            Optional<User> userByEmail = userRepository.findByEmail(email);
            if (userByEmail.isPresent()) {
                throw new CredentialTakenException("email taken");
            }
        }

        if (passwordsDoNotMatch(password, user)) {
            throw new WrongCredentialsException("wrong password");
        }

        user.setEmail(email);
        userRepository.save(user);
    }

    @Transactional
    public void updatePassword(Long userId, String currentPassword, String newPassword) {

        User user = userService.getUserOrThrow(userId);
        if (passwordsDoNotMatch(currentPassword, user)) {
            throw new WrongCredentialsException("wrong password");
        }

        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setEncodedPassword(encodedPassword);
        userRepository.save(user);
    }
}
