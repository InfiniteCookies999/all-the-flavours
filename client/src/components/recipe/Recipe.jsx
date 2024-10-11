import RecipeCarousel from "./RecipeCarousel";
import styled from "styled-components";
import RecipeInfo from "./RecipeInfo";
import RecipeDescription from "./RecipeDescription";
import RecipeIngredients from "./RecipeIngredients";
import RecipeContext from "../../contexts/RecipeContext";
import RecipeDirections from "./RecipeDirections";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useError } from "../../contexts/ErrorContext";
import ReviewBox from "../review/ReviewBox";
import useCollapsed from "../../hooks/useCollapsed";
import theme from "../../theme";
import StarRating from "./RecipeStarRating";
import UserAvatar from "../UserAvatar";

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
    return <div>Loading...</div>;
  }

  return (
    <RecipeContext.Provider value={{
      ...recipe,
      rating: 3.63,
      numberReviews: 20,
      ranking: 201
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
          <ReviewBox style={{ marginTop: '1rem' }} recipeTitle={recipe.title} />
          {firstReviews.elements.length === 0 ? (
            <span>No reviews yet</span>
          ) : (
            <div style={{
              backgroundColor: theme.colors.backgroundLight,
              marginTop: '2rem',
              padding: '1rem',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
              }}>
              {firstReviews.elements.map(review => (
                <div style={{
                  backgroundColor: 'white',
                  padding: '0.5rem',
                  boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)'
                }}>
                  <StarRating rating={review.rating / 2} showCursor={false} />
                  <a href={`/user/${review.reviewer.id}`} style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    width: 'fit-content'
                    }}>
                    <UserAvatar src="/example-profile.jpg" style={{
                      width: '1.5rem',
                      height: '1.5rem'
                      }} />
                    <span style={{ color: 'gray' }}>
                      by {review.reviewer.firstName} {review.reviewer.lastName}
                    </span>
                  </a>
                  <p className="mt-2">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </RecipeContainer>
    </RecipeContext.Provider>
  );
}

export default Recipe;