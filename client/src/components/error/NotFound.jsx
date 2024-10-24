import { useEffect } from "react";
import ErrorInfo from "./ErrorInfo";

const NotFound = () => {
  const location = window.location;

  useEffect(() => {
    document.title = "Not found (404)";
  }, []);
  
  return <ErrorInfo infoColumn={
    <>
      <span style={{ fontSize: '5rem' }}>404</span>
      <h1>Page not found!</h1>
      <span className="med-responsive-text">Could not find page <code>{location.pathname}</code></span>
    </>
  } />
};

export default NotFound;