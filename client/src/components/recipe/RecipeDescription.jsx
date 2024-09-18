import PropTypes from 'prop-types';
import { useContext } from 'react';
import RecipeContext from '../../contexts/RecipeContext';
import theme from '../../theme';

const RecipeDescription = ({ style }) => {

  const context = useContext(RecipeContext);

  return (
    <div className="med-responsive-text" style={{
      backgroundColor: theme.colors.backgroundLight,
      color: theme.colors.secondary,
      padding: '0.5rem 0 0.3rem 1rem',
      borderLeft: `5px ${theme.colors.secondary} solid`,
      borderRadius: '3px',
      ...style
    }}>
      <h2>Description</h2>
      <p style={{ color: '#303030' }}>{context.description}</p>
    </div>
  );
}

RecipeDescription.propTypes = {
  style: PropTypes.object
};

export default RecipeDescription;