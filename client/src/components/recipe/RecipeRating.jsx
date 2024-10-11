import { useCallback, useContext, useRef, useState } from "react";
import InfoSeperationBar from "../InfoSeperationBar";
import StarRating from "./RecipeStarRating";
import RecipeContext from "../../contexts/RecipeContext";
import useWindowResize from "../../hooks/useWindowResize";

const getRankingPostfix = (ranking) => {
  const lastDigit = ranking % 10;
  const lastTwoDigits = ranking % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return "th";
  }

  switch (lastDigit) {
  case 1: return "st";
  case 2: return "nd";
  case 3: return "rd";
  default: return "th";
  }
}

const Rating = ({ reviewsRef }) => {
  
  const context = useContext(RecipeContext);

  // Code for deteching overflow in reviews and removing the element if
  // need be.
  const reviewsTextRef = useRef(null);
  const [isReviewsOverflowing, setReviewsOverflowing] = useState(false);

  const onStarsClicked = useCallback(() => {
    if (!reviewsRef.current) return;

    reviewsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useWindowResize(() => {
    const element = reviewsTextRef.current;
    if (element) {
      setReviewsOverflowing(element.scrollWidth > element.clientWidth);
    }
  });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center'
    }}>
      <StarRating rating={context.rating} onStarsClicked={onStarsClicked}>
        <span ref={reviewsTextRef} style={{
          marginLeft: '0.5rem',
          fontWeight: 'bold',
          fontSize: '0.95rem',
          whiteSpace: 'nowrap',
          width: '8rem',
          // Ask for it to cutoff if it overflows to help detect a difference in
          // scrollWidth and clientWidth
          overflow: 'hidden',
          // Use opacity to hide the element so that it retains its width information
          // and can continue to properly calculate if it should render of not.
          opacity: isReviewsOverflowing ? 0 : 1
        }}>
          {context.rating.toFixed(1)}
          <span style={{
            marginLeft: '0.3rem',
            color: '#7d7d7d',
            fontWeight: 'normal'
          }}>
            ({context.numberReviews} reviews)
          </span>
        </span>
      </StarRating>
      <InfoSeperationBar height={'20px'} margin="1rem" />
      {/* Indication of how popular in comparison it is. */}
      <div style={{ fontSize: '1.1rem' }}>
        <span style={{ fontWeight: 'bold' }}>
          #
        </span>
        <span style={{
          color: 'black'
        }}>
          {context.ranking}
        </span>
        <span style={{
          color: 'gray'
        }}>
          {getRankingPostfix(context.ranking)} rated
        </span>
      </div>
    </div>
  );
}

export default Rating;