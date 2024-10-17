import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from "react";
import theme from "../../theme";

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

const StarRating = ({ rating, children, style, onStarsClicked, showCursor=true, changeOnHover=false }) => {

  const [hoverRating, setHoverRating] = useState(rating);
  const [selectedRating, setSelectedRating] = useState(rating);

  // Handle specific case of prop changing rather than just mounting.
  useEffect(() => {
    setHoverRating(rating);
    setSelectedRating(rating);
  }, [rating]);

  const fullStars = Math.floor(hoverRating);
  const hasHalf = (hoverRating - fullStars) >= 0.5;
  const starsRef = useRef();

  const handleMouseMove = (e) => {
    if (!changeOnHover) return;
    if (!starsRef.current) return;

    const rect = starsRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const starWidth = width / 5; // 5 stars
    const newRating = Math.min(5, Math.max(0, Math.round((offsetX / starWidth) * 2) / 2));
    setHoverRating(newRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(selectedRating); // Reset to the original rating on mouse leave
  };

  const onClick = () => {
    setSelectedRating(hoverRating);
    if (onStarsClicked) {
      onStarsClicked(hoverRating);
    }
  };

  const stars = Array.from({ length: 5 }, (_, i) => {
    switch (true) {
    case i < fullStars:              return StarState.FULL;
    case i === fullStars && hasHalf: return StarState.HALF;
    default:                         return StarState.EMPTY;
    }
  });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      width: 'fit-items',
      ...(style ? style : {})
    }}>
      <div className={showCursor ? "star-rating-stars" : ""} style={{
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        userSelect: 'none'
      }}
      ref={starsRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}>
        {stars.map((state, index) => (
          <Star state={state} key={index} />  
        ))}
      </div>

      {children}
        
      {showCursor && (
        <style>
          {`
            .star-rating-stars {
              cursor: pointer;
            }
          `}
        </style>
      )}
    </div>
  );
}

StarRating.propTypes = {
  style: PropTypes.object,
  rating: PropTypes.number.isRequired,
  changeOnHover: PropTypes.bool,
  showCursor: PropTypes.bool,
  onClick: PropTypes.func
};

export default StarRating;