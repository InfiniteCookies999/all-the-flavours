import { useEffect, useState } from "react";
import axios from "axios";
import { useError } from "../contexts/ErrorContext";
import RecipeListItem from "./recipe/RecipeListItem";
import useResponsiveValue from "../hooks/useResponsitveValue";

const RecipeShowcase = ({ title, recipes, colClass, style }) => {
  return (
    <div style={{
      background: '#ddd',
      padding: '1rem',
      borderRadius: '10px',
      ...style
    }}>
      <h2>{title}</h2>
      <div className="row g-3 mt-2">
        {recipes.map((recipe, index) => (
          <RecipeListItem
            key={recipe.id}
            recipe={recipe}
            index={index}
            numberOfRecipes={recipes.length}
            colClass={colClass} />
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {

  const [popularRecipes, setPopularRecipes] = useState(null);
  const [latestRecipes, setLatestRecipes] = useState(null);

  const { setError } = useError();

  document.title = "Home";

  useEffect(() => {
  
    axios.get("/api/recipes/popular")
      .then(response => setPopularRecipes(response.data))
      .catch(error => setError(error));
  
    axios.get("/api/recipes/latest")
      .then(response => setLatestRecipes(response.data))
      .catch(error => setError(error));

  }, [setError]);

  const colClassBreakpoints = {
    small: 'col-6',
    medium: 'col-6',
    large: 'col-4',
    other: 'col-3'
  };
  
  const colClass = useResponsiveValue(colClassBreakpoints);

  if (!popularRecipes || !latestRecipes) {
    return null;
  }

  return (
    <>
      <RecipeShowcase
        title={"Popular recipes!"}
        recipes={popularRecipes}
        colClass={colClass}
        />
      <RecipeShowcase
        style={{ marginTop: '2rem' }}
        title={"Latest recipes!"}
        recipes={latestRecipes}
        colClass={colClass}
        />
    </>
  );
};

export default HomePage;