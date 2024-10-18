import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useError } from "../contexts/ErrorContext";
import RecipeListItem from "./recipe/RecipeListItem";
import useResponsiveValue from "../hooks/useResponsitveValue";
import PrimaryButton from "./PrimaryButton";
import { AuthContext } from "../contexts/AuthContext";

const LargeButton = ({ children, location, style }) => {
  return (
    <PrimaryButton style={{
      marginTop: '1rem',
      fontSize: '1.5rem',
      ...style
    }}
    onClick={() => {
      window.location.href = location;
    }}>
      {children}
    </PrimaryButton>
  );
};

const RecipeShowcase = ({ title, recipes, colClass, style }) => {
  return (
    <div style={style}>
      <h2>{title}</h2>
      <hr/>
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
      <LargeButton location={"/recipes"}>
        Find More Recipes!
      </LargeButton>
    </div>
  );
};

const HomePage = () => {

  const [popularRecipes, setPopularRecipes] = useState(null);
  const [latestRecipes, setLatestRecipes] = useState(null);

  const { setError } = useError();

  const { isLoggedIn } = useContext(AuthContext);

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
    <div style={{ padding: '1rem' }}>
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
      
      <div style={{
        marginTop: '3rem'
      }}>
        <h3>Want to contribute?</h3>
        <hr/>
        {isLoggedIn ? (
          <>
            <span style={{ fontSize: '1.2rem', color: 'gray' }}>Create your own recipe and so it can be shared with others!</span>
            <br/>
            <LargeButton location={"/create-recipe"}>
              Create Recipe!
            </LargeButton>
          </>
        ) : (
          <>
            <span style={{ fontSize: '1.2rem', color: 'gray' }}>You can add your own recipe if you login or sign up!</span>
            <br/>
            <LargeButton location={"/login"}>
              Login
            </LargeButton>
            <LargeButton location={"/sign-up"} style={{
              marginLeft: '1rem'
            }}>
              Sign up
            </LargeButton>
          </>
        )}
      </div>
    
    </div>
  );
};

export default HomePage;