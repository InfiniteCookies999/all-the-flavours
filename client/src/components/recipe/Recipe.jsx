import RecipeCarousel from "./RecipeCarousel";
import styled from "styled-components";
import RecipeInfo from "./RecipeInfo";
import RecipeDescription from "./RecipeDescription";
import RecipeIngredients from "./RecipeIngredients";
import RecipeContext from "../../contexts/RecipeContext";
import RecipeDirections from "./RecipeDirections";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useError } from "../../contexts/ErrorContext";
import ReviewBox from "../review/ReviewBox";
import useCollapsed from "../../hooks/useCollapsed";
import theme from "../../theme";
import PrimaryButton from "../PrimaryButton";
import ReviewListing from "../review/ReviewListing";
import { AuthContext } from "../../contexts/AuthContext";

const RecipeContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 80%; 
  }
`;

const Recipe = () => {

  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [firstReviews, setFirstReviews] = useState(null);

  const { isLoggedIn } = useContext(AuthContext);

  const { setError } = useError();

  const reviewsRef = useRef();

  const collapsed = useCollapsed();

  document.title = "Recipe";
  
  useEffect(() => {
    axios.get(`/api/recipes/${id}`)
      .then(response => setRecipe(response.data))
      .catch(error => setError(error));
  }, [id, setError]);

  useEffect(() => {
    if (!recipe) return;

    axios.get(`/api/reviews?recipeId=${recipe.id}&page=0`)
      .then(response => setFirstReviews(response.data))
      .catch(error => setError(error));
  }, [recipe, setError]);
  
  if (!recipe || !firstReviews) {
    return null;
  }

  console.log(recipe);

  return (
    <RecipeContext.Provider value={{
      ...recipe,
      ranking: recipe.recipeRank.value
    }}>
      <RecipeContainer>
        <h1>{recipe.title}</h1>
        <RecipeInfo reviewsRef={reviewsRef} />
        <div style={{ marginTop: '1rem' }}>
          <RecipeCarousel images={recipe.images} />
        </div>
        <RecipeDescription style={{ marginTop: '1rem' }} />
        <RecipeIngredients style={{ marginTop: '1rem' }} />
        <RecipeDirections style={{ marginTop: '1rem' }} />

        <div style={{ marginTop: '5rem', width: collapsed ? '100%' : '80%' }} ref={reviewsRef}>
          <h1>Reviews</h1>
          
          {isLoggedIn ? (
            <ReviewBox
              style={{ marginTop: '1rem' }}
              recipeId={parseInt(id)}
              recipeTitle={recipe.title}
              existingReview={recipe.existingReview} />
          ) : (
            <div style={{
              backgroundColor: theme.colors.backgroundLight,
              padding: '1rem',
              borderRadius: '10px',
              marginTop: '1rem'
            }}>
              <h5>You must be logged in to add a review</h5>
              <PrimaryButton onClick={() => {
                window.location.href = "/login";
              }}>
                Login
              </PrimaryButton>
            </div>
          )}

          <div style={{
              backgroundColor: theme.colors.backgroundLight,
              marginTop: '2rem',
              padding: '1rem',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
              }}>
                {firstReviews.elements.length === 0 ? (
                  <span>No reviews yet</span>
                ) : (
                  <>
                    <ReviewListing reviews={firstReviews.elements} />
                    {firstReviews.totalReviews > 10 && (
                      <PrimaryButton onClick={() => {
                        window.location.href="/recipe/reviews/" + recipe.id;
                      }}>
                        See More Reviews
                      </PrimaryButton>
                    )}
                  </>
                )}
              </div>
        </div>
      </RecipeContainer>
    </RecipeContext.Provider>
  );
}

export default Recipe;