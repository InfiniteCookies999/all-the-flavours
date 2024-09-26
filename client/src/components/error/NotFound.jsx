import ErrorInfo from "./ErrorInfo";
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  return <ErrorInfo infoColumn={
    <>
      <span style={{ fontSize: '5rem' }}>404</span>
      <h1>Page not found!</h1>
      <span className="med-responsive-text">Could not find page <code>{location.pathname}</code></span>
    </>
  } />
};

export default NotFound;