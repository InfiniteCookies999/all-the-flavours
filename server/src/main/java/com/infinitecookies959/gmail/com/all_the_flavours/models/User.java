package com.infinitecookies959.gmail.com.all_the_flavours.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.infinitecookies959.gmail.com.all_the_flavours.models.constraints.UserConstraints;
import com.infinitecookies959.gmail.com.all_the_flavours.models.validation.RegistrationValidationGroup;
import com.infinitecookies959.gmail.com.all_the_flavours.models.validation.ValidName;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

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

    @ValidName
    private String firstName;

    @ValidName
    private String lastName;

    // COLLATE utf8mb4_general_ci tells the database to treat the email as if it is case-insensitive.
    @Column(nullable = false, unique = true, columnDefinition = "VARCHAR(255) COLLATE utf8mb4_general_ci")
    @NotEmpty
    @Email
    private String email;

    @JsonIgnore // Do not send to client.
    @Column(length = 100, nullable = false)
    @NotEmpty
    private String encodedPassword;

    @Transient // Do not save to database.
    @NotEmpty(groups = RegistrationValidationGroup.class)
    @Pattern(regexp = UserConstraints.PASSWORD_PATTERN, groups = RegistrationValidationGroup.class)
    @JsonProperty(required = true, access = JsonProperty.Access.WRITE_ONLY) // Enforce that when the user sends this object they include the password.
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

    @Column(length = UserConstraints.MAX_BIO_LENGTH)
    @Size(max = UserConstraints.MAX_BIO_LENGTH)
    private String bio;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    private List<Recipe> recipes;

    @OneToMany(mappedBy = "reviewer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    private List<Review> reviews;

    @JsonIgnore
    @ToString.Exclude
    private String avatarImage;

    @Transient
    @JsonProperty(required = true, access = JsonProperty.Access.READ_ONLY)
    private String avatarSrc;

}
