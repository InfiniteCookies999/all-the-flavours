import { useState } from 'react';
import useWindowResize from './useWindowResize';

// Predefined breakpoints
const breakpoints = {
  small: 576,  // For small screens
  medium: 768, // For medium screens
  large: 992   // For large screens
};

// Function to get the value based on predefined breakpoints
const getResponsiveValue = (breakpointValues) => {
  const width = window.innerWidth;
  
  const tryValue = (value) => {
    return value  !== undefined ? value : breakpointValues.other;
  };

  if (width < breakpoints.small)  return tryValue(breakpointValues.small);
  if (width < breakpoints.medium) return tryValue(breakpointValues.medium);
  if (width < breakpoints.large)  return tryValue(breakpointValues.large);
  return breakpointValues.other;
};

const useResponsiveValue = (breakpointValues) => {
  const [value, setValue] = useState(() =>
    getResponsiveValue(breakpointValues));

  useWindowResize(() => {
    setValue(getResponsiveValue(breakpointValues));
  });
  
  return value;
};

export default useResponsiveValue;