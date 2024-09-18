import PropTypes from 'prop-types';
import theme from "../../theme";
import { useContext } from 'react';
import RecipeContext from '../../contexts/RecipeContext';

const RecipeDirections = ({ style }) => {

  const context = useContext(RecipeContext);

  return (
    <div style={{
      border: '1px solid #cccccc',
      borderRadius: '2px',
      backgroundColor: theme.colors.backgroundLight,
      ...style,
      padding: '1rem'
      }}>
       <h2 style={{ marginBottom: '1rem' }}>Directions</h2>
       {context.directions.map((step, index) => (
        <div key={step.id} style={{
          marginTop: '0.1rem',
          padding: '1rem',
          borderRadius: '5px',
          backgroundColor: theme.colors.backgroundLight,
        }}>
          <h4>Step {index+1}</h4>
          {step.text}
          <hr/>
        </div>
       ))}
    </div>
  )
};

RecipeDirections.propTypes = {
    style: PropTypes.object,
  };

export default RecipeDirections;