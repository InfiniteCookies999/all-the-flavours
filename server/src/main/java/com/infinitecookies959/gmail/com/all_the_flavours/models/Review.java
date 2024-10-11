package com.infinitecookies959.gmail.com.all_the_flavours.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.infinitecookies959.gmail.com.all_the_flavours.models.constraints.ReviewConstraints;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime creationDate;

    @Column(length = ReviewConstraints.MAX_REVIEW_LENGTH, nullable = false)
    @NotNull
    @Size(min = ReviewConstraints.MIN_REVIEW_LENGTH, max = ReviewConstraints.MAX_REVIEW_LENGTH)
    private String text;

    @Column(nullable = false)
    @NotNull
    @Min(0)
    @Max(10)
    private int rating;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    @JsonIgnore
    private Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "reviewer_id", nullable = false)
    @JsonIgnore
    private User reviewer;

    public void setRating(int fullStars, boolean halfStar) {
        rating = fullStars * 2 + (halfStar ? 1 : 0);
    }
}
