import { useEffect, useRef, useState } from "react";
import theme from "../theme";
import { Link } from "react-router-dom";
import StarRating from "./recipe/RecipeStarRating";
import useResponsiveValue from "../hooks/useResponsitveValue";

function useFetchRecipes() {
  const [prevPage, setPrevPage] = useState(-1);
  const [page, setPage] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (prevPage === page) {
      return;
    }

    const controller = new AbortController();

    fetch(`/api/recipes?page=${page}`, {
      signal: controller.signal
    }).then(response => response.json())
    .then(recipes => {
      setRecipes(prevRecipes => [...prevRecipes, ...recipes]);
      setPrevPage(page);
      setLoading(false);
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        console.log(error);
      }
      setLoading(false);
    });

    return () => {
      controller.abort();
    };
  }, [page, prevPage]);

  return [recipes, page, setPage, prevPage, loading, setLoading];
}

const RecipeListing = () => {
  const [recipes, page, setPage, prevPage, loading, setLoading] = useFetchRecipes();

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        setPage(prevPage => prevPage + 1);
        setLoading(true);
      }
    });

    // Store in a variable to retain state for cleanup.
    const currentRef = loadMoreRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [recipes.length, page, prevPage, setPage, loading, setLoading]);

  const rowCountBreakpointValues = {
    small: 2,
    medium: 2,
    other: 3,
  };
  
  const recipeRowCount = useResponsiveValue(rowCountBreakpointValues);
  const colClass = recipeRowCount === 3 ? "col-4" : "col-6";

  if (recipes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="row g-3">
      {recipes.map((recipe, index) => (
        <div key={recipe.id} className={colClass}
          ref={index === recipes.length - 1 ? loadMoreRef : null}
        >
          <Link className="d-flex flex-column h-100 recipe-link" style={{
            border: '1px solid gray',
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: theme.colors.backgroundLight,
            borderRadius: '5px',
            // Remove default link styling.
            textDecoration: 'none',
            color: 'inherit',
            // Flex control so all the columns are the same height.
            flexGrow: 1
          }}
          to={`/recipe/${recipe.id}`}>
            <img src={`${'/images/' + recipe.recipeImages[0]}`}
                alt={`Alt ${recipe.id}`}
                className="d-block w-100"
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                }}>
            </img>
            {/* This part can have varied height so need to use flex-grow-1 */}
            <div className="flex-grow-1" style={{ 
              marginTop: '1rem',
              height: 'fit-content',
              marginBottom: '0rem',
              }}>
              <h3 className="recipe-title">{recipe.title}</h3>
              <StarRating rating={4.5} numberReviews={20} style={{
                overflow: 'hidden'
              }} />
            </div>
          </Link>
        </div>
      ))}
    <style>
      {`
        .recipe-link:hover {
          color: red;
          box-shadow: 0 4px 10px rgba(0.5, 0.5, 0.5, 0.2);
          filter: brightness(0.95);
        }

        .recipe-link:hover .recipe-title {
          text-decoration: underline !important;
        }
      `}
    </style>
    </div>
    );
};

export default RecipeListing;