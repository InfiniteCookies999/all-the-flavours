package com.infinitecookies959.gmail.com.all_the_flavours.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.infinitecookies959.gmail.com.all_the_flavours.models.constraints.RecipeConstraints;
import com.infinitecookies959.gmail.com.all_the_flavours.models.validation.FileType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "recipes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime creationDate;

    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime lastUpdated;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(length = RecipeConstraints.MAX_TITLE_LENGTH, nullable = false)
    @Size(min = RecipeConstraints.MIN_TITLE_LENGTH, max = RecipeConstraints.MAX_TITLE_LENGTH)
    @NotNull
    private String title;

    @Column(length = RecipeConstraints.MAX_DESCRIPTION_LENGTH, nullable = false)
    @Size(min = RecipeConstraints.MIN_DESCRIPTION_LENGTH, max = RecipeConstraints.MAX_DESCRIPTION_LENGTH)
    @NotNull
    private String description;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @NotEmpty
    @Size(max = RecipeConstraints.MAX_NUMBER_OF_INGREDIENTS)
    @NotNull
    private List<RecipeIngredient> ingredients;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @Size(max = RecipeConstraints.MAX_NUMBER_OF_DIRECTIONS)
    @NotNull
    private List<RecipeDirection> directions;

    @ElementCollection
    @CollectionTable(name = "recipe_images", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "image_path")
    @Size(max = RecipeConstraints.MAX_NUMBER_OF_IMAGES)
    @JsonProperty(required = true, access = JsonProperty.Access.READ_ONLY)
    private List<String> images;

    @Transient // Do not save to database.
    @NotNull
    @JsonProperty(required = true, access = JsonProperty.Access.WRITE_ONLY)
    // TODO: Hardcoded this because it does not consider a final array a constant.
    @FileType(accepted = { "image/jpg", "image/jpeg", "image/png", "image/webp" })
    private MultipartFile[] uploadImages;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    private List<Review> reviews;

    @OneToOne(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private RecipeRank recipeRank;

    @Transient // Do not save to database.
    @JsonProperty(required = true, access = JsonProperty.Access.READ_ONLY)
    private double rating;

    @Transient // Do not save to database.
    @JsonProperty(required = true, access = JsonProperty.Access.READ_ONLY)
    private long numberOfReviews;

    public Recipe(String title, String description) {
        this.title = title;
        this.description = description;
    }
}
