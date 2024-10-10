import { Form } from "react-bootstrap";
import theme from "../../theme";
import StarRating from "../recipe/RecipeStarRating";
import { useState } from "react";
import PrimaryButton from "../PrimaryButton";

const ReviewBox = ({ style, recipeTitle }) => {

  const [text, setText] = useState('');

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
          <StarRating rating={0} changeOnHover={true}>
            <span style={{
              marginLeft: '0.5rem',
              color: 'gray'
            }}>
              Give it a rating!
            </span>
          </StarRating>
          <Form.Control
            className="review-input"
            style={{ marginTop: '2rem' }}
            as="textarea" 
            rows={5}
            placeholder="Describe your review!"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <PrimaryButton className='mt-4'>
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