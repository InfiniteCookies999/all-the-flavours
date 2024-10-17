import PropTypes from 'prop-types';
import { Form } from "react-bootstrap";
import theme from "../../theme";
import StarRating from "../recipe/RecipeStarRating";
import { useState } from "react";
import PrimaryButton from "../PrimaryButton";
import { useError } from '../../contexts/ErrorContext';
import axios from 'axios';

const ReviewBox = ({ recipeId, style, recipeTitle, existingReview }) => {

  const [hasReviewed, setHasReviewed] = useState(existingReview != null);

  const [text, setText] = useState(existingReview != null ? existingReview.text : '');
  const [hasClickedStar, setHasClickedStar] = useState(hasReviewed);
  const [rating, setRating] = useState(existingReview != null ? existingReview.rating / 2 : 0);

  const [textValid, setTextValid] = useState(true);
  const [starsValid, setStarsValid] = useState(true);

  const [textError, setTextError] = useState('');
  const [starsError, setStarsError] = useState('');

  const { setError } = useError();

  const [loading, setLoading] = useState(false);

  const updateTextError = () => {
    if (text.length === 0) {
      setTextError("empty");
      return false;
    }
    if (text.length < 4) {
      setTextError("too short");
      return false;
    }
    return true;
  };

  const updateStarsError = () => {
    if (!hasClickedStar) {
      setStarsError("must select a rating");
      return false;
    }
    return true;
  };

  const updateErrors = () => {
    
    const textValid = updateTextError();
    const starsValid = updateStarsError();

    setTextValid(textValid);
    setStarsValid(starsValid);

    return !(textValid);
  };

  const onSubmit = () => {
    if (loading) return;
    
    if (updateErrors()) {
      return;
    }

    setLoading(true);

    const method = hasReviewed ? axios.put : axios.post;

    method("/api/reviews", {
      text,
      rating: Math.floor(rating * 2),
      recipe: { id: recipeId }
    })
      .then(() => {
        setHasReviewed(true);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const onStarClicked = (rating) => {
    setHasClickedStar(true);
    setStarsValid(true);
    setRating(rating);
  };

  return (
    <div style={{
      backgroundColor: theme.colors.backgroundLight,
      padding: '1rem',
      borderRadius: '10px',
      ...style
      }}>
        <div style={{ 
          backgroundColor: 'white',
          padding: '1rem',
          boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)'
          }}>
          {hasReviewed ? (
            <h4>Edit your review for {recipeTitle}</h4>
          ) : (
            <h4>Add review for {recipeTitle}</h4>
          )}
          <StarRating
            rating={rating}
            onStarsClicked={onStarClicked}
            changeOnHover={true}>
            <span style={{
              marginLeft: '0.5rem',
              color: 'gray'
            }}>
              Give it a rating!
            </span>
          </StarRating>
          {!starsValid && <div className="text-danger mt-1">{starsError}</div>}

          <Form.Control
            className={"review-input " + (!textValid ? 'is-invalid' : '')}
            style={{ marginTop: '2rem' }}
            as="textarea" 
            rows={5}
            placeholder="Describe your review!"
            value={text}
            maxLength={300}
            onChange={(e) => {
              if (updateTextError()) {
                setTextValid(true);
              }
              setText(e.target.value)
            }}
          />
          {!textValid && <div className="text-danger mt-1">{textError}</div>}

          <PrimaryButton className='mt-4' onClick={onSubmit} disabled={loading}>
            {hasReviewed ? <>Change Review!</> : <>Add Review!</>}
          </PrimaryButton>
        </div>
        <style>
        {`
          .review-input:focus {
            outline: none;
            box-shadow: none;
            border: 1px solid ${theme.colors.primaryDark};
          }

          .is-invalid {
            outline: none !important;
            box-shadow: none !important;
          }
        `}
        </style>
    </div>
  );
}

ReviewBox.propTypes = {
  recipeId: PropTypes.number.isRequired,
  style: PropTypes.object,
  recipeTitle: PropTypes.string.isRequired,
  existingReview: PropTypes.object
};

export default ReviewBox;