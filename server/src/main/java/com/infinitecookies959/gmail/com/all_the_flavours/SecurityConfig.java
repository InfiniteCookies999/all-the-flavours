package com.infinitecookies959.gmail.com.all_the_flavours;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
        return http
                // Disable Cross-Origin Request protection because we want the frontend
                // to still be able to make requests.
                .cors(AbstractHttpConfigurer::disable)
                // Same for Cross Site Request Forgeries. Although in practice we should
                // probably not have this.
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        // Allow the user to get recipes.
                        .requestMatchers("GET", "/api/recipes").permitAll()
                        .requestMatchers("GET", "/api/recipes/*").permitAll()
                        // Login and registration are only for non-logged in users.
                        .requestMatchers("POST", "/api/auth/login").anonymous()
                        .requestMatchers("POST", "/api/auth/register").anonymous()
                        // Anyone can check if they are logged in.
                        .requestMatchers("GET", "/api/auth/is-logged-in").permitAll()
                        // All other api requests must require login.
                        .requestMatchers("/api/*").authenticated()
                        // Allow access to all other non-API requests.
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
