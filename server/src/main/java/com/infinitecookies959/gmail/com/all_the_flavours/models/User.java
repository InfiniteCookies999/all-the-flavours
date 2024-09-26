package com.infinitecookies959.gmail.com.all_the_flavours.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.infinitecookies959.gmail.com.all_the_flavours.models.constraints.UserConstraints;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime joinDate;

    @Column(length = UserConstraints.MAX_NAME_LENGTH, nullable = false)
    @NotEmpty
    @Size(max = UserConstraints.MAX_NAME_LENGTH)
    @Pattern(regexp = UserConstraints.NAME_PATTERN)
    private String firstName;

    @Column(length = UserConstraints.MAX_NAME_LENGTH, nullable = false)
    @NotEmpty
    @Size(max = UserConstraints.MAX_NAME_LENGTH)
    @Pattern(regexp = UserConstraints.NAME_PATTERN)
    private String lastName;

    // COLLATE utf8mb4_general_ci tells the database to treat the email as if it is case-insensitive.
    @Column(nullable = false, unique = true, columnDefinition = "VARCHAR(255) COLLATE utf8mb4_general_ci")
    @NotEmpty
    @Email
    private String email;

    @JsonIgnore
    @Column(length = 100, nullable = false)
    @NotEmpty
    private String encodedPassword;

    // Not saved to the database. Used when registering the user.
    // Contains the plain text of the password.
    @Transient
    @NotEmpty
    @Pattern(regexp = UserConstraints.PASSWORD_PATTERN)
    private String password;

    @Column(length = UserConstraints.MAX_USERNAME_LENGTH, unique = true)
    @NotEmpty
    @Size(max = UserConstraints.MAX_USERNAME_LENGTH)
    @Pattern(regexp = UserConstraints.USERNAME_PATTERN)
    private String username;

    @Column(length = 12, nullable = false)
    @NotEmpty
    @Pattern(regexp = UserConstraints.PHONE_PATTERN)
    private String phone;

    @Column
    private String profileImage;

    @Column(length = UserConstraints.MAX_BIO_LENGTH)
    private String bio;

}
