import ErrorInfo from "./ErrorInfo";
import PropTypes from 'prop-types';

const SomethingWentWrong = ({ errorMessage }) => {
  return <ErrorInfo infoColumn={
    <>
      <h1 className="mt-4">Something went wrong!</h1>
      <span className="med-responsive-text">{errorMessage}</span>
    </>
  } />
};

SomethingWentWrong.propTypes = {
  errorMessage: PropTypes.string.isRequired
};

export default SomethingWentWrong;