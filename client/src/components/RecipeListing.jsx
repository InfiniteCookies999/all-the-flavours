import { useEffect, useRef, useState } from "react";
import theme from "../theme";
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

  // Code to detect intersection with last element and so that
  // more recipes can be loaded.
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

  // Rendering two or three columns depending on page size.
  const rowCountBreakpointValues = {
    small: 2,
    medium: 2,
    other: 3,
  };
  
  const recipeRowCount = useResponsiveValue(rowCountBreakpointValues);
  const colClass = recipeRowCount === 3 ? "col-4" : "col-6";

  // Scroll to top so they always start top of page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (recipes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="row g-3">
      {recipes.map((recipe, index) => (
        <a key={recipe.id} className={colClass}
           ref={index === recipes.length - 1 ? loadMoreRef : null}
           href={`/recipe/${recipe.id}`}
           style={{
            color: 'black',
            textDecoration: 'none',
           }}
        >
          <div className="d-flex flex-column h-100 recipe-link" style={{
            border: '1px solid gray',
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: theme.colors.backgroundLight,
            borderRadius: '5px',
            // Flex control so all the columns are the same height.
            flexGrow: 1
          }}
          to={`/recipe/${recipe.id}`}>
            <img src={recipe.images[0]}
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
          </div>
        </a>
      ))}
    <style>
      {`
        .recipe-link:hover {
          box-shadow: 0 4px 10px rgba(0.5, 0.5, 0.5, 0.2);
          filter: brightness(0.95);
          cursor: pointer;
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