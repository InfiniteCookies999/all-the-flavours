package com.infinitecookies959.gmail.com.all_the_flavours.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recipe_directions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDirection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotNull
    private Integer stepNumber;

    @Column(length = 500, nullable = false)
    @NotNull
    @Size(min = 3, max = 500)
    private String text;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    @JsonIgnore
    private Recipe recipe;

    public RecipeDirection(String text) {
        this.text = text;
    }
}
