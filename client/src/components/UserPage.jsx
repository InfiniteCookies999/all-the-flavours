import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useError } from "../contexts/ErrorContext";
import UserAvatar from "./UserAvatar";
import theme from "../theme";
import RecipeListItem from "./recipe/RecipeListItem";
import useResponsiveValue from "../hooks/useResponsitveValue";

const UserPage = () => {

  const { username } = useParams();

  const [user, setUser] = useState(null);

  const [prevPage, setPrevPage] = useState(-1);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [noMoreRecipes, setNoMoreRecipes] = useState(false);

  const loadMoreRef = useRef();

  const { setError } = useError();
  
  useEffect(() => {
    document.title = "User Page";
  }, []);

  useEffect(() => {
    if (!username) {
      return;
    }

    axios.get(`/api/users/by-username/${username}`)
      .then(response => setUser(response.data))
      .catch(error => setError(error));
  }, [ username, setError ]);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (prevPage === page) {
      return;
    }
    if (noMoreRecipes) {
      return;
    }

    const controller = new AbortController();

    axios.get(`/api/recipes/by-user?userId=${user.id}&page=${page}`, {
      signal: controller.signal
    })
      .then(response => {
        const recipes = response.data;
        setPrevPage(page);
        if (recipes.length === 0) {
          setNoMoreRecipes(true);
        } else {
          setRecipes(prevRecipes => [ ...prevRecipes, ...recipes ]);
        }
        setLoading(false);
      })
      .catch(error => {
        if (error.name !== "AbortError" && error.name !== "CanceledError") {
          setError(error);
        }
        setLoading(false);
      });

      return () => {
        controller.abort();
      };
  }, [ user, setError, loading, noMoreRecipes, page, setPage, prevPage ]);

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

  const colClassBreakpoints = {
    small: 'col-6',
    medium: 'col-6',
    large: 'col-4',
    other: 'col-3'
  };
  
  const colClass = useResponsiveValue(colClassBreakpoints);

  if (!user) {
    return null;
  }

  if (recipes.length === 0 && !noMoreRecipes) {
    return null;
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ textAlign: 'center', width: 'fit-content' }}>
          <div style={{ marginTop: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
            <div style={{
              borderRadius: '50%',
              width: '12.5rem',
              height: '12.5rem',
              backgroundColor: theme.colors.primaryLight,
              margin: 0,
              padding: 0
            }}>
              <UserAvatar 
                src={user.avatarSrc} 
                style={{
                  width: '12rem',
                  height: '12rem'
                }}
                className="user-avatar">
              </UserAvatar>
            </div>
          </div>
          <h4 style={{ margin: 0 }}>{user.firstName} {user.lastName}</h4>
          <span style={{ color: 'gray' }}>@{user.username}</span>
        </div>

        <div style={{ marginLeft: '2rem', padding: '1rem' }}>
          <h3 style={{ marginTop: '1rem' }}>Biography</h3>
          <p style={{ color: 'gray' }}>{user.bio || 'No biography at this time'}</p>
        </div>
      </div>
      
      <div style={{ marginTop: '3rem' }}>
        <h2>Recipes by {user.firstName} {user.lastName}</h2>
        <div className="row g-3 mt-2">
          {recipes.length !== 0 ? (
            recipes.map((recipe, index) => (
              <RecipeListItem
                key={recipe.id}
                recipe={recipe}
                index={index}
                numberOfRecipes={recipes.length}
                colClass={colClass}
                loadMoreRef={loadMoreRef} />
            ))
          ) : (
            <span style={{ color: 'gray' }}>No recipes found</span>
          )}
        </div>
      </div>

      <style>
        {`
          .user-avatar {
            position: relative;
            top: 50% !important;
            transform: translateY(-50%);
          }
        `}
      </style>
    </div>
  );
};

export default UserPage;