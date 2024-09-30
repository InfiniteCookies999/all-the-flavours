package com.infinitecookies959.gmail.com.all_the_flavours.services;

import com.infinitecookies959.gmail.com.all_the_flavours.SessionPrincipal;
import com.infinitecookies959.gmail.com.all_the_flavours.exceptions.CredentialTakenException;
import com.infinitecookies959.gmail.com.all_the_flavours.models.LoginRequest;
import com.infinitecookies959.gmail.com.all_the_flavours.models.User;
import com.infinitecookies959.gmail.com.all_the_flavours.repositories.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional(readOnly = true)
    public User checkCredentials(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        // Check the provided password against the encoded password.
        if (!passwordEncoder.matches(request.getPassword(), user.getEncodedPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        return user;
    }

    public void authenticate(LoginRequest request, HttpSession session) {
        User user = checkCredentials(request);
        authenticate(session, user);
    }

    private void authenticate(HttpSession session, User user) {
        // TODO: Probably a good idea to not rely on the UsernamePasswordAuthenticationToken
        //       and just replicate the logic ourselves.
        Authentication auth = new UsernamePasswordAuthenticationToken(
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
}
