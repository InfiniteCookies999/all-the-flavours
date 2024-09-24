import { useEffect } from "react";

const useWindowResize = (handleResize) => {
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Initial handling.
    handleResize();

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, [ handleResize ]);
};

export default useWindowResize;