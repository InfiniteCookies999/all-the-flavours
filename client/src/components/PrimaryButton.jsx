import { Button } from "react-bootstrap";
import theme from "../theme";

const PrimaryButton = ({ children, style, type='button', className, ...props }) => {
  return (
    <>
      <Button
        type={type}
        className={"primary-btn " + className}
        style={{
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
          ...style
      }}
      {...props}>
        {children}
      </Button>
      <style>
        {`
          .primary-btn:hover {
            background-color: ${theme.colors.primaryDark} !important;
            border-color: ${theme.colors.primaryDark} !important;
          }
        `}
      </style>
    </>
  )
};

export default PrimaryButton;