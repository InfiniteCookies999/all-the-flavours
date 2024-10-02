import useResponsiveValue from "./useResponsitveValue";

const useCollapsed = () => {
  const collapsedBreakpoints = {
    small: true,
    medium: true,
    large: false,
    other: false
  };
  
  const collapsed = useResponsiveValue(collapsedBreakpoints);
  return collapsed;
};

export default useCollapsed;