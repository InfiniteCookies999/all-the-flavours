import RecipeCarousel from "./RecipeCarousel";
import styled from "styled-components";
import RecipeInfo from "./RecipeInfo";
import RecipeDescription from "./RecipeDescription";
import RecipeIngredients from "./RecipeIngredients";
import RecipeContext from "../../contexts/RecipeContext";
import RecipeDirections from "./RecipeDirections";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const RecipeContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 80%; 
  }
`;

const Recipe = () => {

  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  // TODO: Deal with no recipe being found!

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then(response => response.json())
      .then(recipe => {
        setRecipe(recipe);
      });
  }, [id, recipe]);
  
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <RecipeContext.Provider value={{
      title: recipe.title,
      description: recipe.description,
      rating: 3.63,
      numberReviews: 20,
      ranking: 201,
      lastUpdated: recipe.lastUpdated,
      images: recipe.recipeImages,
      ingredients: recipe.ingredients,
      directions: recipe.directions
    }} >
      <RecipeContainer>
        <h1>{recipe.title}</h1>
        <RecipeInfo />
        <div style={{ marginTop: '1rem' }}>
          <RecipeCarousel />
        </div>
        <RecipeDescription style={{ marginTop: '1rem' }} />
        <RecipeIngredients style={{ marginTop: '1rem' }} />
        <RecipeDirections style={{ marginTop: '1rem' }} />
      </RecipeContainer>
    </RecipeContext.Provider>
  );
}

export default Recipe;