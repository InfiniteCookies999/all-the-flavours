import PropTypes from 'prop-types';

const InfoSeperationBar = ({ height, margin }) => {
  return (
    <div style={{
      width: '1px',
      height: height,
      // The bar doesn't align exactly right with the rest of
      // the text so moving it down 2 pixels.
      transform: 'translateY(2px)',
      backgroundColor: '#d1d1d1',
      marginLeft: margin,
      marginRight: margin
    }}>
    </div>
  );
};

InfoSeperationBar.propTypes = {
  height: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
};

export default InfoSeperationBar;