import { useEffect, useRef, useState } from "react";
import useResponsiveValue from "../../hooks/useResponsitveValue";
import axios from "axios";
import { useError } from "../../contexts/ErrorContext";
import { useSearchParams } from "react-router-dom";
import RecipeSearchInput from "./RecipeSearchInput";
import { Container } from "react-bootstrap";
import useCollapsed from "../../hooks/useCollapsed";
import RecipeListItem from "./RecipeListItem";

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

const RecipeListing = () => {
  const [
    recipes,
    page,
    setPage,
    prevPage,
    loading,
    setLoading, 
    delayed,
    setDelayed,
    noMoreRecipes
  ] = useFetchRecipes();

  const loadMoreRef = useRef();

  const collapsed = useCollapsed();

  document.title = "Recipes";

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

  useEffect(() => {
    if (noMoreRecipes) {
      setDelayed(false);
      return;
    }
    if (delayed === null) {
      return;
    }

    const timer = setTimeout(() => {
      setDelayed(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [delayed, setDelayed, noMoreRecipes]);

  if (recipes.length === 0 && !noMoreRecipes) {
    return null;
  }

  return (
    <div style={{ opacity: delayed ? 0 : 1 }}>
      <div style={{
        width: '100%',
        height: '13rem',
        backgroundColor: '#e0e0e0',
        position: 'absolute',
        top: 0,
        left: 0
      }}>
        <Container style={{ marginTop: '7rem' }}>
          <h3>Search for recipe</h3>
          <RecipeSearchInput style={{
            width: collapsed ? '100%' : '50%'
          }} />
        </Container>
      </div>
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
    </div>
  );
};

export default RecipeListing;