import theme from "../../theme";
import StarRating from "./RecipeStarRating";

const RecipeListItem = ({ numberOfRecipes, index, recipe, colClass, loadMoreRef=null }) => {
  return (
    <>
      <a key={recipe.id} className={colClass}
        ref={index === numberOfRecipes - 1 ? loadMoreRef : null}
        href={`/recipe/${recipe.id}`}
        style={{
          color: 'black',
          textDecoration: 'none',
        }}
      >
        <div className="d-flex flex-column h-100 recipe-link" style={{
          border: '1px solid gray',
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: theme.colors.backgroundLight,
          borderRadius: '5px',
          // Flex control so all the columns are the same height.
          flexGrow: 1
        }}
        to={`/recipe/${recipe.id}`}>
          <img src={recipe.imagesSrc[0]}
              alt={`Alt ${recipe.id}`}
              className="d-block w-100"
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                objectFit: 'cover',
              }}>
          </img>
          {/* This part can have varied height so need to use flex-grow-1 */}
          <div className="flex-grow-1" style={{ 
            marginTop: '1rem',
            height: 'fit-content',
            marginBottom: '0rem',
            }}>
            <h3 className="recipe-title">{recipe.title}</h3>
            <StarRating rating={recipe.rating} style={{
              overflow: 'hidden'
            }} />
          </div>
        </div>
      </a>
      <style>
        {`
          .recipe-link:hover {
            box-shadow: 0 4px 10px rgba(0.5, 0.5, 0.5, 0.2);
            filter: brightness(0.95);
            cursor: pointer;
          }

          .recipe-link:hover .recipe-title {
            text-decoration: underline !important;
          }
        `}
      </style>
    </>
  );
}

export default RecipeListItem;