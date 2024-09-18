import PropTypes from 'prop-types';
import theme from '../../theme';
import { useContext } from 'react';
import RecipeContext from '../../contexts/RecipeContext';

const getQuantityFractionalFormat = (decimalPart) => {
  switch (true) {
  case (Math.abs(decimalPart - 0.5) < 0.01):
    return '½';
  case (Math.abs(decimalPart - (1 / 3)) < 0.01):
    return '⅓';
  case (Math.abs(decimalPart - (2 / 3)) < 0.01):
    return '⅔';
  case (Math.abs(decimalPart - (1 / 4)) < 0.01):
    return '¼';
  case (Math.abs(decimalPart - (3 / 4)) < 0.01):
    return '¾';
  default:
    // Fallback to closest fraction.
    if (decimalPart <= 0.25) {
      return '¼';
    } else if (decimalPart <= 0.5) {
      return '½';
    } else if (decimalPart <= 0.75) {
      return '¾';
    } else {
      return ''; // When it's almost a whole number, ignore the fraction
    }
  }
};

const formatQuantity = (quantity) => {
  if (Number.isInteger(quantity)) {
    return quantity.toString();
  }

  const integerPart = Math.floor(quantity);
  const decimalPart = quantity - integerPart;

  const fraction = getQuantityFractionalFormat(decimalPart);

  return integerPart ? `${integerPart} ${fraction}` : fraction;
};

const formatIngredient = (ingredient) => {
  let text = formatQuantity(ingredient.quantity) + ' ';
  text += ingredient.unit || ''; // Optional unit beforehand.
  text += (ingredient.quantity && ingredient.unit !== null) > 1 ? 's' : ''; // Pluralize units.
  text += ingredient.unit ? ' ' : '';
  text += ingredient.name;
  return text;
};

const RecipeIngredients = ({ style }) => {

  const context = useContext(RecipeContext);

  return (
    <div style={{
      border: '1px solid #cccccc',
      borderRadius: '2px',
      backgroundColor: theme.colors.backgroundLight,
      paddingTop: '1rem',
      ...style
    }}>
      <h2 style={{ marginLeft: '1rem' }}>Ingredients</h2>
      <div style={{ width: 'fit-content' }}>
        <ul style={{ listStyle: 'none' }}>
          {context.ingredients.map(ingredient => (
            <div key={ingredient.id}>
              <li style={{ marginTop: '0.5rem' }}>
                <div style={{
                  verticalAlign: 'center',
                  marginRight: '1rem',
                  display: 'inline'
                }}>
                  <input type="checkbox" style={{
                    accentColor: theme.colors.primaryLight,
                    marginRight: '0.8rem'
                  }}></input>
                  {formatIngredient(ingredient)}
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

RecipeIngredients.propTypes = {
  style: PropTypes.object,
};

export default RecipeIngredients;