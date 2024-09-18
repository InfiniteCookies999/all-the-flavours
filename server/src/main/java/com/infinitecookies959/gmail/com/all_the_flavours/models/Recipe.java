package com.infinitecookies959.gmail.com.all_the_flavours.models;

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

    @Column(length = 100, nullable = false)
    @Size(min = 10, max = 100)
    @NotNull
    private String title;

    @Column(length = 300, nullable = false)
    @Size(min = 30, max = 300)
    @NotNull
    private String description;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @NotEmpty
    @Size(min = 1, max = 50)
    private List<RecipeIngredient> ingredients;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @Size(min = 1, max = 30)
    private List<RecipeDirection> directions;

    @ElementCollection
    @CollectionTable(name = "recipe_images", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "image_path")
    @Size(min = 1, max = 10)
    private List<String> recipeImages;

    public Recipe(String title, String description) {
        this.title = title;
        this.description = description;
    }
}
