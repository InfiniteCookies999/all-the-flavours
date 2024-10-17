import { Form } from "react-bootstrap";
import theme from "../../theme";
import StarRating from "../recipe/RecipeStarRating";
import { useState } from "react";
import PrimaryButton from "../PrimaryButton";

const ReviewBox = ({ style, recipeTitle }) => {

  const [text, setText] = useState('');
  const [hasClickedStar, setHasClickedStar] = useState(false);

  const [textValid, setTextValid] = useState(true);
  const [starsValid, setStarsValid] = useState(true);

  const [textError, setTextError] = useState('');
  const [starsError, setStarsError] = useState('');

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
    
    if (updateErrors()) {
      return;
    }

    // TODO: send off to server!
  };

  const onStarClicked = () => {
    setHasClickedStar(true);
    setStarsValid(true);
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
          <h4>Add review for {recipeTitle}</h4>
          <StarRating rating={0} onStarsClicked={onStarClicked} changeOnHover={true}>
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

          <PrimaryButton className='mt-4' onClick={onSubmit}>
            Add Review!
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

export default ReviewBox;