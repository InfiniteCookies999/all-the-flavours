import PropTypes from 'prop-types';
import { useRef, useState } from "react";
import theme from "../../theme";
import useWindowResize from "../../hooks/useWindowResize";

const StarState = Object.freeze({
  EMPTY: 0,
  HALF: 1,
  FULL: 2
});

const Star = ({ state }) => {
  const grayColor = '#cccccc';
  const brightColor = theme.colors.primary;

  const commonStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '24px',
    height: '24px'
  };

  return (
    <div style={{
      position: 'relative',
      display: 'inline-block',
      width: '24px',
      height: '24px'
    }}>
      {state === StarState.EMPTY && (
        <span className="material-icons" style={{
          color: grayColor,
          ...commonStyle
        }}>star</span>
      )}
      {state === StarState.HALF && (
        <>
          <span className="material-icons" style={{
            color: grayColor,
            position: 'absolute',
            clipPath: 'inset(0 0 0 40%)',
            ...commonStyle
          }}>
            star
          </span>
          <span className="material-icons" style={{
            color: brightColor,
            position: 'absolute',
            clipPath: 'inset(0 50% 0 0)', // Clip half of the star
            ...commonStyle
          }}>star</span>
        </>
      )}
      {state === StarState.FULL && (
        <span className="material-icons" style={{
          color: brightColor,
          ...commonStyle
        }}>star</span>
      )}
    </div>
  );
}

const StarRating = ({ rating, numberReviews, style }) => {

  const fullStars = Math.floor(rating);
  const hasHalf = (rating - Math.floor(rating)) >= 0.5;

  const stars = Array.from({ length: 5 }, (_, i) => {
    switch (true) {
    case i < fullStars:              return StarState.FULL;
    case i === fullStars && hasHalf: return StarState.HALF;
    default:                         return StarState.EMPTY;
    }
  });

  // Code for deteching overflow in reviews and removing the element if
  // need be.
  const reviewsTextRef = useRef(null);
  const [isReviewsOverflowing, setReviewsOverflowing] = useState(false);

  useWindowResize(() => {
    const element = reviewsTextRef.current;
    if (element) {
      setReviewsOverflowing(element.scrollWidth > element.clientWidth);
    }
  });

  return (
    <div href="/" style={{
      display: 'flex',
      alignItems: 'center',
      ...(style ? style : {})
    }}>
      <div className="star-rating-stars" style={{
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0
      }}>
        {stars.map((state, index) => (
          <Star state={state} key={index} />  
        ))}
      </div>
      
      <span ref={reviewsTextRef} style={{
        marginLeft: '0.5rem',
        fontWeight: 'bold',
        fontSize: '0.95rem',
        whiteSpace: 'nowrap',
        width: '10rem',
        // Ask for it to cutoff if it overflows to help detect a difference in
        // scrollWidth and clientWidth
        overflow: 'hidden',
        // Use opacity to hide the element so that it retains its width information
        // and can continue to properly calculate if it should render of not.
        opacity: isReviewsOverflowing ? 0 : 1
      }}>
        {rating.toFixed(1)}
        <span style={{
          marginLeft: '0.3rem',
          color: '#7d7d7d',
          fontWeight: 'normal'
        }}>
          ({numberReviews} reviews)
        </span>
      </span>
    
      <style>
        {`
          .star-rating-stars {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  )
}

StarRating.propTypes = {
  style: PropTypes.object,
  rating: PropTypes.number.isRequired,
  numberReviews: PropTypes.number.isRequired
};

export default StarRating;