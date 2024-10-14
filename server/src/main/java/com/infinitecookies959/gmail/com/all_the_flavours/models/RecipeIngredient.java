package com.infinitecookies959.gmail.com.all_the_flavours.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.infinitecookies959.gmail.com.all_the_flavours.models.constraints.RecipeConstraints;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "recipe_ingredients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = RecipeConstraints.MAX_INGREDIENT_NAME_LENGTH, nullable = false)
    @NotEmpty
    @Size(max = RecipeConstraints.MAX_INGREDIENT_NAME_LENGTH)
    @NotNull
    private String name;

    @Column(nullable = false)
    @NotNull
    private Double quantity;

    @Column(length = RecipeConstraints.MAX_INGREDIENT_UNIT_LENGTH)
    private String unit;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private Recipe recipe;

    public RecipeIngredient(String name, Double quantity, String unit) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }

    public RecipeIngredient(String name, Double quantity) {
        this(name, quantity, null);
    }
}
