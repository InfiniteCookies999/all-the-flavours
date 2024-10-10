import RecipeCarousel from "./RecipeCarousel";
import styled from "styled-components";
import RecipeInfo from "./RecipeInfo";
import RecipeDescription from "./RecipeDescription";
import RecipeIngredients from "./RecipeIngredients";
import RecipeContext from "../../contexts/RecipeContext";
import RecipeDirections from "./RecipeDirections";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useError } from "../../contexts/ErrorContext";
import ReviewBox from "../review/ReviewBox";
import useCollapsed from "../../hooks/useCollapsed";

const RecipeContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 80%; 
  }
`;

const Recipe = () => {

  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  const { setError } = useError();

  const collapsed = useCollapsed();

  document.title = "Recipe";
  
  useEffect(() => {
    axios.get(`/api/recipes/${id}`)
      .then(response => setRecipe(response.data))
      .catch(error => setError(error));
  }, [id, setError]);
  
  if (!recipe) {
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
        <RecipeInfo />
        <div style={{ marginTop: '1rem' }}>
          <RecipeCarousel images={recipe.images} />
        </div>
        <RecipeDescription style={{ marginTop: '1rem' }} />
        <RecipeIngredients style={{ marginTop: '1rem' }} />
        <RecipeDirections style={{ marginTop: '1rem' }} />

        <div style={{ marginTop: '5rem' }}>
          <h1>Reviews</h1>
          <ReviewBox style={{
            width: collapsed ? '100%' : '80%',
            marginTop: '1rem'
            }} recipeTitle={recipe.title} />
        </div>
      </RecipeContainer>
    </RecipeContext.Provider>
  );
}

export default Recipe;