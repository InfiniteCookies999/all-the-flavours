package com.infinitecookies959.gmail.com.all_the_flavours.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "recipe_ranks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeRank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private Recipe recipe;

    @JsonProperty(required = true, access = JsonProperty.Access.READ_ONLY)
    private Long value = null; // Initially null because it has no rank if there is no reviews.

    @JsonIgnore
    private Double score = null;

}
