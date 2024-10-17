package com.infinitecookies959.gmail.com.all_the_flavours.repositories;

import com.infinitecookies959.gmail.com.all_the_flavours.models.RecipeRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRankRepository extends JpaRepository<RecipeRank, Long> {

    RecipeRank findByRecipeId(Long recipeId);

    RecipeRank findFirstByScoreGreaterThanOrderByScoreAsc(double score);

    @Modifying
    @Query("UPDATE RecipeRank r SET r.value = r.value + 1 WHERE r.value BETWEEN :start AND :end")
    void incrementRanksBetween(@Param("start") long start, @Param("end") long end);

    @Modifying
    @Query("UPDATE RecipeRank r SET r.value = r.value - 1 WHERE r.value BETWEEN :start AND :end")
    void decrementRanksBetween(@Param("start") long start, @Param("end") long end);

    @Modifying
    @Query("UPDATE RecipeRank r SET r.value = r.value + 1 WHERE r.value >= :startValue")
    void incrementRanksFromValueToMax(@Param("startValue") Long startValue);

    List<RecipeRank> findFirst8ByValueIsNotNullOrderByValueAsc();

}