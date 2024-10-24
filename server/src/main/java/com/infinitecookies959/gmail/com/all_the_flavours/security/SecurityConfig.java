package com.infinitecookies959.gmail.com.all_the_flavours.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // TODO: This is wrong for authentication. It should be checking user I am pretty sure.
        return http
                // Disable Cross-Origin Request protection because we want the frontend
                // to still be able to make requests.
                .cors(AbstractHttpConfigurer::disable)
                // Same for Cross Site Request Forgeries. Although in practice we should
                // probably not have this.
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        // Allow the user to get recipes and reviews.
                        .requestMatchers(HttpMethod.GET, "/api/recipes").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/recipes/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/reviews").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/reviews/*").permitAll()
                        // Allow the user to get other user's profiles
                        .requestMatchers(HttpMethod.GET, "/api/users/{userId:[0-9]+}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/users/by-username/*").permitAll()
                        // Login and registration are only for non-logged in users.
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").anonymous()
                        .requestMatchers(HttpMethod.POST, "/api/auth/register").anonymous()
                        // Anyone can check if they are logged in.
                        .requestMatchers(HttpMethod.GET, "/api/auth/session-info").permitAll()
                        // All other api requests must require login.
                        // Allow access to all other non-API requests.
                        .requestMatchers("/api/*").authenticated()
                        .anyRequest().permitAll()
                )
                .logout(logout -> {
                    logout.logoutUrl("/logout")
                            .invalidateHttpSession(true)
                            .deleteCookies("JSESSIONID");
                })
                .build();
    }
}
