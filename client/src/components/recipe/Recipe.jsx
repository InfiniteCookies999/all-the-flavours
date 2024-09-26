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
    axios.get(`/api/recipes/${id}`)
      .then(response => setRecipe(response.data))
      .catch(error => console.log(error));
  }, [id]);
  
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <RecipeContext.Provider value={{
      ...recipe,
      rating: 3.63,
      numberReviews: 20,
      ranking: 201
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