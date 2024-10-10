import theme from "../../theme";
import StarRating from "../recipe/RecipeStarRating";

const ReviewBox = ({ style, recipeTitle }) => {
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
        </div>
    </div>
  );
}

export default ReviewBox;