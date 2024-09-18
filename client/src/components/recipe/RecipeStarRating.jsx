import { useContext } from "react";
import RecipeContext from "../../contexts/RecipeContext";
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

  return (<div style={{
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
  </div>);
}

const StarRating = () => {
  const context = useContext(RecipeContext);

  const fullStars = Math.floor(context.rating);
  const hasHalf = (context.rating - Math.floor(context.rating)) >= 0.5;

  const stars = Array.from({ length: 5 }, (_, i) => {
    switch (true) {
    case i < fullStars:              return StarState.FULL;
    case i === fullStars && hasHalf: return StarState.HALF;
    default:                         return StarState.EMPTY;
    }
  });

  return (
    <div href="/" style={{
      display: 'flex', alignItems: 'center'
    }}>
      <div className="star-rating-stars" style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        {stars.map((state, index) => (
          <Star state={state} key={index} />  
        ))}
      </div>
      <span style={{
        marginLeft: '0.5rem',
        fontWeight: 'bold',
        fontSize: '0.95rem'
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

export default StarRating;