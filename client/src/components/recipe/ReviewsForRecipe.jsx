import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useError } from "../../contexts/ErrorContext";
import ReviewListing from "../review/ReviewListing";
import theme from "../../theme";

const ReviewsForRecipe = () => {

  const { id } = useParams();
  
  const [reviews, setReviews] = useState([]);
  const [prevPage, setPrevPage] = useState(-1);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [noMoreReviews, setNoMoreReviews] = useState(false);

  const loadMoreRef = useRef();

  const { setError } = useError();

  useEffect(() => {
    document.title = "Reviews";
  }, []);

  useEffect(() => {
    if (!id) return;
    if (prevPage === page) {
      return;
    }
    if (noMoreReviews) {
      return;
    }

    const controller = new AbortController();

    axios.get(`/api/reviews?recipeId=${id}&page=${page}`, {
      signal: controller.signal
    })
      .then(response => {
        const reviews = response.data.elements;
        setPrevPage(page);
        setReviews(prevReviews => [...prevReviews, ...reviews]);
        setLoading(false);
        if (reviews.length === 0) {
          setNoMoreReviews(true);
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
  }, [page, id, prevPage, setError, noMoreReviews]);

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
  }, [prevPage, loading]);
  
  if (reviews.length === 0) {
    return null;
  }
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <a href={"/recipe/" + id} className="back-to-recipe" style={{
        textDecoration: 'none',
        color: 'black',
        width: 'fit-content',
        display: 'flex',
        alignItems: 'center'
        }}>
        <div style={{
          display: 'inline',
          backgroundColor: theme.colors.secondary,
          color: 'white',
          borderRadius: '50%',
          width: '1.6rem',
          height: '1.6rem',
          marginRight: '0.5rem'
        }}>
          <span className="material-icons" style={{
            transform: 'translateY(0.1rem)'
          }}>arrow_back</span>
        </div>

        <span style={{ fontSize: '1.4rem' }}>
          Back to recipe
        </span>
      </a>
      <style>
        {`
          .back-to-recipe:hover {
            color: #545454 !important;
          }
          
          .back-to-recipe:hover div {
            background-color: #545454 !important;
          }
        `}
      </style>
      
      <ReviewListing reviews={reviews} loadMoreRef={loadMoreRef} />
    </div>
  );
}

export default ReviewsForRecipe;