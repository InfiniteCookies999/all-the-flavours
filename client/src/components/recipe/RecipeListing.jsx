import { useEffect, useRef, useState } from "react";
import theme from "../../theme";
import StarRating from "./RecipeStarRating";
import useResponsiveValue from "../../hooks/useResponsitveValue";
import axios from "axios";
import { useError } from "../../contexts/ErrorContext";
import { Container, Form } from "react-bootstrap";
import useCollapsed from "../../hooks/useCollapsed";

const RecipeSearchInput = () => {
  
  const collapsed = useCollapsed();
  
  return (
    <div style={{
      width: '100%',
      height: '12rem',
      backgroundColor: '#e0e0e0',
      position: 'absolute',
      top: 0,
      left: 0
    }}>
      <Container style={{ marginTop: '8rem' }}>
        <div className="position-relative">
          <Form.Control type="text" style={{
              width: collapsed ? '95%' : '48%',
              border: '1px solid gray'
            }}
            className="search-input"
            placeholder="search">
          </Form.Control>
          <div style={{
            position: 'absolute',
            top: 0,
            left: collapsed ? 'calc(100% - 2rem)' : 'calc(50% - 2rem)',
            borderTopRightRadius: '5px',
            borderBottomRightRadius: '5px',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            backgroundColor: theme.colors.primary,
            borderRight: '1px solid gray',
            borderTop: '1px solid gray',
            borderBottom: '1px solid gray',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#424242'
          }}
          className="search-btn">
            <i className="fas fa-magnifying-glass"></i>
          </div>
        </div>
      </Container>
      <style>
        {`
          .search-input {
            outline: none;
            box-shadow: none !important;
          }

          .search-input:focus {
            box-shadow: 0 0 2px gray !important;
          }

          .search-btn:hover {
            cursor: pointer;
            background-color: ${theme.colors.primaryDark} !important;
            color: black !important;
          }
        `}
      </style>
    </div>
  );
};

function useFetchRecipes() {
  const [prevPage, setPrevPage] = useState(-1);
  const [page, setPage] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delayed, setDelayed] = useState(null);

  const { setError } = useError();

  useEffect(() => {
    if (prevPage === page) {
      return;
    }

    const controller = new AbortController();

    axios.get(`/api/recipes?page=${page}`, {
      signal: controller.signal
    })
    .then(response => {
      const recipes = response.data;
      setRecipes(prevRecipes => [...prevRecipes, ...recipes]);
      setDelayed(prevDelayed => prevDelayed === null);
      setPrevPage(page);
      setLoading(false);
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
  }, [page, prevPage, setError]);

  return [recipes, page, setPage, prevPage, loading, setLoading, delayed, setDelayed];
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
    setDelayed
  ] = useFetchRecipes();

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

  useEffect(() => {
    if (delayed === null) {
      return;
    }

    const timer = setTimeout(() => {
      setDelayed(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [delayed, setDelayed]);

  if (recipes.length === 0) {
    return;
  }

  return (
    <div style={{ opacity: delayed ? 0 : 1 }}>
      <RecipeSearchInput />
      <div className="row g-3" style={{ marginTop: '12rem' }}>
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
    </div>
  )
};

export default RecipeListing;