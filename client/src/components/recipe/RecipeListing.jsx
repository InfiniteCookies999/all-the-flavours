import { useEffect, useRef, useState } from "react";
import useResponsiveValue from "../../hooks/useResponsitveValue";
import axios from "axios";
import { useError } from "../../contexts/ErrorContext";
import { useSearchParams } from "react-router-dom";
import RecipeSearchInput from "./RecipeSearchInput";
import { Button, Container, Dropdown, DropdownMenu, DropdownToggle, Form } from "react-bootstrap";
import useCollapsed from "../../hooks/useCollapsed";
import RecipeListItem from "./RecipeListItem";
import theme from "../../theme";

function useFetchRecipes() {

  const [searchParams] = useSearchParams();

  const [prevPage, setPrevPage] = useState(-1);
  const [page, setPage] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delayed, setDelayed] = useState(null);
  const [noMoreRecipes, setNoMoreRecipes] = useState(false);

  const searchIngredientFilter = searchParams.getAll("ingredients");
  const [ingredientFilters] = useState(searchIngredientFilter || []);
  const [newIngredient, setNewIngredient] = useState('');

  const { setError } = useError();

  useEffect(() => {
    document.title = "Recipes";
  }, []);

  useEffect(() => {
    if (prevPage === page) {
      return;
    }
    if (noMoreRecipes) {
      return;
    }

    const controller = new AbortController();

    const searchTerm = searchParams.get("search") || "";
    let url = `/api/recipes?page=${page}`;
    if (searchTerm) {
      url += "&search=" + searchTerm;
    }

    for (const filter of ingredientFilters) {
      url = url + "&ingredients=" + filter;
    }

    axios.get(url, {
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
  }, [page, prevPage, setError, searchParams, setNoMoreRecipes, noMoreRecipes, ingredientFilters]);

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
    ingredientFilters,
    newIngredient,
    setNewIngredient
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
    noMoreRecipes,
    ingredientFilters,
    newIngredient,
    setNewIngredient
  ] = useFetchRecipes();

  const loadMoreRef = useRef();

  const collapsed = useCollapsed();

  const [searchParams] = useSearchParams();

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

  const changeUrl = (filters) => {
    let url = "/recipes?";

    const searchTerm = searchParams.get("search");
    if (searchTerm) {
      url = url + "search=" + searchTerm;
    } else if (filters.length !== 0) {
      url = url + "ingredients=" + filters[0];
      filters = filters.slice(1);
    }
    
    for (const existingFilter of filters) {
      url += "&ingredients=" + existingFilter;
    }

    window.location.href = url;
  };

  const handleIngredientFilterAdd = () => {
    const filter = newIngredient.trim();
    if (filter && !ingredientFilters.includes(filter)) {
      const filters = [...ingredientFilters, filter];
      changeUrl(filters);
    }
  };

  const handleIngredientFilterRemove = (filter) => {
    const filters = ingredientFilters.filter(i => i !== filter);
    changeUrl(filters);
  };

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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <RecipeSearchInput style={{
              width: collapsed ? '100%' : '50%',
              marginRight: '1.5rem'
            }} />
            <Dropdown>
              <DropdownToggle
                className="ingredient-dropdown"
                style={{
                  backgroundColor: theme.colors.secondary,
                  borderColor: theme.colors.secondary
                }}>
                {collapsed ? 
                  <>Filter</> :
                  <>Add ingredient filter</>
                  }
              </DropdownToggle>
              <DropdownMenu style={{
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem'
              }}>
                <h6 style={{ fontSize: '1.2rem' }}>Add ingredient</h6>
                <Form.Control
                  type="text"
                  className="ingredient-search-input"
                  placeholder="butter"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}>
                </Form.Control>
                <Button
                  className="btn-dark"
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.2rem',
                  }}
                  onClick={handleIngredientFilterAdd}>
                  Add
                </Button>

                <div style={{ marginTop: '1rem' }}>
                  {ingredientFilters.map((filter, index) => (
                    <div key={index} style={{ 
                      backgroundColor: '#ddd',
                      marginTop: '0.2rem',
                      padding: '0.2rem',
                      borderRadius: '8px'
                      }}>
                      <span style={{
                        marginLeft: '0.3rem',
                        borderRadius: '5px',
                        paddingLeft: '0.2rem',
                        paddingRight: '0.2rem',
                        color: '#d42424',
                        backgroundColor: '#1f1f1f'
                      }}
                      className="ingredient-remove-btn"
                      onClick={() => handleIngredientFilterRemove(filter)}>
                        X 
                      </span>
                      <span style={{ marginLeft: '0.5rem' }}>{filter}</span>
                    </div>
                  ))}
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
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
      <style>
        {`
          .ingredient-dropdown:hover {
            background-color: #000 !important;
            border-color: #000 !important;
          }

          .ingredient-search-input:focus {
            outline: none;
            box-shadow: none;
            border: 1px solid ${theme.colors.primaryDark};
          }

          .ingredient-remove-btn:hover {
            cursor: pointer;
            background-color: black !important;
            color: red !important;
          }
        `}
      </style>
    </div>
  );
};

export default RecipeListing;