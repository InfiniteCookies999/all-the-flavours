package com.infinitecookies959.gmail.com.all_the_flavours.models;

import com.infinitecookies959.gmail.com.all_the_flavours.models.constraints.RecipeConstraints;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
    private List<RecipeIngredient> ingredients;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @Size(max = RecipeConstraints.MAX_NUMBER_OF_DIRECTIONS)
    private List<RecipeDirection> directions;

    @ElementCollection
    @CollectionTable(name = "recipe_images", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "image_path")
    @NotEmpty
    @Size(max = RecipeConstraints.MAX_NUMBER_OF_IMAGES)
    private List<String> images;

    public Recipe(String title, String description) {
        this.title = title;
        this.description = description;
    }
}
