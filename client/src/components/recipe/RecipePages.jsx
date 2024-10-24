import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeListItem from "./RecipeListItem";
import useResponsiveValue from "../../hooks/useResponsitveValue";

function useFetchRecipes() {

  const [searchParams] = useSearchParams();

  const [prevPage, setPrevPage] = useState(-1);
  const [page, setPage] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delayed, setDelayed] = useState(null);
  const [noMoreRecipes, setNoMoreRecipes] = useState(false);

  const { setError } = useError();

  useEffect(() => {
    if (prevPage === page) {
      return;
    }
    if (noMoreRecipes) {
      return;
    }

    const controller = new AbortController();

    const searchTerm = searchParams.get("search") || "";
    axios.get(`/api/recipes?page=${page}&search=${searchTerm}`, {
      signal: controller.signal
    })
    .then(response => {
      const recipes = response.data;
      setRecipes(prevRecipes => [...prevRecipes, ...recipes]);
      setDelayed(prevDelayed => prevDelayed === null);
      setPrevPage(page);
      setLoading(false);
      if (recipes.length === 0) {
        setNoMoreRecipes(true);
      }
    })
    .catch((error) => {
      if (error.name !== "AbortError" && error.name !== "CanceledError") {
        setError(error);
      }
      setLoading(false);
    });

    return () => {
      controller.abort();
    };
  }, [page, prevPage, setError, searchParams, setNoMoreRecipes, noMoreRecipes]);

  return [
    recipes,
    page, 
    setPage, 
    prevPage, 
    loading, 
    setLoading, 
    delayed, 
    setDelayed, 
    noMoreRecipes, 
    setNoMoreRecipes
  ];
}

const RecipePages = ({ rowCountBreakpointValues }) => {
  
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

  const recipeRowCount = useResponsiveValue(rowCountBreakpointValues);
  const colClass = recipeRowCount === 3 ? "col-4" : "col-6";

  return (
    <>
      {recipes.length !== 0 ? (
        <div className="row g-3" style={{ marginTop: '14rem' }}>
          {recipes.map((recipe, index) => (
            <RecipeListItem
              key={recipe.id}
              recipe={recipe}
              index={index}
              numberOfRecipes={recipes.length}
              colClass={colClass}
              loadMoreRef={loadMoreRef} />
          ))}
        </div> 
      ) : (
        <div style={{ marginTop: '14rem', textAlign: 'center' }}>
          <h2>No recipe found.</h2>
          <span>Please try a different search</span>
        </div>
      )}
    </>
  );
};

export default RecipePages;